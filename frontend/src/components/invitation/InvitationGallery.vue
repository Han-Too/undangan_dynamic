<script setup>
import { useInvitation } from '../../composables/useInvitation';
import InvPhoto from './InvPhoto.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme } = useInvitation();
</script>

<template>
  <h2 class="inv-title">{{ state.content.gallery.title }}</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <p v-if="state.content.gallery.caption" class="inv-text">{{ state.content.gallery.caption }}</p>

  <div class="gallery">
    <figure v-for="(photo, i) in state.photos.gallery" :key="i" class="gallery__item" :class="`gallery__item--${i}`">
      <InvPhoto :photo="photo" :label="`Galeri ${i + 1}`" />
    </figure>
  </div>
</template>

<style>
.gallery {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.gallery__item {
  margin: 0;
  overflow: hidden;
  border-radius: calc(var(--radius) * 0.6);
  border: 1px solid color-mix(in srgb, var(--c-primary) 40%, transparent);
  aspect-ratio: 1;
}
.gallery__item--0 { aspect-ratio: 3 / 4; }
.gallery__item--3 { aspect-ratio: 3 / 4; }
.gallery__item--0, .gallery__item--2 { margin-top: 0; }
.gallery__item--1, .gallery__item--3 { margin-top: 14px; }
.gallery__item .inv-photo { transition: transform 0.6s ease; }
.gallery__item:hover .inv-photo { transform: scale(1.04); }
</style>
