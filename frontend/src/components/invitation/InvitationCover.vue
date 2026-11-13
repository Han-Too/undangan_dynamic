<script setup>
import { computed, inject, ref } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { getBackground } from '../../data/coverBackgrounds';
import { formatDateDots } from '../../utils/format';
import Icon from '../Icon.vue';
import CoverFrame from './CoverFrame.vue';
import BackgroundFx from './fx/BackgroundFx.vue';
import SceneFx from './fx/SceneFx.vue';
import InvPhoto from './InvPhoto.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

defineProps({ opened: { type: Boolean, default: false } });
const emit = defineEmits(['open']);

const { state, theme, guest, isGreeting, coverDesign, effective, motion, fx } = useInvitation();
const editor = inject('invEditor', null);
const cover = computed(() => state.content.cover);
const hasPhoto = computed(() => !!state.photos.cover.src);
const layout = computed(() => coverDesign.value.layout);

/** Pembuka berdaun (pintu, pintu geser, amplop): latar & foto cover digambar di kedua daun lalu dibuka. */
const LEAF_OPENINGS = ['doors', 'shoji', 'envelope'];
const leafMode = computed(() => LEAF_OPENINGS.includes(motion.value.opening));

/** Background pilihan (null = latar bawaan tema dari BackgroundFx). */
const bgStyle = computed(() => {
  const bg = getBackground(coverDesign.value.background);
  if (!bg.css) return null;
  const c = { primary: effective('primary'), secondary: effective('secondary'), bg: effective('background'), text: effective('text') };
  return { background: bg.css(c) };
});

/** Titik pusat tombol (px, relatif cover): asal iris pembuka & ledakan partikel. */
const root = ref(null);
const origin = ref({ x: '50%', y: '70%' });
function open(e) {
  const box = root.value.getBoundingClientRect();
  const btn = e.currentTarget.getBoundingClientRect();
  const x = btn.left + btn.width / 2 - box.left;
  const y = btn.top + btn.height / 2 - box.top;
  origin.value = { x: `${x}px`, y: `${y}px` };
  emit('open', { x, y });
}
</script>

<template>
  <section
    ref="root"
    class="inv-cover"
    :class="{ 'is-open': opened, 'has-photo': hasPhoto, 'has-bg': !!bgStyle, 'is-leaf': leafMode }"
    :data-layout="layout"
    :data-open="motion.opening"
    :data-text="motion.coverText"
    :style="{ '--open-x': origin.x, '--open-y': origin.y, ...bgStyle }"
    data-section="cover"
    :inert="opened"
  >
    <div v-if="leafMode" class="inv-cover__leaves" aria-hidden="true">
      <div v-for="side in ['a', 'b']" :key="side" class="inv-cover__leaf" :class="`inv-cover__leaf--${side}`">
        <div class="inv-cover__face" :style="bgStyle">
          <template v-if="hasPhoto && layout !== 'split'">
            <div class="inv-cover__photo"><InvPhoto :photo="state.photos.cover" label="" :placeholder="false" /></div>
            <div class="inv-cover__veil" />
          </template>
        </div>
        <span class="inv-cover__seam" />
      </div>
    </div>
    <div v-if="hasPhoto && layout !== 'split' && !leafMode" class="inv-cover__photo">
      <InvPhoto :photo="state.photos.cover" label="Foto Cover" :placeholder="false" />
    </div>
    <div v-if="hasPhoto && layout !== 'split' && !leafMode" class="inv-cover__veil" />
    <BackgroundFx :fx="fx" />
    <SceneFx :scene="fx.scene" :still="fx.still" />

    <CoverFrame :frame="coverDesign.frame" :theme-corner="theme.ornaments.corner" />

    <div v-if="layout === 'split'" class="inv-cover__hero">
      <InvPhoto v-if="hasPhoto" :photo="state.photos.cover" label="Foto Cover" :placeholder="false" />
    </div>

    <div :key="motion.coverText" class="inv-cover__body">
      <p class="inv-eyebrow">{{ cover.label }}</p>
      <h1 class="inv-cover__names">{{ cover.names }}</h1>
      <OrnamentDivider :type="theme.ornaments.divider" />
      <p v-if="!isGreeting" class="inv-cover__date">{{ formatDateDots(cover.date) }}</p>
      <p class="inv-cover__guest">{{ cover.guestText }}</p>
      <p v-if="guest?.name || (editor?.editable.value && !isGreeting)" class="inv-cover__to">{{ guest?.name || 'Nama Tamu' }}</p>
      <button type="button" class="inv-btn inv-cover__btn" @click="open">
        {{ cover.buttonText || (isGreeting ? 'Buka Ucapan' : 'Buka Undangan') }}
      </button>
    </div>

    <div v-if="editor?.editable.value && !opened" class="inv-edit-group">
      <button type="button" class="inv-edit inv-edit--static" @click.stop="editor.request('cover')">
        <Icon name="layers" :size="13" /> Desain Cover
      </button>
      <button type="button" class="inv-edit inv-edit--static" @click.stop="editor.request('general', 'cover')">
        <Icon name="pencil" :size="13" /> Teks
      </button>
    </div>
  </section>
</template>
