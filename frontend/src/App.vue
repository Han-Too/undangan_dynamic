<script setup>
import { RouterView } from 'vue-router';
import ToastHost from './components/builder/ui/ToastHost.vue';
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <RouterView />
  <!-- ToastHost: notifikasi editor & halaman undangan. Toaster (sonner): notifikasi dashboard admin. -->
  <ToastHost />
  <Toaster position="top-right" />
</template>
