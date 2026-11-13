<script setup>
import { computed } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import ThemePicker from '../ThemePicker.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state, setTheme } = useInvitation();
const theme = computed({ get: () => state.theme, set: (id) => setTheme(id) });
</script>

<template>
  <div class="panel">
    <PanelHeader title="Tema" desc="Pilih kategori acara, lalu gayanya. Teks bawaan yang belum Anda ubah ikut menyesuaikan tema." />
    <ThemePicker v-model="theme" :columns="2" />
  </div>
</template>
