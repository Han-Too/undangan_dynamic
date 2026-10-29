const num = (v) => (v === '' || v === null || v === undefined ? NaN : Number(v));
const validCoord = (lat, lng) =>
  Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;

/**
 * Ambil koordinat / nama tempat dari URL Google Maps.
 * Mendukung: /@lat,lng  ·  !3dLAT!4dLNG  ·  ?q=lat,lng  ·  ?ll=lat,lng  ·  /place/Nama+Tempat
 * Link pendek (maps.app.goo.gl) tidak bisa di-resolve dari browser, jadi hanya disimpan sebagai URL.
 */
export function parseMapsUrl(raw) {
  const text = String(raw || '').trim();
  if (!text) return null;

  let url;
  try {
    url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    return null;
  }
  if (!/(^|\.)(google\.[a-z.]+|goo\.gl|maps\.app\.goo\.gl)$/i.test(url.hostname)) return null;

  const full = decodeURIComponent(url.href);
  const pairs = [
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /[?&](?:q|ll|query|destination)=(-?\d+(?:\.\d+)?)(?:,|\s)\s*(-?\d+(?:\.\d+)?)/,
  ];
  let lat = NaN;
  let lng = NaN;
  for (const re of pairs) {
    const m = full.match(re);
    if (m) {
      lat = Number(m[1]);
      lng = Number(m[2]);
      break;
    }
  }

  const place = url.pathname.match(/\/place\/([^/@]+)/);
  const name = place ? decodeURIComponent(place[1]).replace(/\+/g, ' ') : '';

  return { latitude: validCoord(lat, lng) ? lat : null, longitude: validCoord(lat, lng) ? lng : null, name, url: url.href };
}

export function hasCoords(loc) {
  return validCoord(num(loc.latitude), num(loc.longitude));
}

function searchQuery(loc) {
  if (hasCoords(loc)) return `${num(loc.latitude)},${num(loc.longitude)}`;
  return [loc.name, loc.address].filter(Boolean).join(', ');
}

/** URL iframe peta (tanpa API key). Null jika belum ada data lokasi. */
export function buildEmbedUrl(loc) {
  const q = searchQuery(loc);
  return q ? `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed` : null;
}

/** URL tombol "Buka Google Maps": URL yang diisi user, atau dibuat dari koordinat/alamat. */
export function buildOpenUrl(loc) {
  if (loc.mapsUrl && parseMapsUrl(loc.mapsUrl)) return parseMapsUrl(loc.mapsUrl).url;
  const q = searchQuery(loc);
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : null;
}
