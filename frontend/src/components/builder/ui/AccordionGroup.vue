<script setup>
import Icon from '../../Icon.vue';

defineProps({ title: { type: String, required: true } });
const open = defineModel({ type: Boolean, default: false });
</script>

<template>
  <section class="acc" :class="{ 'is-open': open }">
    <button type="button" class="acc__head" :aria-expanded="open" @click="open = !open">
      <span>{{ title }}</span>
      <Icon name="chevron" :size="16" />
    </button>
    <div v-if="open" class="acc__body"><slot /></div>
  </section>
</template>

<style scoped>
.acc { background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: var(--ui-radius); }
.acc__head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 14px;
  font-weight: 600;
  background: none;
  border: 0;
  text-align: left;
}
.acc__head .icon { color: var(--ui-muted); transition: transform 0.2s; }
.is-open > .acc__head .icon { transform: rotate(180deg); }
.acc__body { display: grid; gap: 14px; padding: 2px 14px 16px; animation: acc-in 0.2s ease; }
@keyframes acc-in { from { opacity: 0; transform: translateY(-4px); } }
</style>
