<script setup>
import { useInvitation } from '../../composables/useInvitation';
import { fontStack, fonts } from '../../data/fonts';
import { useFontsPreload } from './useFontsPreload';
import PanelHeader from './ui/PanelHeader.vue';

const { state, theme, headingFont, bodyFont } = useInvitation();
useFontsPreload();

const groups = [
  { key: 'heading', title: 'Heading', hint: 'Nama, judul, dan headline', sample: 'Raka & Ayu' },
  { key: 'body', title: 'Body', hint: 'Deskripsi, detail acara, dan alamat', sample: 'Sabtu, 12 Desember 2026' },
];
</script>

<template>
  <div class="panel">
    <PanelHeader title="Typography" desc="Pilih font untuk judul dan isi. Perubahan langsung tampil di preview." />

    <div class="sample">
      <p class="sample__h" :style="{ fontFamily: fontStack(headingFont) }">Raka &amp; Ayu</p>
      <p class="sample__b" :style="{ fontFamily: fontStack(bodyFont) }">
        Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami.
      </p>
    </div>

    <section v-for="g in groups" :key="g.key" class="stack">
      <div class="head">
        <h3>{{ g.title }} Font</h3>
        <small>{{ g.hint }}</small>
      </div>
      <div class="fonts" role="radiogroup" :aria-label="`${g.title} font`">
        <button
          type="button"
          role="radio"
          class="font font--theme"
          :class="{ 'is-active': !state.typography[g.key] }"
          :aria-checked="!state.typography[g.key]"
          @click="state.typography[g.key] = ''"
        >
          <span class="font__name">Bawaan tema</span>
          <span class="font__sub">{{ theme.fonts[g.key] }}</span>
        </button>
        <button
          v-for="f in fonts"
          :key="f.name"
          type="button"
          role="radio"
          class="font"
          :class="{ 'is-active': state.typography[g.key] === f.name }"
          :aria-checked="state.typography[g.key] === f.name"
          @click="state.typography[g.key] = f.name"
        >
          <span class="font__sample" :style="{ fontFamily: fontStack(f.name) }">{{ g.sample }}</span>
          <span class="font__sub">{{ f.name }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sample {
  padding: 20px 18px;
  text-align: center;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
}
.sample__h { margin: 0 0 6px; font-size: 34px; line-height: 1.15; }
.sample__b { margin: 0; font-size: 13px; color: var(--ui-muted); }
.head h3 { margin: 0; font-size: 14px; }
.head small { color: var(--ui-muted); font-size: 12px; }
.fonts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.font {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px;
  text-align: left;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 10px;
  transition: border-color 0.15s, background 0.15s;
}
.font:hover { border-color: var(--ui-faint); }
.font.is-active { border-color: var(--ui-ink); box-shadow: 0 0 0 1px var(--ui-ink); }
.font--theme { grid-column: 1 / -1; background: var(--ui-sunken); }
.font__name { font-weight: 600; font-size: 13px; }
.font__sample { font-size: 17px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.font__sub { font-size: 11px; color: var(--ui-muted); }
</style>
