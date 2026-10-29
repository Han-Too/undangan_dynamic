<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, onBeforeRouteLeave, useRoute } from 'vue-router';
import Icon from '../components/Icon.vue';
import BuilderLayout from '../components/builder/BuilderLayout.vue';
import { useBuilderUi } from '../composables/useBuilderUi';
import { useInvitation } from '../composables/useInvitation';
import { useMusic } from '../composables/useMusic';
import { bindRsvp } from '../composables/useRsvp';
import { api } from '../services/api';

/** Builder untuk satu undangan: muat config dari database, simpan kembali lewat tombol Save. */
const route = useRoute();
const { loadInvitation, dirty } = useInvitation();
const { setMode } = useBuilderUi();
const { pause } = useMusic();

const status = ref('loading'); // 'loading' | 'ready' | 'error'
const error = ref('');

onMounted(async () => {
  try {
    const invitation = await api.get(`/invitations/${route.params.id}`);
    loadInvitation(invitation);
    setMode('edit');
    document.title = `Edit ${invitation.title} · Undangan Studio`;
    status.value = 'ready';
    bindRsvp({ mode: 'admin', invitationId: invitation.id }).catch(() => {});
  } catch (e) {
    error.value = e.message;
    status.value = 'error';
  }
});

onBeforeRouteLeave(() => {
  if (status.value === 'ready' && dirty.value && !window.confirm('Ada perubahan yang belum disimpan. Tinggalkan editor?')) return false;
  pause();
});
</script>

<template>
  <BuilderLayout v-if="status === 'ready'" />
  <div v-else class="loading" style="min-height: 100dvh">
    <span v-if="status === 'loading'" class="spinner" />
    <div v-else class="empty">
      <Icon name="x" :size="34" />
      <strong>Undangan tidak bisa dibuka</strong>
      <span>{{ error }}</span>
      <RouterLink to="/admin" class="btn"><Icon name="arrowLeft" :size="15" /> Kembali ke dashboard</RouterLink>
    </div>
  </div>
</template>
