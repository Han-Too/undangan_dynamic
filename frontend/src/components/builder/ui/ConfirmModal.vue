<script setup>
import BaseModal from './BaseModal.vue';

defineProps({
  open: Boolean,
  title: { type: String, required: true },
  message: String,
  confirmText: { type: String, default: 'Ya' },
  cancelText: { type: String, default: 'Batal' },
  danger: Boolean,
});
defineEmits(['confirm', 'cancel']);
</script>

<template>
  <BaseModal :open="open" :title="title" width="400px" @close="$emit('cancel')">
    <p class="confirm__msg">{{ message }}</p>
    <div class="confirm__actions">
      <button type="button" class="btn" @click="$emit('cancel')">{{ cancelText }}</button>
      <button type="button" class="btn" :class="danger ? 'btn--solid-danger' : 'btn--primary'" @click="$emit('confirm')">
        {{ confirmText }}
      </button>
    </div>
  </BaseModal>
</template>

<style scoped>
.confirm__msg { margin: 0 0 20px; color: var(--ui-muted); white-space: pre-line; }
.confirm__actions { display: flex; justify-content: flex-end; gap: 10px; }
</style>
