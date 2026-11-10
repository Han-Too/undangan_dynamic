/**
 * Tambah-ke-kalender untuk acara undangan: link Google Calendar & file .ics (Apple / Outlook / Android).
 * Jam acara diisi bebas oleh user ("08.00 – 10.00 WIB"), jadi jam mulai/selesai dibaca dari teksnya.
 * Tanpa jam yang terbaca, acara dibuat seharian penuh.
 */

const ZONES = { WIB: { offset: 7, tz: 'Asia/Jakarta' }, WITA: { offset: 8, tz: 'Asia/Makassar' }, WIT: { offset: 9, tz: 'Asia/Jayapura' } };
const pad = (n) => String(n).padStart(2, '0');

/** "08.00 – 10.00 WITA" -> { start: [8, 0], end: [10, 0], zone } */
function parseTime(text = '') {
  const times = [...String(text).matchAll(/(\d{1,2})[.:](\d{2})/g)]
    .map((m) => [Number(m[1]), Number(m[2])])
    .filter(([h, m]) => h < 24 && m < 60);
  const zoneKey = String(text).toUpperCase().match(/\bWI(T|TA|B)\b/)?.[0] ?? 'WIB';
  return { start: times[0] ?? null, end: times[1] ?? null, zone: ZONES[zoneKey] };
}

/**
 * Bentuk acara siap-kalender.
 * `date` = "YYYY-MM-DD" atau "YYYY-MM-DDTHH:mm"; `time` = teks jam bebas (opsional).
 */
export function toCalendarEvent({ title, date, time, location, details }) {
  const ymd = String(date || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return null;
  const [y, mo, d] = ymd.split('-').map(Number);

  const parsed = parseTime(time);
  // datetime-local dari cover ("2026-12-12T10:00") dipakai bila teks jam kosong.
  const fromDate = String(date).match(/T(\d{2}):(\d{2})/);
  const start = parsed.start ?? (fromDate ? [Number(fromDate[1]), Number(fromDate[2])] : null);

  if (!start) {
    const next = new Date(Date.UTC(y, mo - 1, d + 1));
    return { title, location, details, allDay: true, tz: parsed.zone.tz, startDay: `${y}${pad(mo)}${pad(d)}`, endDay: `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}` };
  }

  const toUtc = ([h, m]) => new Date(Date.UTC(y, mo - 1, d, h - parsed.zone.offset, m));
  const startAt = toUtc(start);
  let endAt = parsed.end ? toUtc(parsed.end) : new Date(startAt.getTime() + 2 * 3600e3);
  if (endAt <= startAt) endAt = new Date(startAt.getTime() + 2 * 3600e3);
  return { title, location, details, allDay: false, tz: parsed.zone.tz, startAt, endAt };
}

const stamp = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const range = (ev) => (ev.allDay ? `${ev.startDay}/${ev.endDay}` : `${stamp(ev.startAt)}/${stamp(ev.endAt)}`);

export function googleCalendarUrl(ev) {
  const params = new URLSearchParams({ action: 'TEMPLATE', text: ev.title || 'Acara', dates: range(ev), ctz: ev.tz });
  if (ev.details) params.set('details', ev.details);
  if (ev.location) params.set('location', ev.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

const icsText = (v = '') => String(v).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** Isi file .ics dengan pengingat H-1 dan 2 jam sebelum acara. */
export function buildIcs(events) {
  const now = stamp(new Date());
  const body = events.flatMap((ev, i) => [
    'BEGIN:VEVENT',
    `UID:${now}-${i}@undangan-online`,
    `DTSTAMP:${now}`,
    ...(ev.allDay ? [`DTSTART;VALUE=DATE:${ev.startDay}`, `DTEND;VALUE=DATE:${ev.endDay}`] : [`DTSTART:${stamp(ev.startAt)}`, `DTEND:${stamp(ev.endAt)}`]),
    `SUMMARY:${icsText(ev.title)}`,
    ...(ev.location ? [`LOCATION:${icsText(ev.location)}`] : []),
    ...(ev.details ? [`DESCRIPTION:${icsText(ev.details)}`] : []),
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsText(ev.title)}`, 'TRIGGER:-P1D', 'END:VALARM',
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsText(ev.title)}`, 'TRIGGER:-PT2H', 'END:VALARM',
    'END:VEVENT',
  ]);
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Undangan Online//ID', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', ...body, 'END:VCALENDAR'].join('\r\n');
}

export function downloadIcs(events, filename = 'undangan.ics') {
  const url = URL.createObjectURL(new Blob([buildIcs(events)], { type: 'text/calendar;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Satu acara undangan (item state.content.events) dalam bentuk siap-kalender, atau null bila tanggal kosong. */
export function eventToCalendar(state, ev, link = '') {
  const names = state.content.cover.names?.trim();
  const address = [state.location.name, state.location.address].filter(Boolean).join(', ');
  return toCalendarEvent({
    title: names ? `${ev.title} · ${names}` : ev.title,
    date: ev.date,
    time: ev.time,
    location: ev.place && !address.includes(ev.place) ? [ev.place, address].filter(Boolean).join(', ') : address,
    details: [names && `Undangan ${names}`, link].filter(Boolean).join('\n'),
  });
}

/** Semua acara undangan. Bila belum ada rangkaian acara, tanggal & jam di cover dipakai sebagai satu acara. */
export function invitationCalendarEvents(state, link = '') {
  const source = state.content.events.length
    ? state.content.events
    : [{ title: state.content.cover.label || 'Acara', date: state.content.cover.date, time: '' }];
  return source.map((ev) => eventToCalendar(state, ev, link)).filter(Boolean);
}
