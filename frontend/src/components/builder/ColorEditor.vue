<script setup>
import { computed } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import FieldColor from './ui/FieldColor.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state, theme } = useInvitation();

const fields = [
  { key: 'primary', label: 'Warna utama', hint: 'Ornamen, garis, dan aksen' },
  { key: 'secondary', label: 'Warna sekunder', hint: 'Tombol dan kotak countdown' },
  { key: 'background', label: 'Warna latar', hint: 'Latar seluruh undangan' },
  { key: 'text', label: 'Warna teks', hint: 'Teks isi dan detail' },
];
const customized = computed(() => Object.values(state.colors).some(Boolean));

const resetAll = () => Object.keys(state.colors).forEach((k) => (state.colors[k] = ''));
</script>

<template>
  <div class="panel">
    <PanelHeader title="Warna" desc="Tema tetap jadi dasar. Warna yang Anda ubah di sini menimpa warna tema." />

    <div class="stack">
      <FieldColor v-for="f in fields" :key="f.key" v-model="state.colors[f.key]" :label="f.label" :fallback="theme.colors[f.key]" />
    </div>

    <button type="button" class="btn btn--block" :disabled="!customized" @click="resetAll">Kembalikan ke warna tema</button>
  </div>
</template>
