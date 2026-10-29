<script setup>
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/** items: [{ label, value, hint? }] */
defineProps({ items: { type: Array, required: true } });
</script>

<template>
  <div class="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
    <Card v-for="s in items" :key="s.label" class="gap-0 py-5">
      <CardHeader class="px-5">
        <CardDescription>{{ s.label }}</CardDescription>
        <CardTitle class="text-2xl font-semibold tabular-nums">{{ s.value }}</CardTitle>
        <p v-if="s.hint" class="text-muted-foreground text-xs">{{ s.hint }}</p>
      </CardHeader>
    </Card>
  </div>
</template>
