<script setup>
import { computed, ref } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { buildEmbedUrl, buildOpenUrl, hasCoords, parseMapsUrl } from '../../utils/maps';
import Icon from '../Icon.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state } = useInvitation();
const loc = state.location;

const status = ref(null); // { kind: 'ok' | 'info' | 'error', text }

const toNum = (v) => (v === '' || v === null ? null : Number.isFinite(Number(v)) ? Number(v) : null);
const lat = computed({ get: () => loc.latitude ?? '', set: (v) => (loc.latitude = toNum(v)) });
const lng = computed({ get: () => loc.longitude ?? '', set: (v) => (loc.longitude = toNum(v)) });

const embedUrl = computed(() => buildEmbedUrl(loc));
const openUrl = computed(() => buildOpenUrl(loc));

/** Dipanggil setiap URL berubah: ekstrak koordinat/nama otomatis bila memungkinkan. */
function onUrl(value) {
  loc.mapsUrl = value;
  if (!value.trim()) return (status.value = null);

  const parsed = parseMapsUrl(value);
  if (!parsed) return (status.value = { kind: 'error', text: 'Bukan URL Google Maps yang valid.' });

  if (parsed.latitude !== null) {
    loc.latitude = parsed.latitude;
    loc.longitude = parsed.longitude;
    status.value = { kind: 'ok', text: `Koordinat terdeteksi: ${parsed.latitude}, ${parsed.longitude}` };
  } else {
    status.value = { kind: 'info', text: 'Tautan tersimpan. Peta ditampilkan dari nama & alamat (link pendek tidak memuat koordinat).' };
  }
  if (parsed.name && !loc.name) loc.name = parsed.name;
}

function generateUrl() {
  const q = hasCoords(loc) ? `${loc.latitude},${loc.longitude}` : [loc.name, loc.address].filter(Boolean).join(', ');
  if (!q) return (status.value = { kind: 'error', text: 'Isi koordinat atau nama/alamat dulu.' });
  onUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`);
}
</script>

<template>
  <div class="panel">
    <PanelHeader title="Lokasi" desc="Tempel link Google Maps, koordinat terbaca otomatis. Peta dan tombol “Buka Google Maps” langsung diperbarui." />

    <FieldText
      :model-value="loc.mapsUrl"
      label="Google Maps URL"
      placeholder="https://www.google.com/maps/place/…"
      @update:model-value="onUrl"
    />
    <p v-if="status" class="status" :class="`status--${status.kind}`" role="status">
      <Icon :name="status.kind === 'error' ? 'x' : 'check'" :size="14" /> {{ status.text }}
    </p>

    <FieldText v-model="loc.name" label="Nama lokasi" placeholder="Gedung Serbaguna" />
    <FieldText v-model="loc.address" label="Alamat" multiline :rows="3" />
    <div class="row">
      <FieldText v-model="lat" type="number" label="Latitude" placeholder="-6.2088" />
      <FieldText v-model="lng" type="number" label="Longitude" placeholder="106.8456" />
    </div>

    <div class="map" aria-label="Pratinjau peta">
      <iframe v-if="embedUrl" :key="embedUrl" :src="embedUrl" title="Pratinjau peta" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      <div v-else class="map__empty"><Icon name="pin" :size="22" />Isi lokasi untuk melihat peta</div>
    </div>

    <div class="actions">
      <button type="button" class="btn" @click="generateUrl"><Icon name="link" :size="15" /> Buat link dari data</button>
      <a v-if="openUrl" class="btn" :href="openUrl" target="_blank" rel="noopener noreferrer"><Icon name="external" :size="15" /> Uji link</a>
    </div>
  </div>
</template>

<style scoped>
.status { margin: -6px 0 0; display: flex; align-items: flex-start; gap: 6px; font-size: 12.5px; }
.status .icon { margin-top: 2px; }
.status--ok { color: var(--ui-success); }
.status--info { color: var(--ui-muted); }
.status--error { color: var(--ui-danger); }
.map { aspect-ratio: 4 / 3; overflow: hidden; background: var(--ui-sunken); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.map iframe { width: 100%; height: 100%; border: 0; display: block; }
.map__empty { height: 100%; display: grid; place-content: center; justify-items: center; gap: 6px; font-size: 13px; color: var(--ui-muted); }
.actions { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
