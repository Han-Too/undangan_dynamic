import { computed, ref, watch } from 'vue';
import { getDefaultMusicUrl } from '../utils/defaultMusic';
import { useInvitation } from './useInvitation';

/**
 * Player musik tunggal yang dipakai tombol mengambang di undangan dan panel Music di editor.
 * `play()` tidak pernah dipaksa: bila browser memblokir autoplay, state tetap "paused"
 * dan user memulai lewat tombol.
 */
const audio = typeof Audio !== 'undefined' ? new Audio() : null;
const playing = ref(false);
let wired = false;

export function useMusic() {
  const { state, audioUrl } = useInvitation();
  const source = computed(() => audioUrl.value || (state.music.enabled ? getDefaultMusicUrl() : ''));

  if (audio && !wired) {
    wired = true;
    audio.loop = true;
    audio.addEventListener('play', () => (playing.value = true));
    audio.addEventListener('pause', () => (playing.value = false));

    watch(
      source,
      (src) => {
        if (!src) return audio.pause();
        const wasPlaying = !audio.paused;
        audio.src = src;
        if (wasPlaying) audio.play().catch(() => {});
      },
      { immediate: true },
    );
    watch(() => state.music.volume, (v) => (audio.volume = Math.min(1, Math.max(0, v))), { immediate: true });
    watch(() => state.music.enabled, (on) => !on && audio.pause());
  }

  const play = async () => {
    if (!audio || !state.music.enabled || !source.value) return false;
    try {
      await audio.play();
      return true;
    } catch {
      return false; // diblokir browser; menunggu interaksi user
    }
  };
  const pause = () => audio?.pause();
  const toggle = () => (playing.value ? pause() : play());

  return { playing, play, pause, toggle };
}
