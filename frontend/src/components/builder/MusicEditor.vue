<script setup>
import { computed, ref } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { useMusic } from '../../composables/useMusic';
import { useToast } from '../../composables/useToast';
import Icon from '../Icon.vue';
import FieldRange from './ui/FieldRange.vue';
import PanelHeader from './ui/PanelHeader.vue';
import ToggleSwitch from './ui/ToggleSwitch.vue';

const { state, setAudio, removeAudio } = useInvitation();
const { playing, toggle } = useMusic();
const { push } = useToast();
const input = ref(null);

const volume = computed({
  get: () => Math.round(state.music.volume * 100),
  set: (v) => (state.music.volume = v / 100),
});

function onFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    setAudio(file);
    push('Musik diganti. Klik Save untuk menyimpan.', 'success');
  } catch (err) {
    push(err.message, 'error');
  }
  e.target.value = '';
}
</script>

<template>
  <div class="panel">
    <PanelHeader title="Musik" desc="Musik diputar saat tamu menekan “Buka Undangan”, dengan tombol jeda di pojok undangan." />

    <ToggleSwitch v-model="state.music.enabled" label="Aktifkan musik" hint="Matikan untuk menyembunyikan tombol musik." />

    <template v-if="state.music.enabled">
      <div class="track">
        <button type="button" class="track__play" :aria-label="playing ? 'Jeda preview' : 'Putar preview'" @click="toggle">
          <Icon :name="playing ? 'pause' : 'play'" :size="18" />
        </button>
        <div class="track__meta">
          <strong>{{ state.music.custom ? state.music.name || 'Musik kustom' : 'Musik bawaan' }}</strong>
          <small>{{ state.music.custom ? 'File yang Anda unggah' : 'Placeholder instrumental (loop)' }}</small>
        </div>
        <span v-if="playing" class="bars" aria-hidden="true"><i /><i /><i /></span>
      </div>

      <input ref="input" type="file" accept="audio/*" class="sr-only" tabindex="-1" @change="onFile" />
      <div class="actions">
        <button type="button" class="btn" @click="input.click()"><Icon name="upload" :size="15" /> {{ state.music.custom ? 'Ganti lagu' : 'Unggah lagu' }}</button>
        <button v-if="state.music.custom" type="button" class="btn btn--danger" @click="removeAudio"><Icon name="trash" :size="15" /> Hapus</button>
      </div>

      <FieldRange v-model="volume" label="Volume" suffix="%" />
      <p class="note">Browser memblokir autoplay sebelum ada interaksi, sehingga musik baru mulai setelah tamu menekan tombol buka. Format: MP3, WAV, OGG, M4A (maks. 15 MB).</p>
    </template>
  </div>
</template>

<style scoped>
.track {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.track__play {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: #fff;
  background: var(--ui-ink);
  border: 0;
  border-radius: 50%;
  transition: transform 0.15s, background 0.15s;
}
.track__play:hover { background: var(--ui-accent); transform: scale(1.05); }
.track__meta { flex: 1; display: grid; min-width: 0; }
.track__meta strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.track__meta small { color: var(--ui-muted); font-size: 12px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
.bars { display: flex; align-items: flex-end; gap: 3px; height: 18px; }
.bars i { width: 3px; background: var(--ui-accent); border-radius: 2px; animation: bar 0.9s ease-in-out infinite; }
.bars i:nth-child(2) { animation-delay: -0.3s; }
.bars i:nth-child(3) { animation-delay: -0.6s; }
@keyframes bar { 0%, 100% { height: 4px; } 50% { height: 18px; } }
</style>
