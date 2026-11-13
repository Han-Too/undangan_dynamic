<script setup>
import { computed } from 'vue';
import { getScene, sceneArt } from '../../../data/scenes';

/**
 * Ilustrasi berlapis di latar (lihat data/scenes.js).
 * Tiap lapisan: wrapper (.scene__layer, digeser GSAP saat scroll) → .scene__move (animasi idle CSS) → svg (cermin).
 * Ilustrasi digambar untuk satu pojok; bila dipasang di pojok lain otomatis dicerminkan.
 */
const props = defineProps({
  scene: { type: String, default: 'none' },
  still: { type: Boolean, default: false },
});

/** Pojok asli tiap ilustrasi: [vertikal t|b|m, horizontal l|r|c, tegak? (tidak boleh dibalik atas-bawah)] */
const ANCHOR = {
  plum: 'tr', sakura: 'tr', peonyBranch: 'tr', jasmineBranch: 'tr', roseBranch: 'tr', brass: 'tr', frangipaniBranch: 'tr',
  bouquet: 'tl', roses: 'tl', orchids: 'tl', wildflowers: 'tl', sakuraBouquet: 'tl', peacock: 'bl', deco: 'tc',
};
const UPRIGHT_ANCHOR = { lanterns: 'tr', lampu: 'tr', tree: 'bl', bamboo: 'bl', gunungan: 'bl', candi: 'bl' };
const POS = { tl: 'tl', tr: 'tr', bl: 'bl', br: 'br', top: 'tc', bottom: 'bc', left: 'bl', right: 'br', center: 'mc' };

function mirror(art, at) {
  const upright = art in UPRIGHT_ANCHOR;
  const anchor = UPRIGHT_ANCHOR[art] ?? ANCHOR[art];
  if (!anchor) return '';
  const [av, ah] = anchor;
  const [tv, th] = POS[at];
  const sx = 'lr'.includes(ah) && 'lr'.includes(th) && ah !== th ? -1 : 1;
  const sy = !upright && 'tb'.includes(av) && 'tb'.includes(tv) && av !== tv ? -1 : 1;
  return sx === 1 && sy === 1 ? '' : `scale(${sx}, ${sy})`;
}

const layers = computed(() =>
  getScene(props.scene)
    .filter((l) => sceneArt[l.art])
    .map((l, i) => ({
      ...l,
      key: `${props.scene}-${i}`,
      art: sceneArt[l.art],
      flipTf: mirror(l.art, l.at),
    })),
);
</script>

<template>
  <div v-if="layers.length" class="scene" :class="{ 'scene--still': still }" aria-hidden="true">
    <div
      v-for="(l, i) in layers"
      :key="l.key"
      class="scene__layer"
      :data-at="l.at"
      :data-depth="l.depth"
      :style="{ width: `${l.w}%`, opacity: l.op, '--i': i }"
    >
      <div class="scene__move" :data-anim="l.anim">
        <svg
          class="scene__art"
          :viewBox="l.art.vb"
          :style="l.flipTf ? { transform: l.flipTf } : null"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          v-html="l.art.svg"
        />
        <svg v-if="l.anim === 'drift'" class="scene__art" :viewBox="l.art.vb" fill="none" v-html="l.art.svg" />
      </div>
    </div>
  </div>
</template>

<style>
.scene {
  --sc-b: var(--c-secondary);
  --sc-leaf: color-mix(in srgb, var(--c-secondary) 45%, #6f9a5c);
  --sc-ink: color-mix(in srgb, var(--c-text) 75%, transparent);
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  color: var(--c-primary);
}
.scene__layer { position: absolute; will-change: transform; }
.scene__layer[data-at='tl'] { top: 0; left: 0; }
.scene__layer[data-at='tr'] { top: 0; right: 0; }
.scene__layer[data-at='bl'], .scene__layer[data-at='left'] { bottom: 0; left: 0; }
.scene__layer[data-at='br'], .scene__layer[data-at='right'] { bottom: 0; right: 0; }
.scene__layer[data-at='top'] { top: 0; left: 50%; translate: -50% 0; }
.scene__layer[data-at='bottom'] { bottom: 0; left: 50%; translate: -50% 0; }
.scene__layer[data-at='center'] { top: 50%; left: 50%; translate: -50% -50%; }
.scene__art { display: block; width: 100%; height: auto; overflow: visible; }

/* Animasi idle lapisan (titik putar mengikuti pojok tempelnya) */
.scene__move { transform-origin: var(--origin, 50% 0); }
.scene__layer[data-at='tl'] .scene__move { --origin: 0 0; }
.scene__layer[data-at='tr'] .scene__move { --origin: 100% 0; }
.scene__layer:is([data-at='bl'], [data-at='left']) .scene__move { --origin: 0 100%; }
.scene__layer:is([data-at='br'], [data-at='right']) .scene__move { --origin: 100% 100%; }
.scene__layer[data-at='bottom'] .scene__move { --origin: 50% 100%; }
.scene__move[data-anim='sway'] { animation: sc-sway 7s ease-in-out infinite alternate; animation-delay: calc(var(--i) * -1.7s); }
.scene__move[data-anim='bob'] { animation: sc-bob 5s ease-in-out infinite alternate; animation-delay: calc(var(--i) * -1.3s); }
.scene__move[data-anim='pulse'] { animation: sc-pulse 4.5s ease-in-out infinite alternate; transform-origin: 50% 50%; }
.scene__move[data-anim='spin'] { animation: sc-spin 60s linear infinite; transform-origin: 50% 50%; }
.scene__move[data-anim='drift'] { display: flex; width: 200%; animation: sc-drift 70s linear infinite; }
.scene__move[data-anim='drift'] .scene__art { width: 50%; }
.scene__move[data-anim='fly'] { animation: sc-fly 26s linear infinite; animation-delay: calc(var(--i) * -9s); }

/* Animasi elemen di dalam ilustrasi */
.scene .sc-swing { transform-box: fill-box; transform-origin: 50% 0; animation: sc-swing 4.2s ease-in-out infinite alternate; animation-delay: var(--d, 0s); }
.scene .sc-bloom { transform-box: fill-box; transform-origin: 50% 50%; animation: sc-bloom 5s ease-in-out infinite alternate; animation-delay: var(--d, 0s); }
.scene .sc-twinkle { animation: sc-twinkle 3.2s ease-in-out infinite; animation-delay: var(--d, 0s); }
.scene .sc-pulse-in { transform-box: fill-box; transform-origin: 50% 50%; animation: sc-pulse 5s ease-in-out infinite alternate; }
.scene .sc-bob-in { animation: sc-bob 3.6s ease-in-out infinite alternate; animation-delay: var(--d, 0s); }
.scene .sc-spin-in { transform-box: fill-box; transform-origin: 50% 50%; animation: sc-spin 9s linear infinite; }
.scene .sc-orbit { transform-origin: 150px 150px; animation: sc-spin 38s linear infinite; }
.scene .sc-march { animation: sc-march 2.4s linear infinite; }
.scene .sc-flap { animation: sc-flap 0.9s ease-in-out infinite alternate; animation-delay: var(--d, 0s); transform-box: fill-box; transform-origin: 50% 50%; }
.scene .sc-sway-b { transform-box: fill-box; transform-origin: 50% 100%; animation: sc-sway-sm 5s ease-in-out infinite alternate; }

@keyframes sc-sway { from { transform: rotate(-2.2deg); } to { transform: rotate(2.2deg); } }
@keyframes sc-sway-sm { from { transform: skewX(-2deg); } to { transform: skewX(2deg); } }
@keyframes sc-bob { from { transform: translateY(-6px); } to { transform: translateY(6px); } }
@keyframes sc-pulse { from { transform: scale(0.96); opacity: 0.85; } to { transform: scale(1.04); opacity: 1; } }
@keyframes sc-spin { to { transform: rotate(360deg); } }
@keyframes sc-drift { to { transform: translateX(-50%); } }
@keyframes sc-fly { from { transform: translateX(-110%) translateY(10px); } 50% { transform: translateX(80%) translateY(-14px); } to { transform: translateX(260%) translateY(6px); } }
@keyframes sc-swing { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
@keyframes sc-bloom { from { transform: scale(0.94) rotate(-4deg); } to { transform: scale(1.06) rotate(4deg); } }
@keyframes sc-twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
@keyframes sc-march { to { stroke-dashoffset: -28; } }
@keyframes sc-flap { from { transform: scaleY(1); } to { transform: scaleY(0.55); } }

.scene--still *, .scene--still .scene__move { animation: none !important; }
@media (prefers-reduced-motion: reduce) {
  .scene *, .scene .scene__move { animation: none !important; }
}
</style>
