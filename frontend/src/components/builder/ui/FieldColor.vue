<script setup>
import { computed } from 'vue';

/** Pemilih warna: kosong = ikuti tema (tampilkan `fallback`), terisi = override user. */
const props = defineProps({ label: String, fallback: { type: String, required: true } });
const model = defineModel({ type: String, default: '' });

const shown = computed(() => model.value || props.fallback);
</script>

<template>
  <div class="color">
    <label class="color__swatch" :style="{ background: shown }">
      <input type="color" class="sr-only" :value="shown" :aria-label="label" @input="model = $event.target.value" />
    </label>
    <div class="color__meta">
      <span class="field__label">{{ label }}</span>
      <span class="color__value">{{ shown.toUpperCase() }} · {{ model ? 'Kustom' : 'Dari tema' }}</span>
    </div>
    <button v-if="model" type="button" class="btn btn--ghost btn--sm" @click="model = ''">Reset</button>
  </div>
</template>

<style scoped>
.color {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.color__swatch {
  position: relative;
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.15s;
}
.color__swatch:hover { transform: scale(1.06); }
.color__swatch:focus-within { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
.color__meta { flex: 1; display: grid; min-width: 0; }
.color__value { font-size: 12px; color: var(--ui-muted); font-variant-numeric: tabular-nums; }
</style>
