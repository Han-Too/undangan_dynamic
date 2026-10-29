<script setup>
import { ref } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { useToast } from '../../composables/useToast';
import { copyText } from '../../utils/clipboard';
import Icon from '../Icon.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme } = useInvitation();
const { push } = useToast();
const copied = ref(false);

async function copy() {
  const ok = await copyText(state.content.gift.accountNumber.replace(/\s/g, ''));
  push(ok ? 'Nomor rekening disalin' : 'Gagal menyalin, salin manual ya', ok ? 'success' : 'error');
  if (ok) {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  }
}
</script>

<template>
  <h2 class="inv-title">{{ state.content.gift.title }}</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <p class="inv-text">{{ state.content.gift.text }}</p>

  <div class="inv-card gift">
    <p class="gift__bank">{{ state.content.gift.bank }}</p>
    <p class="gift__number">{{ state.content.gift.accountNumber }}</p>
    <p class="inv-text inv-text--sm">a.n. {{ state.content.gift.accountName }}</p>
    <button type="button" class="inv-btn gift__btn" @click="copy">
      <Icon :name="copied ? 'check' : 'copy'" :size="15" />
      {{ copied ? 'Tersalin' : 'Salin Nomor Rekening' }}
    </button>
  </div>
</template>

<style>
.gift { display: grid; justify-items: center; gap: 6px; }
.gift__bank {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--c-primary);
}
.gift__number {
  margin: 0;
  font-family: var(--f-heading);
  font-size: calc(1.9rem * var(--h-scale));
  letter-spacing: 0.06em;
  font-variant-numeric: lining-nums tabular-nums;
  color: var(--c-heading);
  overflow-wrap: anywhere;
}
.gift__btn { margin-top: 12px; }
</style>
