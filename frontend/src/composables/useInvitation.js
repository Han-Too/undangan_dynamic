import { computed, reactive, ref, shallowRef, watchEffect } from 'vue';
import { createDefaultInvitation } from '../data/defaults';
import { fontStack, getFont } from '../data/fonts';
import { patterns } from '../data/patterns';
import { getTheme, themes } from '../data/themes';
import { api } from '../services/api';
import { normalizeHex, readableOn } from '../utils/color';
import { assignInPlace, clone, deepMerge, flatten, getPath, isEqual, setPath } from '../utils/object';
import { loadFont } from './useFonts';

/**
 * Single source of truth. Semua editor menulis ke `state`, semua komponen undangan membaca darinya.
 * Dipakai sebagai singleton modul sehingga tidak ada salinan state di komponen; undangan yang sedang
 * dibuka (builder atau halaman tamu) dimuat ke sini lewat `loadInvitation()`.
 */
const state = reactive(createDefaultInvitation());

/** Data undangan dari server di luar `config` (id, title, slug, is_published, ...). */
const meta = ref(null);
/** Tamu dari link pribadi (/slug/tamu) -> { name, slug, rsvp } | null. */
const guest = ref(null);

const savedSnapshot = ref(JSON.stringify(state));
const audioBlob = shallowRef(null);
const serverAudioUrl = ref('');
const audioUrl = ref('');
const audioChanged = ref(false);

const dirty = computed(() => audioChanged.value || JSON.stringify(state) !== savedSnapshot.value);
const theme = computed(() => getTheme(state.theme));

/** `blob` = file lokal yang belum diunggah; null = pakai audio dari server (bila ada). */
const setAudioBlob = (blob) => {
  if (audioUrl.value.startsWith('blob:')) URL.revokeObjectURL(audioUrl.value);
  audioBlob.value = blob;
  audioUrl.value = blob ? URL.createObjectURL(blob) : '';
};

const markSaved = () => {
  savedSnapshot.value = JSON.stringify(state);
  audioChanged.value = false;
};

/** Muat undangan dari API ke state (config kosong / lama dilengkapi default terbaru). */
function loadInvitation(invitation, { guest: g = null } = {}) {
  const { config, ...rest } = invitation;
  const source = config && typeof config === 'object' && !Array.isArray(config) ? config : {};
  assignInPlace(state, deepMerge(createDefaultInvitation(), clone(source)));
  meta.value = rest;
  guest.value = g;
  setAudioBlob(null);
  serverAudioUrl.value = invitation.audio_url || '';
  audioUrl.value = serverAudioUrl.value;
  if (!serverAudioUrl.value) state.music.custom = false;
  markSaved();
}

/** Nilai efektif: override user, atau default tema. */
const effective = (key) => state.colors[key] || theme.value.colors[key];
const headingFont = computed(() => state.typography.heading || theme.value.fonts.heading);
const bodyFont = computed(() => state.typography.body || theme.value.fonts.body);

watchEffect(() => {
  loadFont(headingFont.value);
  loadFont(bodyFont.value);
});

const glowColor = (c, primary, secondary) => (c === 'primary' ? primary : c === 'secondary' ? secondary : c);

/** CSS variables yang menjadi kontrak antara konfigurasi tema dan seluruh styling undangan. */
const cssVars = computed(() => {
  const t = theme.value;
  const primary = effective('primary');
  const secondary = effective('secondary');
  const bg = effective('background');
  const text = effective('text');
  const headingRole = { text, primary, secondary }[t.headingColor] ?? text;
  const surface = state.colors.background || state.colors.text
    ? `color-mix(in srgb, ${bg} 88%, ${text})`
    : t.colors.surface;

  return {
    '--c-primary': primary,
    '--c-secondary': secondary,
    '--c-bg': bg,
    '--c-text': text,
    '--c-surface': surface,
    '--c-heading': headingRole,
    '--c-muted': `color-mix(in srgb, ${text} 68%, ${bg})`,
    '--c-on-primary': readableOn(primary),
    '--c-on-secondary': readableOn(secondary),
    '--f-heading': fontStack(headingFont.value),
    '--f-body': fontStack(bodyFont.value),
    '--h-scale': getFont(headingFont.value).scale,
    '--pattern-img': (patterns[t.pattern.id] ?? patterns.floral)(primary),
    '--pattern-size': `${t.pattern.size}px`,
    '--pattern-opacity': t.pattern.opacity,
    '--band-img': t.ornaments.band ? patterns.tumpalBand(primary) : 'none',
    '--glow-a': glowColor(t.fx.glow[0], primary, secondary),
    '--glow-b': glowColor(t.fx.glow[1] ?? t.fx.glow[0], primary, secondary),
    ...t.vars,
  };
});

/**
 * Ganti tema. Teks bawaan tema lama yang belum diubah user ikut diganti ke teks bawaan tema baru,
 * sedangkan teks yang sudah diedit user dibiarkan.
 */
function setTheme(id) {
  if (!themes[id] || id === state.theme) return;
  const prev = getTheme(state.theme).copy;
  for (const [path, value] of flatten(themes[id].copy)) {
    const current = getPath(state.content, path);
    if (!isEqual(current, getPath(prev, path))) continue;
    if (Array.isArray(current)) current.splice(0, current.length, ...clone(value));
    else setPath(state.content, path, value);
  }
  state.theme = id;
}

function setAudio(file) {
  if (!file || !file.type.startsWith('audio/')) throw new Error('Pilih file audio (MP3, WAV, OGG, M4A).');
  if (file.size > 15 * 1024 * 1024) throw new Error('Ukuran audio maksimal 15 MB.');
  setAudioBlob(file);
  state.music.custom = true;
  state.music.name = file.name;
  audioChanged.value = true;
}

function removeAudio() {
  setAudioBlob(null);
  audioUrl.value = '';
  state.music.custom = false;
  state.music.name = '';
  audioChanged.value = true;
}

/** Simpan setelan ke database; file musik diunggah / dihapus terpisah bila berubah. */
async function save() {
  const id = meta.value?.id;
  if (!id) throw new Error('Undangan belum dimuat.');

  if (audioChanged.value) {
    if (audioBlob.value) {
      const res = await api.upload(`/invitations/${id}/audio`, audioBlob.value, state.music.name || 'audio');
      serverAudioUrl.value = res.audio_url;
    } else if (serverAudioUrl.value) {
      await api.delete(`/invitations/${id}/audio`);
      serverAudioUrl.value = '';
    }
  }

  // eslint-disable-next-line no-unused-vars
  const { config, ...updated } = await api.put(`/invitations/${id}`, { config: clone(state) });
  meta.value = { ...meta.value, ...updated };
  markSaved();
}

/** Kembalikan ke default (lokal saja; tersimpan ke server setelah Save). */
function reset() {
  assignInPlace(state, createDefaultInvitation());
  setAudioBlob(null);
  audioUrl.value = '';
  audioChanged.value = !!serverAudioUrl.value;
}

export function useInvitation() {
  return {
    state,
    meta,
    guest,
    theme,
    cssVars,
    headingFont,
    bodyFont,
    effective,
    audioUrl,
    dirty,
    setTheme,
    setAudio,
    removeAudio,
    save,
    reset,
    loadInvitation,
  };
}
