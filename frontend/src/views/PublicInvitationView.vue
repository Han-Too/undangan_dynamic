<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PhoneFrame from '../components/builder/PhoneFrame.vue';
import InvitationPreview from '../components/invitation/InvitationPreview.vue';
import { useInvitation } from '../composables/useInvitation';
import { useMusic } from '../composables/useMusic';
import { bindRsvp } from '../composables/useRsvp';
import { api } from '../services/api';

/**
 * Halaman yang dibuka tamu: /{slug} atau /{slug}/{tamu}.
 * Semua isi diambil dari API publik; tidak perlu login.
 */
const route = useRoute();
const { loadInvitation } = useInvitation();
const { pause } = useMusic();

const status = ref('loading'); // 'loading' | 'ready' | 'notfound' | 'error'
const error = ref('');
const opened = ref(false);
const preview = ref(null);

async function load() {
  status.value = 'loading';
  opened.value = false;
  const { slug, guest } = route.params;
  try {
    const qs = guest ? `?guest=${encodeURIComponent(guest)}` : '';
    const res = await api.get(`/public/invitations/${encodeURIComponent(slug)}${qs}`);
    loadInvitation(res.invitation, { guest: res.guest });
    await bindRsvp({ mode: 'public', slug: res.invitation.slug, guestSlug: res.guest?.slug }, res.rsvps);
    document.title = res.guest ? `${res.invitation.title} · Untuk ${res.guest.name}` : res.invitation.title;
    status.value = 'ready';
  } catch (e) {
    status.value = e.status === 404 ? 'notfound' : 'error';
    error.value = e.message;
    document.title = 'Undangan tidak ditemukan';
  }
}

watch(() => [route.params.slug, route.params.guest], load, { immediate: true });
onBeforeUnmount(pause);
</script>

<template>
  <div class="public">
    <PhoneFrame v-if="status === 'ready'" bare>
      <InvitationPreview ref="preview" v-model:opened="opened" />
    </PhoneFrame>

    <div v-else-if="status === 'loading'" class="public__msg"><span class="spinner" /></div>

    <div v-else class="public__msg">
      <span class="public__icon" aria-hidden="true">✉</span>
      <h1>{{ status === 'notfound' ? 'Undangan tidak ditemukan' : 'Undangan gagal dimuat' }}</h1>
      <p>{{ status === 'notfound' ? 'Link mungkin salah ketik, sudah diganti, atau undangan belum diterbitkan.' : error }}</p>
      <button v-if="status === 'error'" type="button" class="btn" @click="load">Coba lagi</button>
    </div>
  </div>
</template>

<style scoped>
.public { height: 100dvh; background: #1c1a17; }
.public__msg { display: grid; place-content: center; justify-items: center; gap: 10px; height: 100%; padding: 24px; text-align: center; color: #e9e4da; }
.public__msg h1 { margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 600; }
.public__msg p { margin: 0; max-width: 360px; color: #a9a294; }
.public__icon { font-size: 40px; color: #d8a06b; }
.public :deep(.spinner) { border-color: #3a3733; border-top-color: #d8a06b; }
</style>
