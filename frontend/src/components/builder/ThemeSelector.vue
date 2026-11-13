<script setup>
import { computed, ref } from 'vue';
import { useFontsPreload } from './useFontsPreload';
import { useInvitation } from '../../composables/useInvitation';
import { fontStack, getFont } from '../../data/fonts';
import { patterns } from '../../data/patterns';
import { getTheme, themeCategories, themeList } from '../../data/themes';
import Icon from '../Icon.vue';
import OrnamentDivider from '../invitation/ornaments/OrnamentDivider.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state, setTheme } = useInvitation();
useFontsPreload(() => themeList.flatMap((t) => [t.fonts.heading]));

// Tab kategori dibuka sesuai tema yang sedang dipakai.
const activeCat = ref(getTheme(state.theme).category);
const category = computed(() => themeCategories.find((c) => c.id === activeCat.value));
const countOf = (id) => themeList.filter((t) => t.category === id).length;

/** Pencarian lintas kategori: nama, tagline, grup, atau nama kategori. */
const query = ref('');
const norm = (v) => String(v ?? '').toLowerCase();
const catName = (id) => themeCategories.find((x) => x.id === id)?.name ?? '';
const matches = (t, q) => [t.name, t.tagline, t.group, catName(t.category)].some((v) => norm(v).includes(q));

/** Tema kategori aktif (atau hasil cari), dikelompokkan per `group` (urutan kemunculan pertama). */
const groups = computed(() => {
  const q = norm(query.value.trim());
  const source = q ? themeList.filter((t) => matches(t, q)) : themeList.filter((x) => x.category === activeCat.value);
  const map = new Map();
  for (const t of source) {
    const key = q ? [catName(t.category), t.group].filter(Boolean).join(' · ') : t.group ?? '';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(t);
  }
  return [...map].map(([name, items]) => ({ name, items }));
});

const audienceLabel = { female: 'Cewek', male: 'Cowok' };

const previewVars = (t) => ({
  '--p-bg': t.colors.background,
  '--p-primary': t.colors.primary,
  '--p-secondary': t.colors.secondary,
  '--p-text': t.colors.text,
  '--p-heading': { text: t.colors.text, primary: t.colors.primary, secondary: t.colors.secondary }[t.headingColor],
  '--p-font': fontStack(t.fonts.heading),
  '--p-scale': Math.min(1, getFont(t.fonts.heading).scale),
  '--p-pattern': patterns[t.pattern.id](t.colors.primary),
  '--p-size': `${t.pattern.size / 2.4}px`,
});
</script>

<template>
  <div class="panel">
    <PanelHeader title="Tema" desc="Pilih kategori acara, lalu gayanya. Teks bawaan yang belum Anda ubah ikut menyesuaikan tema." />

    <label class="tsearch">
      <Icon name="search" :size="15" />
      <input v-model="query" type="search" placeholder="Cari tema: sakura, adat jawa, islami, gelap…" aria-label="Cari tema" />
      <button v-if="query" type="button" aria-label="Hapus pencarian" @click="query = ''"><Icon name="x" :size="13" /></button>
    </label>

    <div v-show="!query" class="cats" role="tablist" aria-label="Kategori tema">
      <button
        v-for="c in themeCategories"
        :key="c.id"
        type="button"
        role="tab"
        class="cat"
        :class="{ 'is-active': activeCat === c.id, 'has-current': getTheme(state.theme).category === c.id }"
        :aria-selected="activeCat === c.id"
        @click="activeCat = c.id"
      >
        {{ c.name }} <small>{{ countOf(c.id) }}</small>
      </button>
    </div>
    <p v-if="!query" class="cat-desc">{{ category?.desc }}</p>
    <p v-else-if="!groups.length" class="cat-desc">Tidak ada tema yang cocok dengan “{{ query }}”.</p>

    <section v-for="g in groups" :key="`${query ? 'q' : activeCat}-${g.name}`" class="tgroup">
      <h3 v-if="g.name" class="tgroup__title">{{ g.name }}</h3>
      <div class="themes" role="radiogroup" :aria-label="g.name || category?.name">
        <button
          v-for="t in g.items"
          :key="t.id"
          type="button"
          role="radio"
          class="tcard"
          :class="{ 'is-active': state.theme === t.id }"
          :aria-checked="state.theme === t.id"
          @click="setTheme(t.id)"
        >
          <span class="tcard__preview" :style="previewVars(t)">
            <span class="tcard__pattern" />
            <span v-if="t.audience" class="tcard__aud" :data-aud="t.audience">{{ audienceLabel[t.audience] }}</span>
            <span v-if="t.scene && t.scene !== 'none' && t.scene !== 'minimal'" class="tcard__anim" title="Ilustrasi bergerak"><Icon name="sparkles" :size="11" /></span>
            <span class="tcard__eyebrow">{{ t.copy.cover.label }}</span>
            <span class="tcard__names">{{ t.copy.cover.names }}</span>
            <OrnamentDivider :type="t.ornaments.divider" class="tcard__divider" />
            <span class="tcard__btn" />
          </span>
          <span class="tcard__meta">
            <strong>{{ t.name }}</strong>
            <small>{{ t.tagline }}</small>
          </span>
          <span class="tcard__swatches">
            <i :style="{ background: t.colors.primary }" />
            <i :style="{ background: t.colors.secondary }" />
            <i :style="{ background: t.colors.background }" />
          </span>
          <span v-if="state.theme === t.id" class="tcard__check"><Icon name="check" :size="13" /></span>
        </button>
      </div>
    </section>
  </div>
</template>
  
  <style scoped>
  .cats { display: flex; flex-wrap: wrap; gap: 6px; }
  .cat {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--ui-muted);
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: 999px;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .cat small { font-size: 11px; font-weight: 600; opacity: 0.6; }
  .cat:hover { color: var(--ui-ink); border-color: var(--ui-ink); }
  .cat.is-active { color: #fff; background: var(--ui-ink); border-color: var(--ui-ink); }
  /* titik penanda: kategori dari tema yang sedang dipakai */
  .cat.has-current:not(.is-active)::after {
    content: '';
    position: absolute;
    top: 3px;
    right: 3px;
    width: 6px;
    height: 6px;
    background: var(--ui-ink);
    border-radius: 50%;
  }
  .cat-desc { margin: 10px 0 4px; font-size: 12.5px; color: var(--ui-muted); }
  .tsearch {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 0 10px;
    color: var(--ui-muted);
    background: var(--ui-surface);
    border: 1px solid var(--ui-border-strong);
    border-radius: var(--ui-radius-sm);
  }
  .tsearch:focus-within { border-color: var(--ui-ink); color: var(--ui-ink); }
  .tsearch input { flex: 1; min-width: 0; min-height: 36px; padding: 0; font-size: 13px; background: none; border: 0; outline: none; }
  .tsearch button { display: grid; place-items: center; width: 22px; height: 22px; padding: 0; color: inherit; background: var(--ui-sunken); border: 0; border-radius: 50%; }
  .tcard__anim {
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    color: #fff;
    background: rgba(20, 16, 12, 0.55);
    border-radius: 50%;
    backdrop-filter: blur(4px);
  }
  
  .tgroup { display: grid; gap: 10px; margin-top: 14px; }
  .tgroup__title { margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ui-faint); }
  
  .tcard__aud {
    position: absolute;
    top: 9px;
    left: 9px;
    z-index: 2;
    padding: 2px 7px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff;
    border-radius: 999px;
  }
  .tcard__aud[data-aud='female'] { background: #d6578a; }
  .tcard__aud[data-aud='male'] { background: #2f5fb3; }
  
  .themes { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
  .tcard {
    position: relative;
    display: grid;
    gap: 8px;
    padding: 8px;
    text-align: left;
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: 14px;
    transition: border-color 0.15s, box-shadow 0.2s, transform 0.2s;
  }
  .tcard:hover { transform: translateY(-2px); box-shadow: var(--ui-shadow); }
  .tcard.is-active { border-color: var(--ui-ink); box-shadow: 0 0 0 1px var(--ui-ink), var(--ui-shadow); }
  
  .tcard__preview {
    position: relative;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 4px;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: var(--p-bg);
    border-radius: 9px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07);
  }
  .tcard__pattern {
    position: absolute;
    inset: 0;
    background: var(--p-pattern) 0 0 / var(--p-size);
    opacity: 0.55;
  }
  .tcard__preview::after {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid var(--p-primary);
    border-radius: 6px;
    opacity: 0.55;
  }
  .tcard__eyebrow, .tcard__names, .tcard__divider, .tcard__btn { position: relative; z-index: 1; }
  .tcard__eyebrow { max-width: 86%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 6.5px; letter-spacing: 0.22em; color: var(--p-primary); font-weight: 600; text-transform: uppercase; }
  .tcard__names { font-family: var(--p-font); font-size: calc(21px * var(--p-scale)); line-height: 1.1; color: var(--p-heading); text-align: center; }
  .tcard__divider { width: 64px; color: var(--p-primary); }
  .tcard__btn { width: 38px; height: 10px; margin-top: 6px; background: var(--p-secondary); border-radius: 999px; }
  
  .tcard__meta { display: grid; padding: 0 4px; }
  .tcard__meta strong { font-size: 13.5px; }
  .tcard__meta small { font-size: 11.5px; color: var(--ui-muted); }
  .tcard__swatches { display: flex; gap: 4px; padding: 0 4px 4px; }
  .tcard__swatches i { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15); }
  .tcard__check {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    color: #fff;
    background: var(--ui-ink);
    border-radius: 50%;
    animation: pop 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
  }
  @keyframes pop { from { transform: scale(0); } }
  </style>
