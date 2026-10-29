<script setup>
import { inject } from 'vue';
import Icon from '../Icon.vue';
import { reveal as vReveal } from '../../directives/reveal';

/**
 * Pembungkus tiap section: memberi animasi muncul + tombol "Edit" saat dipakai di builder.
 * Konteks editor di-inject dari InvitationPreview sehingga komponen section tetap murni konten.
 */
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  panel: { type: String, default: null },
  focus: { type: String, default: null },
});

const editor = inject('invEditor', null);
</script>

<template>
  <section class="inv-section" :data-section="id">
    <div v-reveal class="inv-section__inner">
      <slot />
    </div>
    <button
      v-if="editor?.editable.value && panel"
      type="button"
      class="inv-edit"
      @click.stop="editor.request(panel, focus)"
    >
      <Icon name="pencil" :size="13" />
      Edit {{ label }}
    </button>
  </section>
</template>
