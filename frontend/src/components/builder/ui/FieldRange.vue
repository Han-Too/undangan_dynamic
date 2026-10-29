<script setup>
defineProps({
  label: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  suffix: { type: String, default: '' },
});
const model = defineModel({ type: Number, default: 0 });
</script>

<template>
  <label class="field">
    <span class="range__head">
      <span class="field__label">{{ label }}</span>
      <span class="range__value">{{ model }}{{ suffix }}</span>
    </span>
    <input v-model.number="model" type="range" :min="min" :max="max" :step="step" />
  </label>
</template>

<style scoped>
.range__head { display: flex; justify-content: space-between; }
.range__value { font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
</style>
