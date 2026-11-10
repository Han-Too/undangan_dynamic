<script setup>
import { computed } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { downloadIcs, eventToCalendar, googleCalendarUrl, invitationCalendarEvents } from '../../utils/calendar';
import { invitationUrl } from '../../utils/links';
import { uid } from '../../utils/object';
import Icon from '../Icon.vue';
import FieldDate from './ui/FieldDate.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state, meta } = useInvitation();
const events = state.content.events;
const MAX = 5;

const add = () => events.push({ id: uid('ev'), title: 'Acara baru', date: state.content.cover.date.slice(0, 10), time: '', place: state.location.name });
const remove = (i) => events.splice(i, 1);

// Pengingat untuk pemilik undangan: kirim acara ke Google Calendar / unduh .ics (pengingat H-1 & 2 jam sebelumnya).
const link = computed(() => (meta.value?.slug ? invitationUrl(meta.value.slug) : ''));
const calendarOf = (ev) => eventToCalendar(state, ev, link.value);
const allCalendar = computed(() => invitationCalendarEvents(state, link.value));
</script>

<template>
  <div class="panel">
    <PanelHeader title="Detail Acara" desc="Atur rangkaian acara (akad, resepsi, dll.). Tanggal hitung mundur ada di Umum › Cover." />

    <article v-for="(ev, i) in events" :key="ev.id" class="ev">
      <header class="ev__head">
        <strong>Acara {{ i + 1 }}</strong>
        <button type="button" class="btn btn--ghost btn--sm" :aria-label="`Hapus acara ${i + 1}`" @click="remove(i)">
          <Icon name="trash" :size="14" /> Hapus
        </button>
      </header>
      <FieldText v-model="ev.title" label="Nama acara" />
      <FieldDate v-model="ev.date" label="Tanggal" />
      <FieldText v-model="ev.time" label="Waktu" placeholder="08.00 – 10.00 WIB" hint="Tulis jam mulai – selesai dan zona (WIB/WITA/WIT) agar pengingat kalender tepat." />
      <FieldText v-model="ev.place" label="Lokasi" hint="Nama tempat singkat. Alamat lengkap dan peta diatur di menu Location." />
      <a v-if="calendarOf(ev)" class="btn btn--sm ev__cal" :href="googleCalendarUrl(calendarOf(ev))" target="_blank" rel="noopener">
        <Icon name="calendar" :size="14" /> Tambahkan ke Google Calendar
      </a>
    </article>

    <p v-if="!events.length" class="note">Belum ada acara. Tambahkan agar tampil di undangan.</p>
    <button type="button" class="btn btn--block" :disabled="events.length >= MAX" @click="add">
      <Icon name="plus" :size="15" /> Tambah acara
    </button>

    <div v-if="allCalendar.length" class="ev-remind">
      <p><strong>Pengingat untuk Anda</strong> Simpan semua acara ke kalender HP (Apple, Outlook, Google) lengkap dengan pengingat H-1 dan 2 jam sebelum acara. Tamu juga mendapat tombol “Add to calendar” di undangan.</p>
      <button type="button" class="btn btn--sm" @click="downloadIcs(allCalendar, 'acara-undangan.ics')"><Icon name="calendar" :size="14" /> Unduh semua (.ics)</button>
    </div>
  </div>
</template>

<style scoped>
.ev { display: grid; gap: 12px; padding: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.ev__head { display: flex; align-items: center; justify-content: space-between; }
.ev__cal { justify-self: start; text-decoration: none; }
.ev-remind { display: grid; gap: 10px; justify-items: start; padding: 12px 14px; font-size: 12.5px; color: var(--ui-muted); background: var(--ui-sunken); border-radius: var(--ui-radius); }
.ev-remind p { margin: 0; }
.ev-remind strong { display: block; margin-bottom: 2px; color: var(--ui-ink); }
</style>
