<script setup>
import { RouterLink } from 'vue-router';
import Icon from '../Icon.vue';

defineProps({
  mode: { type: String, required: true },
  dirty: Boolean,
  saving: Boolean,
  invitation: { type: Object, default: null },
});
defineEmits(['preview', 'edit', 'save', 'reset']);
</script>

<template>
  <header class="head">
    <div class="brand">
      <RouterLink to="/admin" class="btn btn--ghost btn--sm back" title="Kembali ke dashboard" aria-label="Kembali ke dashboard">
        <Icon name="arrowLeft" :size="16" />
      </RouterLink>
      <span class="brand__mark"><Icon name="heart" :size="16" /></span>
      <span class="brand__name" :title="invitation?.title">{{ invitation?.title || 'Undangan' }}</span>
      <span v-if="mode === 'edit'" class="state" :class="{ 'is-dirty': dirty }">
        <i /> {{ dirty ? 'Belum disimpan' : 'Tersimpan' }}
      </span>
    </div>

    <div class="actions">
      <RouterLink v-if="invitation" :to="`/admin/invitations/${invitation.id}/guests`" class="btn btn--ghost" title="Daftar tamu & link undangan">
        <Icon name="users" :size="16" /><span class="lbl">Tamu</span>
      </RouterLink>
      <a v-if="invitation" :href="`/${invitation.slug}`" target="_blank" rel="noopener" class="btn btn--ghost" title="Buka undangan publik (tab baru)">
        <Icon name="external" :size="16" /><span class="lbl">Lihat</span>
      </a>
      <button type="button" class="btn btn--ghost" title="Kembalikan ke default" @click="$emit('reset')">
        <Icon name="reset" :size="16" /><span class="lbl">Reset</span>
      </button>
      <button v-if="mode === 'edit'" type="button" class="btn" @click="$emit('preview')">
        <Icon name="eye" :size="16" /><span class="lbl">Preview</span>
      </button>
      <button v-else type="button" class="btn" @click="$emit('edit')">
        <Icon name="pencil" :size="16" /><span class="lbl">Edit</span>
      </button>
      <button type="button" class="btn btn--primary" :disabled="saving" @click="$emit('save')">
        <Icon name="save" :size="16" /><span class="lbl">{{ saving ? 'Menyimpan…' : 'Save' }}</span>
        <span v-if="dirty" class="dot" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: var(--header-h);
  padding: 0 18px;
  background: var(--ui-surface);
  border-bottom: 1px solid var(--ui-border);
}
.brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
.brand__mark { display: grid; place-items: center; width: 30px; height: 30px; color: #e8b98c; background: var(--ui-ink); border-radius: 9px; }
.brand__name { min-width: 0; overflow: hidden; text-overflow: ellipsis; font-family: 'Playfair Display', Georgia, serif; font-weight: 600; font-size: 19px; letter-spacing: -0.01em; white-space: nowrap; }
.back { padding: 0 8px; text-decoration: none; }
.actions .btn { text-decoration: none; }
.state { display: inline-flex; align-items: center; gap: 6px; margin-left: 6px; font-size: 12px; color: var(--ui-muted); white-space: nowrap; }
.state i { width: 7px; height: 7px; border-radius: 50%; background: var(--ui-success); }
.state.is-dirty i { background: var(--ui-accent); animation: blink 1.6s ease-in-out infinite; }
@keyframes blink { 50% { opacity: 0.35; } }
.actions { display: flex; align-items: center; gap: 8px; }
.btn { position: relative; }
.dot { position: absolute; top: -3px; right: -3px; width: 9px; height: 9px; background: var(--ui-accent); border: 2px solid var(--ui-surface); border-radius: 50%; }

@media (max-width: 719px) {
  .head { padding: 0 12px; }
  .state { display: none; }
  .brand__mark { display: none; }
  .brand__name { font-size: 16px; }
  .btn { padding: 0 11px; }
  .lbl { display: none; }
  .btn--primary .lbl { display: inline; }
}
</style>
