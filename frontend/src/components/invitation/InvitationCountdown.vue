<script setup>
import { computed } from 'vue';
import { useCountdown } from '../../composables/useCountdown';
import { useInvitation } from '../../composables/useInvitation';
import { pad2 } from '../../utils/format';

const { state } = useInvitation();
const time = useCountdown(() => state.content.cover.date);

const units = computed(() => [
  { label: 'HARI', value: time.value.days },
  { label: 'JAM', value: pad2(time.value.hours) },
  { label: 'MENIT', value: pad2(time.value.minutes) },
  { label: 'DETIK', value: pad2(time.value.seconds) },
]);
</script>

<template>
  <h2 class="inv-title inv-title--sm">{{ state.content.countdown.title }}</h2>

  <p v-if="!time.valid" class="inv-text">Atur tanggal acara untuk menampilkan hitung mundur.</p>
  <p v-else-if="time.finished" class="inv-text">Acara telah berlangsung. Terima kasih atas doa dan kehadirannya.</p>
  <div v-else class="inv-count" role="timer" aria-live="off">
    <div v-for="u in units" :key="u.label" class="inv-count__item">
      <span class="inv-count__num">{{ u.value }}</span>
      <span class="inv-count__lbl">{{ u.label }}</span>
    </div>
  </div>
</template>
