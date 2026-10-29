<script setup>
import { computed, inject } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { buildEmbedUrl, buildOpenUrl } from '../../utils/maps';
import Icon from '../Icon.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme } = useInvitation();
const editor = inject('invEditor', null);

const loc = computed(() => state.location);
const embedUrl = computed(() => buildEmbedUrl(loc.value));
const openUrl = computed(() => buildOpenUrl(loc.value));
</script>

<template>
  <h2 class="inv-title">Lokasi</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <div class="loc__text">
    <p class="loc__name">{{ loc.name }}</p>
    <p class="inv-text inv-text--sm">{{ loc.address }}</p>
  </div>

  <div class="loc__map" :class="{ 'is-passive': editor?.editable.value }">
    <iframe
      v-if="embedUrl"
      :src="embedUrl"
      title="Peta lokasi acara"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
    <div v-else class="loc__empty"><Icon name="pin" :size="24" /><span>Lokasi belum diatur</span></div>
  </div>

  <a v-if="openUrl" class="inv-btn" :href="openUrl" target="_blank" rel="noopener noreferrer">
    <Icon name="pin" :size="15" /> Buka Google Maps
  </a>
</template>

<style>
.loc__text { display: grid; gap: 2px; }
.loc__name {
  margin: 0;
  font-family: var(--f-heading);
  font-size: calc(1.4rem * var(--h-scale));
  color: var(--c-heading);
}
.loc__map {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid color-mix(in srgb, var(--c-primary) 45%, transparent);
  background: var(--c-surface);
}
.loc__map iframe { width: 100%; height: 100%; border: 0; display: block; }
.loc__map.is-passive iframe { pointer-events: none; }
.loc__empty {
  height: 100%;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--c-muted);
}
</style>
