<script setup>
import { computed, ref } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { downloadIcs, eventToCalendar, googleCalendarUrl } from '../../utils/calendar';
import { formatDateLong, formatWeekday } from '../../utils/format';
import { invitationUrl } from '../../utils/links';
import Icon from '../Icon.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme, meta } = useInvitation();

/** Acara siap-kalender, urut sama dengan state.content.events (null bila tanggal kosong). */
const calendarEvents = computed(() => {
  const link = meta.value?.slug ? invitationUrl(meta.value.slug) : '';
  return state.content.events.map((ev) => eventToCalendar(state, ev, link));
});

const openMenu = ref(null); // id acara yang menu kalendernya terbuka
const toggle = (id) => (openMenu.value = openMenu.value === id ? null : id);
const fileName = (ev) => `${ev.title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase() || 'acara'}.ics`;

function saveIcs(cal) {
  downloadIcs([cal], fileName(cal));
  openMenu.value = null;
}
</script>

<template>
  <p class="inv-eyebrow">Save the date</p>
  <h2 class="inv-title">Acara</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />

  <article v-for="(ev, i) in state.content.events" :key="ev.id" class="inv-card event">
    <h3 class="event__title">{{ ev.title }}</h3>
    <p v-if="ev.date" class="event__row">
      <Icon name="calendar" :size="15" />
      <span>{{ formatWeekday(ev.date) }}, {{ formatDateLong(ev.date) }}</span>
    </p>
    <p v-if="ev.time" class="event__row"><Icon name="clock" :size="15" /><span>{{ ev.time }}</span></p>
    <p v-if="ev.place" class="event__row"><Icon name="pin" :size="15" /><span>{{ ev.place }}</span></p>

    <div v-if="calendarEvents[i]" class="event__cal">
      <button type="button" class="inv-btn inv-btn--ghost event__cal-btn" :aria-expanded="openMenu === ev.id" @click="toggle(ev.id)">
        <Icon name="calendar" :size="14" /> Add to calendar
      </button>
      <Transition name="event-cal">
        <div v-if="openMenu === ev.id" class="event__cal-menu">
          <a class="event__cal-opt" :href="googleCalendarUrl(calendarEvents[i])" target="_blank" rel="noopener" @click="openMenu = null">
            <span class="event__cal-dot" style="--dot: #4285f4" /> Google Calendar
          </a>
          <button type="button" class="event__cal-opt" @click="saveIcs(calendarEvents[i])">
            <span class="event__cal-dot" style="--dot: var(--c-primary)" /> Apple / Outlook (.ics)
          </button>
        </div>
      </Transition>
    </div>
  </article>
</template>

<style>
.event { display: grid; gap: 8px; }
.event__title {
  margin: 0 0 4px;
  font-family: var(--f-heading);
  font-weight: 500;
  font-size: calc(1.6rem * var(--h-scale));
  line-height: 1.2;
  color: var(--c-heading);
}
.event__row {
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 9px;
  font-size: 0.9rem;
  color: var(--c-text);
  text-align: left;
}
.event__row .icon { margin-top: 5px; color: var(--c-primary); }

.event__cal { display: grid; justify-items: center; gap: 8px; margin-top: 8px; }
.inv-root .event__cal-btn { padding: 10px 18px; font-size: 0.72rem; }
.event__cal-menu {
  width: 100%;
  max-width: 260px;
  display: grid;
  overflow: hidden;
  background: color-mix(in srgb, var(--c-bg) 60%, var(--c-surface));
  border: 1px solid color-mix(in srgb, var(--c-primary) 35%, transparent);
  border-radius: calc(var(--radius) * 0.55);
}
.event__cal-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  font: inherit;
  font-size: 0.84rem;
  color: var(--c-text);
  text-align: left;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
  transition: background 0.2s;
}
.event__cal-opt + .event__cal-opt { border-top: 1px solid color-mix(in srgb, var(--c-primary) 20%, transparent); }
.event__cal-opt:hover { background: color-mix(in srgb, var(--c-primary) 10%, transparent); }
.event__cal-dot { width: 8px; height: 8px; flex: none; border-radius: 50%; background: var(--dot); }
.event-cal-enter-active, .event-cal-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.event-cal-enter-from, .event-cal-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
