<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import Icon from '../../components/Icon.vue';
import { useAuth } from '../../composables/useAuth';

const { user, isAdmin, logout } = useAuth();
const router = useRouter();
const route = useRoute();

async function onLogout() {
  await logout();
  router.replace('/login');
}
</script>

<template>
  <div class="adm">
    <header class="adm__bar">
      <RouterLink to="/admin" class="adm__brand">
        <span class="adm__mark"><Icon name="heart" :size="16" /></span>
        <span class="adm__name">Undangan<em>.</em>studio</span>
      </RouterLink>

      <nav class="adm__nav" aria-label="Menu dashboard">
        <RouterLink to="/admin" :class="{ 'is-active': route.name === 'guests' }"><Icon name="mail" :size="16" /><span class="lbl">Undangan</span></RouterLink>
        <RouterLink v-if="isAdmin" to="/admin/users"><Icon name="users" :size="16" /><span class="lbl">Pengguna</span></RouterLink>
        <RouterLink to="/admin/profile"><Icon name="user" :size="16" /><span class="lbl">Profil</span></RouterLink>
      </nav>

      <div class="adm__user">
        <div class="adm__who">
          <strong>{{ user?.name }}</strong>
          <small>{{ user?.role === 'admin' ? 'Admin' : 'User' }}</small>
        </div>
        <button type="button" class="btn btn--ghost btn--sm" title="Keluar" @click="onLogout">
          <Icon name="logout" :size="16" /><span class="lbl">Keluar</span>
        </button>
      </div>
    </header>

    <main class="adm__main">
      <RouterView />
    </main>
  </div>
</template>
