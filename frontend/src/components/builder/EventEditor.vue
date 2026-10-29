<script setup>
import { useInvitation } from '../../composables/useInvitation';
import { uid } from '../../utils/object';
import Icon from '../Icon.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state } = useInvitation();
const events = state.content.events;
const MAX = 5;

const add = () => events.push({ id: uid('ev'), title: 'Acara baru', date: state.content.cover.date.slice(0, 10), time: '', place: state.location.name });
const remove = (i) => events.splice(i, 1);
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
      <div class="row">
        <FieldText v-model="ev.date" type="date" label="Tanggal" />
        <FieldText v-model="ev.time" label="Waktu" placeholder="08.00 – 10.00 WIB" />
      </div>
      <FieldText v-model="ev.place" label="Lokasi" hint="Nama tempat singkat. Alamat lengkap dan peta diatur di menu Location." />
    </article>

    <p v-if="!events.length" class="note">Belum ada acara. Tambahkan agar tampil di undangan.</p>
    <button type="button" class="btn btn--block" :disabled="events.length >= MAX" @click="add">
      <Icon name="plus" :size="15" /> Tambah acara
    </button>
  </div>
</template>

<style scoped>
.ev { display: grid; gap: 12px; padding: 14px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.ev__head { display: flex; align-items: center; justify-content: space-between; }
</style>
