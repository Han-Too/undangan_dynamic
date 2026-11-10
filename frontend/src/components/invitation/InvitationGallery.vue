<script setup>
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import Icon from '../Icon.vue';
import InvPhoto from './InvPhoto.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

/**
 * Galeri: 4 / 6 / 8 foto, tampil sebagai grid atau carousel (geser otomatis, bisa swipe).
 * Klik foto → tampil layar penuh (Viewer.js). Foto kosong tampil sebagai placeholder dan tidak bisa dibuka.
 */
const { state, theme } = useInvitation();
const lightboxHost = inject('invLightbox', null);

const photos = computed(() => state.photos.gallery.slice(0, state.gallery.count));
const filled = computed(() => photos.value.filter((p) => p.src));
const isCarousel = computed(() => state.gallery.mode === 'carousel');

function openPhoto(i) {
  const p = photos.value[i];
  if (!p.src || !lightboxHost) return;
  lightboxHost.open(filled.value, filled.value.indexOf(p));
}

/* ── Carousel ──────────────────────────────────────────────── */
const current = ref(0);
const paused = ref(false);
const go = (i) => (current.value = (i + photos.value.length) % photos.value.length);
let timer;
function schedule() {
  clearInterval(timer);
  if (isCarousel.value && state.gallery.autoplay && !paused.value && photos.value.length > 1) {
    timer = setInterval(() => go(current.value + 1), 3500);
  }
}
watch([isCarousel, () => state.gallery.autoplay, paused, () => photos.value.length], schedule, { immediate: true });
watch(() => state.gallery.count, () => (current.value = Math.min(current.value, state.gallery.count - 1)));
onBeforeUnmount(() => clearInterval(timer));

// Swipe / drag: geser > 40px berpindah slide; geser kecil dianggap klik.
const drag = ref(0);
let startX = null;
let moved = false;
function onDown(e) {
  startX = e.clientX;
  moved = false;
  paused.value = true;
}
function onMove(e) {
  if (startX === null) return;
  drag.value = e.clientX - startX;
  if (Math.abs(drag.value) > 6) moved = true;
}
function onUp() {
  if (startX === null) return;
  if (drag.value < -40) go(current.value + 1);
  else if (drag.value > 40) go(current.value - 1);
  startX = null;
  drag.value = 0;
  paused.value = false;
}
const onSlideClick = (i) => !moved && openPhoto(i);
</script>

<template>
  <h2 class="inv-title">{{ state.content.gallery.title }}</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <p v-if="state.content.gallery.caption" class="inv-text">{{ state.content.gallery.caption }}</p>

  <div v-if="isCarousel" class="carousel" @mouseenter="paused = true" @mouseleave="paused = false">
    <div
      class="carousel__viewport"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
      @pointerleave="onUp"
    >
      <div
        class="carousel__track"
        :class="{ 'is-dragging': drag !== 0 }"
        :style="{ transform: `translateX(calc(${-current * 100}% + ${drag}px))` }"
      >
        <figure
          v-for="(photo, i) in photos"
          :key="i"
          class="carousel__slide"
          :class="{ 'is-current': i === current, 'is-clickable': !!photo.src }"
          @click="onSlideClick(i)"
        >
          <InvPhoto :photo="photo" :label="`Galeri ${i + 1}`" />
        </figure>
      </div>
      <button type="button" class="carousel__nav carousel__nav--prev" aria-label="Foto sebelumnya" @pointerdown.stop @click="go(current - 1)">
        <Icon name="chevron" :size="18" />
      </button>
      <button type="button" class="carousel__nav carousel__nav--next" aria-label="Foto berikutnya" @pointerdown.stop @click="go(current + 1)">
        <Icon name="chevron" :size="18" />
      </button>
    </div>

    <div class="carousel__thumbs">
      <button
        v-for="(photo, i) in photos"
        :key="i"
        type="button"
        class="carousel__thumb"
        :class="{ 'is-current': i === current }"
        :aria-label="`Tampilkan foto ${i + 1}`"
        @click="go(i)"
      >
        <InvPhoto :photo="photo" :label="`${i + 1}`" />
      </button>
    </div>
  </div>

  <div v-else class="gallery" :data-count="photos.length">
    <figure
      v-for="(photo, i) in photos"
      :key="i"
      class="gallery__item"
      :class="{ 'is-clickable': !!photo.src }"
      @click="openPhoto(i)"
    >
      <InvPhoto :photo="photo" :label="`Galeri ${i + 1}`" />
    </figure>
  </div>
</template>

<style>
/* ── Grid ── */
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
.gallery__item.is-clickable { cursor: zoom-in; }
.gallery__item .inv-photo { transition: transform 0.6s ease; }
.gallery__item.is-clickable:hover .inv-photo { transform: scale(1.05); }

/* 4 & 8: dua kolom berselang (kolom kanan turun sedikit) */
.gallery[data-count='4'] .gallery__item:nth-child(4n + 1),
.gallery[data-count='4'] .gallery__item:nth-child(4n),
.gallery[data-count='8'] .gallery__item:nth-child(4n + 1),
.gallery[data-count='8'] .gallery__item:nth-child(4n) { aspect-ratio: 3 / 4; }
.gallery[data-count='4'] .gallery__item:nth-child(even),
.gallery[data-count='8'] .gallery__item:nth-child(even) { margin-top: 14px; }

/* 6: satu foto besar di atas & bawah, empat kotak di tengah */
.gallery[data-count='6'] .gallery__item:first-child,
.gallery[data-count='6'] .gallery__item:last-child { grid-column: 1 / -1; aspect-ratio: 16 / 10; }

/* ── Carousel ── */
.carousel { width: 100%; display: grid; gap: 10px; }
.carousel__viewport {
  position: relative;
  overflow: hidden;
  border-radius: calc(var(--radius) * 0.6);
  border: 1px solid color-mix(in srgb, var(--c-primary) 40%, transparent);
  touch-action: pan-y;
  user-select: none;
}
.carousel__track { display: flex; transition: transform 0.6s cubic-bezier(0.3, 0.7, 0.2, 1); }
.carousel__track.is-dragging { transition: none; }
.carousel__slide { flex: 0 0 100%; margin: 0; aspect-ratio: 4 / 5; overflow: hidden; }
.carousel__slide.is-clickable { cursor: zoom-in; }
.carousel__slide .inv-photo { transition: transform 4s ease; }
.carousel__slide.is-current .inv-photo { transform: scale(1.04); }
.carousel__nav {
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  translate: 0 -50%;
  color: var(--c-on-secondary);
  background: color-mix(in srgb, var(--c-secondary) 80%, transparent);
  border: 0;
  border-radius: 50%;
  opacity: 0.85;
}
.carousel__nav:hover { opacity: 1; }
.carousel__nav--prev { left: 8px; }
.carousel__nav--prev svg { transform: rotate(90deg); }
.carousel__nav--next { right: 8px; }
.carousel__nav--next svg { transform: rotate(-90deg); }
.carousel__thumbs { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; }
.carousel__thumb {
  width: 42px;
  height: 42px;
  padding: 0;
  overflow: hidden;
  background: none;
  border: 2px solid transparent;
  border-radius: calc(var(--radius) * 0.35);
  opacity: 0.55;
  transition: opacity 0.2s, border-color 0.2s;
}
.carousel__thumb.is-current { opacity: 1; border-color: var(--c-primary); }
.carousel__thumb .inv-photo__ph { font-size: 9px; }
.carousel__thumb .inv-photo__ph svg { display: none; }
</style>
