<script setup>
import { computed } from 'vue';
import { shapes } from './shapes';

/**
 * Latar animasi, sepenuhnya digerakkan konfigurasi `theme.fx`:
 * pola (drift/spin) + cahaya lembut + partikel. Hanya CSS transform/opacity agar ringan.
 */
const props = defineProps({ fx: { type: Object, required: true } });

// Pseudo-random deterministik: posisi partikel stabil antar render (tidak "loncat").
const rand = (i, salt) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const items = computed(() => {
  const { shapes: names, count, size, motion } = props.fx.particles;
  return Array.from({ length: count }, (_, i) => {
    const dur = motion === 'twinkle' ? 4 + rand(i, 3) * 5 : 14 + rand(i, 3) * 16;
    return {
      key: i,
      svg: shapes[names[i % names.length]],
      style: {
        '--x': `${(rand(i, 1) * 100).toFixed(1)}%`,
        '--y': `${(rand(i, 7) * 100).toFixed(1)}%`,
        '--s': `${(size[0] + rand(i, 2) * (size[1] - size[0])).toFixed(1)}px`,
        '--dur': `${dur.toFixed(1)}s`,
        '--delay': `-${(rand(i, 4) * dur).toFixed(1)}s`,
        '--sway': `${(rand(i, 5) * 60 - 30).toFixed(0)}px`,
        '--rot': `${(rand(i, 6) * 360).toFixed(0)}deg`,
        '--o': (0.25 + rand(i, 8) * 0.4).toFixed(2),
        color: i % 3 === 0 ? 'var(--c-secondary)' : 'var(--c-primary)',
      },
    };
  });
});
</script>

<template>
  <div class="fx" aria-hidden="true">
    <div class="fx__pattern" :data-motion="fx.patternMotion" />
    <div class="fx__glow fx__glow--a" />
    <div class="fx__glow fx__glow--b" />
    <svg
      v-for="p in items"
      :key="p.key"
      class="fx__p"
      :data-motion="fx.particles.motion"
      :style="p.style"
      viewBox="0 0 24 24"
      fill="currentColor"
      v-html="p.svg"
    />
  </div>
</template>

<style>
.fx {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.fx__pattern {
  position: absolute;
  inset: calc(var(--pattern-size) * -1);
  background-image: var(--pattern-img);
  background-size: var(--pattern-size);
  opacity: var(--pattern-opacity);
}
.fx__pattern[data-motion='drift'] {
  animation: fx-drift 60s linear infinite;
}
.fx__pattern[data-motion='spin'] {
  inset: -50%;
  animation: fx-spin 240s linear infinite;
}

.fx__glow {
  position: absolute;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.2;
  animation: fx-breathe 12s ease-in-out infinite;
}
.fx__glow--a {
  top: -15%;
  left: -20%;
  background: var(--glow-a);
}
.fx__glow--b {
  bottom: -15%;
  right: -25%;
  background: var(--glow-b);
  animation-delay: -6s;
}

.fx__p {
  position: absolute;
  left: var(--x);
  width: var(--s);
  height: var(--s);
  opacity: 0;
  animation-duration: var(--dur);
  animation-delay: var(--delay);
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}
.fx__p[data-motion='fall'] {
  top: -8%;
  animation-name: fx-fall;
  animation-timing-function: linear;
}
.fx__p[data-motion='rise'] {
  top: 100%;
  animation-name: fx-rise;
  animation-timing-function: linear;
}
.fx__p[data-motion='twinkle'] {
  top: var(--y);
  animation-name: fx-twinkle;
  animation-timing-function: ease-in-out;
}

@keyframes fx-fall {
  0% { transform: translate3d(0, 0, 0) rotate(var(--rot)); opacity: 0; }
  10% { opacity: var(--o); }
  50% { transform: translate3d(var(--sway), 55vh, 0) rotate(calc(var(--rot) + 120deg)); }
  90% { opacity: var(--o); }
  100% { transform: translate3d(calc(var(--sway) * -1), 115vh, 0) rotate(calc(var(--rot) + 260deg)); opacity: 0; }
}
@keyframes fx-rise {
  0% { transform: translate3d(0, 0, 0) rotate(var(--rot)); opacity: 0; }
  12% { opacity: var(--o); }
  50% { transform: translate3d(var(--sway), -55vh, 0) rotate(calc(var(--rot) + 20deg)); }
  88% { opacity: var(--o); }
  100% { transform: translate3d(calc(var(--sway) * -1), -112vh, 0) rotate(calc(var(--rot) - 20deg)); opacity: 0; }
}
@keyframes fx-twinkle {
  0%, 100% { transform: scale(0.6) rotate(var(--rot)); opacity: 0; }
  50% { transform: scale(1) rotate(calc(var(--rot) + 45deg)); opacity: var(--o); }
}
@keyframes fx-drift {
  to { transform: translate(var(--pattern-size), var(--pattern-size)); }
}
@keyframes fx-spin {
  to { transform: rotate(360deg); }
}
@keyframes fx-breathe {
  0%, 100% { transform: scale(1); opacity: 0.16; }
  50% { transform: scale(1.15); opacity: 0.28; }
}

@media (prefers-reduced-motion: reduce) {
  .fx__pattern,
  .fx__glow,
  .fx__p {
    animation: none !important;
  }
  .fx__p {
    opacity: var(--o);
  }
}
</style>
