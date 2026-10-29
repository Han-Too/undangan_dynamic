<script setup>
import { useInvitation } from '../../composables/useInvitation';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme } = useInvitation();
</script>

<template>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <h2 class="inv-title inv-title--sm">{{ state.content.opening.title }}</h2>
  <p class="inv-text">{{ state.content.opening.text }}</p>
</template>
