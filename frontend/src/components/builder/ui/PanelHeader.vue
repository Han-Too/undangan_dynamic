<script setup>
defineProps({ title: { type: String, required: true }, desc: String });
</script>

<template>
  <header class="panel__head">
    <h2 class="panel__title">{{ title }}</h2>
    <p v-if="desc" class="panel__desc">{{ desc }}</p>
  </header>
</template>
