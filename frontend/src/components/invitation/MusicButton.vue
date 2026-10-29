<script setup>
import { useMusic } from '../../composables/useMusic';
import Icon from '../Icon.vue';

const { playing, toggle } = useMusic();
</script>

<template>
  <button
    type="button"
    class="inv-music"
    :class="{ 'is-playing': playing }"
    :aria-label="playing ? 'Jeda musik' : 'Putar musik'"
    :aria-pressed="playing"
    @click="toggle"
  >
    <Icon name="music" :size="18" />
    <span v-if="!playing" class="inv-music__off" />
  </button>
</template>
