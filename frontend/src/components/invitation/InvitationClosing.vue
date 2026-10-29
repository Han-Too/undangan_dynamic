<script setup>
import { useInvitation } from '../../composables/useInvitation';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme } = useInvitation();
</script>

<template>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <blockquote v-if="state.content.closing.quote" class="closing__quote">
    <p class="inv-quote">{{ state.content.closing.quote }}</p>
    <cite v-if="state.content.closing.source" class="inv-eyebrow">{{ state.content.closing.source }}</cite>
  </blockquote>
  <p class="inv-text">{{ state.content.closing.message }}</p>
  <p class="closing__sign">{{ state.content.closing.signature }}</p>
</template>

<style>
.closing__quote { margin: 0; display: grid; gap: 10px; }
.closing__quote cite { font-style: normal; }
.closing__sign {
  margin: 8px 0 0;
  font-family: var(--f-heading);
  font-size: calc(2.2rem * var(--h-scale));
  line-height: 1.2;
  color: var(--c-heading);
  overflow-wrap: anywhere;
}
</style>
