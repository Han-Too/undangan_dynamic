<script setup>
defineProps({ label: { type: String, required: true }, hint: String });
const model = defineModel({ type: Boolean, default: false });
</script>

<template>
  <label class="toggle">
    <span class="toggle__text">
      <span class="field__label">{{ label }}</span>
      <small v-if="hint" class="field__hint">{{ hint }}</small>
    </span>
    <input v-model="model" type="checkbox" class="sr-only" role="switch" />
    <span class="toggle__track" aria-hidden="true"><span class="toggle__thumb" /></span>
  </label>
</template>

<style scoped>
.toggle { display: flex; align-items: center; justify-content: space-between; gap: 14px; cursor: pointer; }
.toggle__text { display: grid; }
.toggle__track {
  position: relative;
  flex: none;
  width: 38px;
  height: 22px;
  background: var(--ui-border-strong);
  border-radius: 999px;
  transition: background 0.2s;
}
.toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}
input:checked ~ .toggle__track { background: var(--ui-ink); }
input:checked ~ .toggle__track .toggle__thumb { transform: translateX(16px); }
input:focus-visible ~ .toggle__track { outline: 2px solid var(--ui-accent); outline-offset: 2px; }
</style>
