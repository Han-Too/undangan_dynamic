<script setup>
import { computed } from 'vue';
import Icon from '../Icon.vue';

/** Foto dengan pengaturan fit / posisi / zoom non-destruktif, atau placeholder bertema bila kosong. */
const props = defineProps({
  photo: { type: Object, required: true },
  label: { type: String, default: 'Foto' },
  placeholder: { type: Boolean, default: true },
  alt: { type: String, default: '' },
});

const imgStyle = computed(() => ({
  objectFit: props.photo.fit,
  objectPosition: `${props.photo.x}% ${props.photo.y}%`,
  transform: `scale(${props.photo.zoom})`,
  transformOrigin: `${props.photo.x}% ${props.photo.y}%`,
}));
</script>

<template>
  <div class="inv-photo">
    <img v-if="photo.src" :src="photo.src" :alt="alt || label" :style="imgStyle" draggable="false" />
    <div v-else-if="placeholder" class="inv-photo__ph">
      <Icon name="image" :size="26" />
      <span>{{ label }}</span>
    </div>
  </div>
</template>
