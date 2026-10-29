import { ref } from 'vue';

const toasts = ref([]);
let seq = 0;

export function useToast() {
  const push = (message, type = 'info', duration = 2600) => {
    const id = ++seq;
    toasts.value.push({ id, message, type });
    setTimeout(() => dismiss(id), duration);
  };
  const dismiss = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };
  return { toasts, push, dismiss };
}
