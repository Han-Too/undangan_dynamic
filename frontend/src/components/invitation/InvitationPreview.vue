<script setup>
import { computed, provide, ref, toRef } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { useMusic } from '../../composables/useMusic';
import { invitationSections } from '../../data/sections';
import BackgroundFx from './fx/BackgroundFx.vue';
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
const sections = computed(() => invitationSections.filter((s) => state.sections[s.id] !== false));

function open() {
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
    <MusicButton v-if="opened && state.music.enabled" />
  </div>
</template>
