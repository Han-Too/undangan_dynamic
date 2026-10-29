<script setup>
defineProps({
  label: { type: String, required: true },
  hint: String,
  type: { type: String, default: 'text' },
  multiline: Boolean,
  rows: { type: Number, default: 3 },
  placeholder: String,
  maxlength: Number,
});
const model = defineModel({ type: [String, Number], default: '' });
</script>

<template>
  <label class="field">
    <span class="field__label">{{ label }}</span>
    <textarea v-if="multiline" v-model="model" class="input" :rows="rows" :placeholder="placeholder" :maxlength="maxlength" />
    <input v-else v-model="model" class="input" :type="type" :placeholder="placeholder" :maxlength="maxlength" />
    <small v-if="hint" class="field__hint">{{ hint }}</small>
  </label>
</template>
