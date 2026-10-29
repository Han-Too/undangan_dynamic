<script setup>
import { computed, inject } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { formatDateDots } from '../../utils/format';
import Icon from '../Icon.vue';
import BackgroundFx from './fx/BackgroundFx.vue';
import InvPhoto from './InvPhoto.vue';
import OrnamentCorner from './ornaments/OrnamentCorner.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

defineProps({ opened: { type: Boolean, default: false } });
defineEmits(['open']);

const { state, theme, guest } = useInvitation();
const editor = inject('invEditor', null);
const cover = computed(() => state.content.cover);
</script>

<template>
  <section class="inv-cover" :class="{ 'is-open': opened }" data-section="cover" :inert="opened">
    <div v-if="state.photos.cover.src" class="inv-cover__photo">
      <InvPhoto :photo="state.photos.cover" label="Foto Cover" :placeholder="false" />
    </div>
    <div class="inv-cover__veil" />
    <BackgroundFx :fx="theme.fx" />

    <OrnamentCorner v-for="pos in ['tl', 'tr', 'bl', 'br']" :key="pos" :type="theme.ornaments.corner" :class="`corner--${pos}`" />

    <div class="inv-cover__body">
      <p class="inv-eyebrow">{{ cover.label }}</p>
      <h1 class="inv-cover__names">{{ cover.names }}</h1>
      <OrnamentDivider :type="theme.ornaments.divider" />
      <p class="inv-cover__date">{{ formatDateDots(cover.date) }}</p>
      <p class="inv-cover__guest">{{ cover.guestText }}</p>
      <p v-if="guest?.name || editor?.editable.value" class="inv-cover__to">{{ guest?.name || 'Nama Tamu' }}</p>
      <button type="button" class="inv-btn inv-cover__btn" @click="$emit('open')">
        {{ cover.buttonText || 'Buka Undangan' }}
      </button>
    </div>

    <button v-if="editor?.editable.value && !opened" type="button" class="inv-edit" @click.stop="editor.request('general', 'cover')">
      <Icon name="pencil" :size="13" /> Edit Cover
    </button>
  </section>
</template>
