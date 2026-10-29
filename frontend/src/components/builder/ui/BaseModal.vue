<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  open: Boolean,
  title: String,
  width: { type: String, default: '420px' },
});
const emit = defineEmits(['close']);
const dialog = ref(null);

const onKey = (e) => e.key === 'Escape' && emit('close');

watch(
  () => props.open,
  async (open) => {
    if (open) {
      document.addEventListener('keydown', onKey);
      await nextTick();
      dialog.value?.focus();
    } else {
      document.removeEventListener('keydown', onKey);
    }
  },
  { immediate: true },
);
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal" @mousedown.self="emit('close')">
        <div ref="dialog" class="modal__box" :style="{ maxWidth: width }" role="dialog" aria-modal="true" :aria-label="title" tabindex="-1">
          <header v-if="title" class="modal__head"><h2>{{ title }}</h2></header>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(28, 26, 23, 0.5);
  backdrop-filter: blur(3px);
}
.modal__box {
  width: 100%;
  max-height: calc(100dvh - 32px);
  overflow: auto;
  padding: 22px;
  background: var(--ui-surface);
  border-radius: 16px;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5);
  outline: none;
}
.modal__head h2 { margin: 0 0 6px; font-size: 18px; letter-spacing: -0.01em; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-active .modal__box, .modal-leave-active .modal__box { transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal__box, .modal-leave-to .modal__box { transform: translateY(12px) scale(0.98); }
</style>
