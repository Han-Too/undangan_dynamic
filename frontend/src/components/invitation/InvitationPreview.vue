<script setup>
import { computed, provide, ref, toRef } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { useMusic } from '../../composables/useMusic';
import { sectionsForTheme } from '../../data/sections';
import BackgroundFx from './fx/BackgroundFx.vue';
import { shapes } from './fx/shapes';
import InvitationCover from './InvitationCover.vue';
import MusicButton from './MusicButton.vue';
import SectionShell from './SectionShell.vue';

/**
 * Undangan lengkap sebagaimana dilihat tamu. Komponen ini tidak tahu apa pun soal builder:
 * mode edit hanya aktif bila `editable` = true, dan permintaan edit dikirim lewat event `edit`.
 */
const props = defineProps({ editable: { type: Boolean, default: false } });
const emit = defineEmits(['edit']);
const opened = defineModel('opened', { type: Boolean, default: false });

const { state, theme, cssVars } = useInvitation();
const { play, pause } = useMusic();

provide('invEditor', {
  editable: toRef(props, 'editable'),
  request: (panel, focus) => emit('edit', { panel, focus }),
});

const scroller = ref(null);
const sections = computed(() => sectionsForTheme(theme.value).filter((s) => state.sections[s.id] !== false));

/** Ledakan partikel saat cover dibuka; bentuk partikel mengikuti tema. */
const burst = ref(null);
let burstTimer;
function fireBurst({ x, y }) {
  const names = theme.value.fx.particles.shapes;
  const n = 14;
  const particles = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1);
    const dist = 90 + (i % 3) * 45;
    return {
      key: i,
      svg: shapes[names[i % names.length]],
      style: {
        '--tx': `${Math.cos(angle) * dist}px`,
        '--ty': `${Math.sin(angle) * dist}px`,
        '--rot': `${(i % 2 ? 1 : -1) * (90 + i * 20)}deg`,
        '--s': `${12 + (i % 3) * 5}px`,
        '--d': `${(i % 4) * 30}ms`,
        color: i % 3 === 0 ? 'var(--c-secondary)' : 'var(--c-primary)',
      },
    };
  });
  burst.value = { key: Date.now(), x, y, particles };
  clearTimeout(burstTimer);
  burstTimer = setTimeout(() => (burst.value = null), 1600);
}

function open(origin) {
  if (origin) fireBurst(origin);
  opened.value = true;
  play(); // dipanggil dari klik user, jadi lolos kebijakan autoplay browser
  scroller.value?.scrollTo({ top: 0 });
}

function scrollToSection(id) {
  const el = scroller.value?.querySelector(`[data-section="${id}"]`);
  if (el) scroller.value.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
}

function showCover() {
  opened.value = false;
  pause();
  scroller.value?.scrollTo({ top: 0 });
}

defineExpose({ scrollToSection, showCover });
</script>

<template>
  <div
    class="inv-root"
    :style="cssVars"
    :data-theme="theme.id"
    :data-section-style="theme.sectionStyle"
    :data-editable="editable"
  >
    <BackgroundFx :fx="theme.fx" />

    <div ref="scroller" class="inv-scroll" :class="{ 'is-locked': !opened }">
      <SectionShell v-for="s in sections" :id="s.id" :key="s.id" :label="s.label" :panel="s.panel" :focus="s.focus">
        <component :is="s.component" />
      </SectionShell>
    </div>

    <InvitationCover :opened="opened" @open="open" />
    <div v-if="burst" :key="burst.key" class="inv-burst" :style="{ left: `${burst.x}px`, top: `${burst.y}px` }" aria-hidden="true">
      <span class="inv-burst__ring" />
      <svg
        v-for="p in burst.particles"
        :key="p.key"
        class="inv-burst__p"
        :style="p.style"
        viewBox="0 0 24 24"
        fill="currentColor"
        v-html="p.svg"
      />
    </div>
    <MusicButton v-if="opened && state.music.enabled" />
  </div>
</template>
