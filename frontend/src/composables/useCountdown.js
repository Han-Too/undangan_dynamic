import { computed, onMounted, onUnmounted, ref, toValue } from 'vue';
import { parseDate } from '../utils/format';

/** Hitung mundur realtime ke `target` (ref/string tanggal). Update tiap detik. */
export function useCountdown(target) {
  const now = ref(Date.now());
  let timer;

  onMounted(() => {
    now.value = Date.now();
    timer = setInterval(() => (now.value = Date.now()), 1000);
  });
  onUnmounted(() => clearInterval(timer));

  return computed(() => {
    const date = parseDate(toValue(target));
    if (!date) return { valid: false, finished: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const diff = date.getTime() - now.value;
    if (diff <= 0) return { valid: true, finished: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const s = Math.floor(diff / 1000);
    return {
      valid: true,
      finished: false,
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  });
}
