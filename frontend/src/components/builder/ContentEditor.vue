<script setup>
import { computed, reactive, watch } from 'vue';
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import { sectionsForTheme } from '../../data/sections';
import AccordionGroup from './ui/AccordionGroup.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';
import ToggleSwitch from './ui/ToggleSwitch.vue';
import Icon from '../Icon.vue';

const { state, theme, isGreeting } = useInvitation();
const { ui } = useBuilderUi();
const c = state.content;
const sections = computed(() => sectionsForTheme(theme.value));

// Grup yang terbuka; mengikuti `ui.focus` saat user klik "Edit …" di preview.
const open = reactive({ cover: true, opening: false, profile: false, closing: false, sections: false });
watch(
  () => ui.focus,
  (focus) => {
    if (focus && focus in open) {
      Object.keys(open).forEach((k) => (open[k] = k === focus));
    }
  },
  { immediate: true },
);

const addPerson = () => c.profile.people.push({ name: '', fullName: '', parents: '' });
const removePerson = (i) => c.profile.people.splice(i, 1);
</script>

<template>
  <div class="panel">
    <PanelHeader
      title="Konten Umum"
      :desc="isGreeting ? 'Teks inti kartu ucapan. Semua perubahan langsung muncul di preview.' : 'Teks inti undangan. Semua perubahan langsung muncul di preview.'"
    />

    <AccordionGroup v-model="open.cover" :title="isGreeting ? 'Cover' : 'Cover & tanggal'">
      <FieldText v-model="c.cover.label" label="Teks atas" :placeholder="isGreeting ? 'HAPPY BIRTHDAY' : 'THE WEDDING OF'" />
      <FieldText v-model="c.cover.names" :label="isGreeting ? 'Nama penerima ucapan' : 'Nama pasangan / nama anak'" />
      <FieldText v-if="!isGreeting" v-model="c.cover.date" type="datetime-local" label="Tanggal & jam acara" hint="Dipakai untuk tampilan tanggal dan hitung mundur." />
      <FieldText v-model="c.cover.guestText" :label="isGreeting ? 'Teks sapaan' : 'Sapaan tamu'" />
      <FieldText v-model="c.cover.buttonText" label="Teks tombol" />
      <FieldText v-if="!isGreeting" v-model="c.countdown.title" label="Judul countdown" />
    </AccordionGroup>

    <AccordionGroup v-model="open.opening" :title="isGreeting ? 'Pesan ucapan' : 'Pembuka'">
      <FieldText v-model="c.opening.title" label="Judul" />
      <FieldText v-model="c.opening.text" :label="isGreeting ? 'Isi ucapan' : 'Deskripsi'" multiline :rows="5" />
    </AccordionGroup>

    <AccordionGroup v-model="open.profile" title="Profil">
      <FieldText v-model="c.profile.title" label="Judul section" />
      <div v-for="(p, i) in c.profile.people" :key="i" class="person">
        <div class="person__head">
          <strong>{{ i === 0 ? 'Profil pertama' : 'Profil kedua' }}</strong>
          <button v-if="c.profile.people.length > 1" type="button" class="btn btn--ghost btn--sm" @click="removePerson(i)">
            <Icon name="trash" :size="14" /> Hapus
          </button>
        </div>
        <FieldText v-model="p.name" label="Nama panggilan" />
        <FieldText v-model="p.fullName" label="Nama lengkap" />
        <FieldText v-model="p.parents" :label="isGreeting ? 'Keterangan' : 'Keterangan orang tua'" multiline :rows="2" />
      </div>
      <button v-if="c.profile.people.length < 2" type="button" class="btn btn--sm" @click="addPerson">
        <Icon name="plus" :size="14" /> Tambah profil
      </button>
      <p class="note">Foto profil diatur di menu <b>Media › Foto</b>.</p>
    </AccordionGroup>

    <AccordionGroup v-model="open.closing" title="Penutup">
      <FieldText v-model="c.closing.quote" label="Kutipan / quote" multiline :rows="3" />
      <FieldText v-model="c.closing.source" label="Sumber kutipan" />
      <FieldText v-model="c.closing.message" label="Ucapan penutup" multiline :rows="3" />
      <FieldText v-model="c.closing.signature" :label="isGreeting ? 'Dari (pengirim)' : 'Tanda tangan'" />
    </AccordionGroup>

    <AccordionGroup v-model="open.sections" title="Tampilkan section">
      <ToggleSwitch v-for="s in sections" :key="s.id" v-model="state.sections[s.id]" :label="s.label" />
    </AccordionGroup>
  </div>
</template>

<style scoped>
.person { display: grid; gap: 12px; padding: 12px; background: var(--ui-sunken); border-radius: var(--ui-radius-sm); }
.person__head { display: flex; align-items: center; justify-content: space-between; font-size: 13px; }
</style>
