<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="loading" style="min-height: 100dvh">
    <div class="empty">
      <strong>Halaman tidak ditemukan</strong>
      <RouterLink to="/admin" class="btn">Ke dashboard</RouterLink>
    </div>
  </div>
</template>
