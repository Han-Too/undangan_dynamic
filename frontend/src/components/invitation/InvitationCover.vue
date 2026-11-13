<script setup>
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { CHAR_TEXT_ANIMS } from '../../data/animations';
import { getBackground } from '../../data/coverBackgrounds';
import { formatDateDots } from '../../utils/format';
import Icon from '../Icon.vue';
import CoverFrame from './CoverFrame.vue';
import BackgroundFx from './fx/BackgroundFx.vue';
import SceneFx from './fx/SceneFx.vue';
import InvPhoto from './InvPhoto.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const props = defineProps({ opened: { type: Boolean, default: false } });
const emit = defineEmits(['open']);

const { state, theme, guest, isGreeting, coverDesign, effective, motion, fx } = useInvitation();
const editor = inject('invEditor', null);
const cover = computed(() => state.content.cover);
const hasPhoto = computed(() => !!state.photos.cover.src);
const layout = computed(() => coverDesign.value.layout);

/** Layout yang menaruh foto di dalam bingkai (bukan latar penuh). */
const HERO_LAYOUTS = ['split', 'circle', 'polaroid'];
const heroLayout = computed(() => HERO_LAYOUTS.includes(layout.value));
const fullPhoto = computed(() => hasPhoto.value && !heroLayout.value);

/** Pembuka berdaun (pintu, pintu geser, amplop, belah): latar & foto cover digambar di kedua daun lalu dibuka. */
const LEAF_OPENINGS = ['doors', 'shoji', 'envelope', 'halves'];
const leafMode = computed(() => LEAF_OPENINGS.includes(motion.value.opening));

/**
 * Nama dipecah menjadi kata (dan huruf untuk animasi per huruf). Vue sendiri yang merender span-nya,
 * jadi teks tetap ikut berubah saat diedit di builder.
 */
const charMode = computed(() => CHAR_TEXT_ANIMS.includes(motion.value.coverText));
const words = computed(() => {
  let i = 0;
  return String(cover.value.names || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ text: w, amp: w === '&' || w.toLowerCase() === 'dan', chars: [...w].map((ch) => ({ ch, i: i++ })) }));
});
/** Kata terpanjang menentukan skala huruf nama agar kata panjang tidak terpotong di layar sempit. */
const nameFit = computed(() => {
  const longest = Math.max(0, ...words.value.map((w) => w.text.length));
  const limit = layout.value === 'stacked' ? 7 : 10;
  return longest > limit ? Math.max(0.55, limit / longest).toFixed(3) : 1;
});
/** Inisial untuk layout monogram: "Raka & Ayu" → R & A. */
const initials = computed(() => {
  const parts = String(cover.value.names || '').split(/\s*(?:&|\+|\bdan\b)\s*/i).filter(Boolean);
  return parts.slice(0, 2).map((p) => p.trim()[0]?.toUpperCase() ?? '');
});

/** Background pilihan (null = latar bawaan tema dari BackgroundFx). */
const bgStyle = computed(() => {
  const bg = getBackground(coverDesign.value.background);
  if (!bg.css) return null;
  const c = { primary: effective('primary'), secondary: effective('secondary'), bg: effective('background'), text: effective('text') };
  return { background: bg.css(c) };
});

/** Titik pusat tombol (px, relatif cover): asal iris pembuka & ledakan partikel. */
const root = ref(null);
const origin = ref({ x: '50%', y: '70%' });
/** Pembuka bisa dipicu tanpa klik (mis. "Coba dari cover" di builder): pakai titik tengah-bawah dalam px. */
watch(
  () => props.opened,
  (v) => {
    if (!v || !root.value || origin.value.x.endsWith('px')) return;
    origin.value = { x: `${root.value.clientWidth / 2}px`, y: `${root.value.clientHeight * 0.7}px` };
  },
);
function open(e) {
  const box = root.value.getBoundingClientRect();
  const btn = e.currentTarget.getBoundingClientRect();
  const x = btn.left + btn.width / 2 - box.left;
  const y = btn.top + btn.height / 2 - box.top;
  origin.value = { x: `${x}px`, y: `${y}px` };
  emit('open', { x, y });
}

/* ── Kedalaman 3D: ornamen bergeser mengikuti kursor / kemiringan HP ── */
const tilt = ref({ x: 0, y: 0 });
const clamp = (v) => Math.max(-1, Math.min(1, v));
function onPointer(e) {
  if (!motion.value.tilt || props.opened || e.pointerType === 'touch') return;
  const box = root.value.getBoundingClientRect();
  tilt.value = { x: clamp(((e.clientX - box.left) / box.width) * 2 - 1), y: clamp(((e.clientY - box.top) / box.height) * 2 - 1) };
}
const onLeave = () => (tilt.value = { x: 0, y: 0 });
function onOrient(e) {
  if (!motion.value.tilt || props.opened || e.gamma == null) return;
  tilt.value = { x: clamp(e.gamma / 25), y: clamp((e.beta - 45) / 25) };
}
watch(
  () => motion.value.tilt,
  (on) => {
    window.removeEventListener('deviceorientation', onOrient);
    if (on) window.addEventListener('deviceorientation', onOrient);
    else onLeave();
  },
  { immediate: true },
);
onBeforeUnmount(() => window.removeEventListener('deviceorientation', onOrient));
</script>

<template>
  <section
    ref="root"
    class="inv-cover"
    :class="{ 'is-open': opened, 'has-photo': hasPhoto, 'has-bg': !!bgStyle, 'is-leaf': leafMode, 'has-rays': motion.rays }"
    :data-layout="layout"
    :data-open="motion.opening"
    :data-text="motion.coverText"
    :style="{ '--open-x': origin.x, '--open-y': origin.y, '--tx': tilt.x, '--ty': tilt.y, ...bgStyle }"
    data-section="cover"
    :inert="opened"
    @pointermove="onPointer"
    @pointerleave="onLeave"
  >
    <div v-if="leafMode" class="inv-cover__leaves" aria-hidden="true">
      <div v-for="side in ['a', 'b']" :key="side" class="inv-cover__leaf" :class="`inv-cover__leaf--${side}`">
        <div class="inv-cover__face" :style="bgStyle">
          <template v-if="fullPhoto">
            <div class="inv-cover__photo"><InvPhoto :photo="state.photos.cover" label="" :placeholder="false" /></div>
            <div class="inv-cover__veil" />
          </template>
        </div>
        <span class="inv-cover__seam" />
      </div>
    </div>
    <div v-if="fullPhoto && !leafMode" class="inv-cover__photo">
      <InvPhoto :photo="state.photos.cover" label="Foto Cover" :placeholder="false" />
    </div>
    <div v-if="fullPhoto && !leafMode" class="inv-cover__veil" />
    <div v-if="motion.rays" class="inv-cover__rays" aria-hidden="true" />
    <BackgroundFx :fx="fx" />
    <SceneFx :scene="fx.scene" :still="fx.still" />

    <CoverFrame :frame="coverDesign.frame" :theme-corner="theme.ornaments.corner" />

    <div v-if="heroLayout" class="inv-cover__hero">
      <InvPhoto v-if="hasPhoto" :photo="state.photos.cover" label="Foto Cover" :placeholder="false" />
      <span v-else-if="layout !== 'split'" class="inv-cover__hero-mono">{{ initials.join(' & ') }}</span>
    </div>

    <div :key="motion.coverText" class="inv-cover__body">
      <div v-if="layout === 'monogram'" class="inv-cover__mono" aria-hidden="true">
        <span>{{ initials[0] }}</span><i>&amp;</i><span>{{ initials[1] }}</span>
      </div>
      <p class="inv-eyebrow">{{ cover.label }}</p>
      <h1 class="inv-cover__names" :aria-label="cover.names" :style="{ '--name-fit': nameFit }">
        <template v-for="(w, wi) in words" :key="`${wi}-${w.text}`">
          <span class="w" :class="{ 'w--amp': w.amp }" aria-hidden="true">
            <template v-if="charMode"><span v-for="c in w.chars" :key="c.i" class="ch" :style="{ '--ci': c.i }">{{ c.ch }}</span></template>
            <template v-else>{{ w.text }}</template>
          </span>{{ wi < words.length - 1 ? ' ' : '' }}
        </template>
      </h1>
      <OrnamentDivider :type="theme.ornaments.divider" />
      <p v-if="!isGreeting" class="inv-cover__date">{{ formatDateDots(cover.date) }}</p>
      <p class="inv-cover__guest">{{ cover.guestText }}</p>
      <p v-if="guest?.name || (editor?.editable.value && !isGreeting)" class="inv-cover__to">{{ guest?.name || 'Nama Tamu' }}</p>
      <button type="button" class="inv-btn inv-cover__btn" @click="open">
        {{ cover.buttonText || (isGreeting ? 'Buka Ucapan' : 'Buka Undangan') }}
      </button>
    </div>

    <div v-if="editor?.editable.value && !opened" class="inv-edit-group">
      <button type="button" class="inv-edit inv-edit--static" @click.stop="editor.request('cover')">
        <Icon name="layers" :size="13" /> Desain Cover
      </button>
      <button type="button" class="inv-edit inv-edit--static" @click.stop="editor.request('general', 'cover')">
        <Icon name="pencil" :size="13" /> Teks
      </button>
    </div>
  </section>
</template>
