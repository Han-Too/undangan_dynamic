<script setup>
import { useToast } from '../../../composables/useToast';
import Icon from '../../Icon.vue';

const { toasts } = useToast();
</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="toast" class="toasts" aria-live="polite">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast--${t.type}`" role="status">
        <Icon :name="t.type === 'error' ? 'x' : 'check'" :size="15" />
        {{ t.message }}
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style>
.toasts {
  position: fixed;
  left: 50%;
  bottom: calc(20px + env(safe-area-inset-bottom));
  z-index: 200;
  display: grid;
  gap: 8px;
  justify-items: center;
  transform: translateX(-50%);
  pointer-events: none;
  width: max-content;
  max-width: calc(100vw - 32px);
}
.toast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: var(--ui-ink);
  border-radius: 999px;
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
}
.toast--success .icon { color: #7fd6a6; }
.toast--error { background: var(--ui-danger); }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>
