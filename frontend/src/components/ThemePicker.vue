<script setup>
import { computed, ref, watch } from 'vue';
import { loadFonts } from '../composables/useFonts';
import { fontStack, getFont } from '../data/fonts';
import { patterns } from '../data/patterns';
import { getTheme, themeCategories, themeList } from '../data/themes';
import Icon from './Icon.vue';
import OrnamentDivider from './invitation/ornaments/OrnamentDivider.vue';

/**
 * Pemilih tema: cari, tab kategori, dan grid kartu pratinjau (2 kolom di panel sempit).
 * Dipakai di panel Tema builder dan saat membuat undangan baru. v-model = id tema.
 */
const props = defineProps({
  modelValue: { type: String, default: '' },
  /** Jumlah kolom kartu; 0 = otomatis menyesuaikan lebar (mis. di modal). */
  columns: { type: Number, default: 2 },
});
const emit = defineEmits(['update:modelValue']);

loadFonts(themeList.map((t) => t.fonts.heading));

const activeCat = ref(getTheme(props.modelValue || 'wedding').category);
watch(
  () => props.modelValue,
  (id) => id && (activeCat.value = getTheme(id).category),
);
const category = computed(() => themeCategories.find((c) => c.id === activeCat.value));
const countOf = (id) => themeList.filter((t) => t.category === id).length;

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
const total = computed(() => groups.value.reduce((n, g) => n + g.items.length, 0));

const audienceLabel = { female: 'Cewek', male: 'Cowok' };
const animated = (t) => t.scene && !['none', 'minimal'].includes(t.scene);

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
  <div class="tpick" :style="{ '--grid-cols': columns ? `repeat(${columns}, minmax(0, 1fr))` : 'repeat(auto-fill, minmax(118px, 1fr))' }">
    <label class="tpick__search">
      <Icon name="search" :size="15" />
      <input v-model="query" type="search" placeholder="Cari tema: sakura, dino, imlek, wisuda…" aria-label="Cari tema" />
      <button v-if="query" type="button" aria-label="Hapus pencarian" @click="query = ''"><Icon name="x" :size="13" /></button>
    </label>

    <div v-show="!query" class="tpick__cats" role="tablist" aria-label="Kategori tema">
      <button
        v-for="c in themeCategories"
        :key="c.id"
        type="button"
        role="tab"
        class="tpick__cat"
        :class="{ 'is-active': activeCat === c.id, 'has-current': modelValue && getTheme(modelValue).category === c.id }"
        :aria-selected="activeCat === c.id"
        @click="activeCat = c.id"
      >
        {{ c.name }} <small>{{ countOf(c.id) }}</small>
      </button>
    </div>
    <p class="tpick__desc">
      <template v-if="!query">{{ category?.desc }}</template>
      <template v-else-if="total">{{ total }} tema cocok dengan “{{ query }}”.</template>
      <template v-else>Tidak ada tema yang cocok dengan “{{ query }}”.</template>
    </p>

    <section v-for="g in groups" :key="`${query ? 'q' : activeCat}-${g.name}`" class="tpick__group">
      <h3 v-if="g.name" class="tpick__gtitle">{{ g.name }} <small>{{ g.items.length }}</small></h3>
      <div class="tpick__grid" role="radiogroup" :aria-label="g.name || category?.name">
        <button
          v-for="t in g.items"
          :key="t.id"
          type="button"
          role="radio"
          class="tcard"
          :class="{ 'is-active': modelValue === t.id }"
          :aria-checked="modelValue === t.id"
          @click="emit('update:modelValue', t.id)"
        >
          <span class="tcard__preview" :style="previewVars(t)">
            <span class="tcard__pattern" />
            <span v-if="t.audience" class="tcard__aud" :data-aud="t.audience">{{ audienceLabel[t.audience] }}</span>
            <span class="tcard__eyebrow">{{ t.copy.cover.label }}</span>
            <span class="tcard__names">{{ t.copy.cover.names }}</span>
            <OrnamentDivider :type="t.ornaments.divider" class="tcard__divider" />
            <span class="tcard__btn" />
            <span v-if="animated(t)" class="tcard__anim" title="Ilustrasi bergerak"><Icon name="sparkles" :size="10" /></span>
          </span>
          <span class="tcard__meta">
            <strong>{{ t.name }}</strong>
            <small>{{ t.tagline }}</small>
          </span>
          <span v-if="modelValue === t.id" class="tcard__check"><Icon name="check" :size="12" /></span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Variabel --ui-* milik builder; fallback dipakai saat komponen tampil di area admin. */
.tpick {
  --tp-surface: var(--ui-surface, #fff);
  --tp-border: var(--ui-border, #e7e5e4);
  --tp-strong: var(--ui-border-strong, #d6d3d1);
  --tp-ink: var(--ui-ink, #1c1917);
  --tp-muted: var(--ui-muted, #78716c);
  --tp-faint: var(--ui-faint, #a8a29e);
  --tp-sunken: var(--ui-sunken, #f5f5f4);
  display: grid;
  min-width: 0;
}
.tpick__search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 10px;
  color: var(--tp-muted);
  background: var(--tp-surface);
  border: 1px solid var(--tp-strong);
  border-radius: 10px;
}
.tpick__search:focus-within { border-color: var(--tp-ink); color: var(--tp-ink); }
.tpick__search input { flex: 1; min-width: 0; min-height: 36px; padding: 0; font: inherit; font-size: 13px; color: inherit; background: none; border: 0; outline: none; }
.tpick__search button { display: grid; place-items: center; width: 22px; height: 22px; padding: 0; color: inherit; background: var(--tp-sunken); border: 0; border-radius: 50%; cursor: pointer; }

.tpick__cats { display: flex; flex-wrap: wrap; gap: 6px; }
.tpick__cat {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--tp-muted);
  background: var(--tp-surface);
  border: 1px solid var(--tp-border);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.tpick__cat small { font-size: 11px; font-weight: 600; opacity: 0.6; }
.tpick__cat:hover { color: var(--tp-ink); border-color: var(--tp-ink); }
.tpick__cat.is-active { color: #fff; background: var(--tp-ink); border-color: var(--tp-ink); }
.tpick__cat.has-current:not(.is-active)::after { content: ''; position: absolute; top: 3px; right: 3px; width: 6px; height: 6px; background: var(--tp-ink); border-radius: 50%; }
.tpick__desc { margin: 10px 0 2px; font-size: 12.5px; color: var(--tp-muted); }

.tpick__group { display: grid; gap: 8px; margin-top: 14px; }
.tpick__gtitle { margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tp-faint); }
.tpick__gtitle small { font-weight: 600; opacity: 0.7; }
.tpick__grid { display: grid; grid-template-columns: var(--grid-cols); gap: 8px; }

.tcard {
  position: relative;
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 5px;
  font: inherit;
  text-align: left;
  color: var(--tp-ink);
  background: var(--tp-surface);
  border: 1px solid var(--tp-border);
  border-radius: 12px;
  cursor: pointer;
  /* Kartu di luar layar tidak dirender sampai digulir: ratusan tema tetap ringan. */
  content-visibility: auto;
  contain-intrinsic-size: auto 190px;
  transition: border-color 0.15s, box-shadow 0.2s, transform 0.2s;
}
.tcard:hover { transform: translateY(-2px); box-shadow: 0 8px 18px -12px rgba(0, 0, 0, 0.35); }
.tcard.is-active { border-color: var(--tp-ink); box-shadow: 0 0 0 1px var(--tp-ink); }
.tcard__preview {
  position: relative;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 3px;
  aspect-ratio: 1 / 1.08;
  overflow: hidden;
  background: var(--p-bg);
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07);
}
.tcard__pattern { position: absolute; inset: 0; background: var(--p-pattern) 0 0 / var(--p-size); opacity: 0.55; }
.tcard__preview::after { content: ''; position: absolute; inset: 5px; border: 1px solid var(--p-primary); border-radius: 5px; opacity: 0.55; }
.tcard__eyebrow, .tcard__names, .tcard__divider, .tcard__btn { position: relative; z-index: 1; }
.tcard__eyebrow { max-width: 86%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 6px; letter-spacing: 0.2em; color: var(--p-primary); font-weight: 600; text-transform: uppercase; }
.tcard__names { max-width: 90%; font-family: var(--p-font); font-size: calc(17px * var(--p-scale)); line-height: 1.1; color: var(--p-heading); text-align: center; overflow-wrap: anywhere; }
.tcard__divider { width: 52px; color: var(--p-primary); }
.tcard__btn { width: 32px; height: 8px; margin-top: 4px; background: var(--p-secondary); border-radius: 999px; }
.tcard__aud { position: absolute; top: 8px; left: 8px; z-index: 2; padding: 1px 6px; font-size: 9px; font-weight: 700; color: #fff; border-radius: 999px; }
.tcard__aud[data-aud='female'] { background: #d6578a; }
.tcard__aud[data-aud='male'] { background: #3f74c9; }
.tcard__anim {
  position: absolute;
  right: 7px;
  bottom: 7px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  color: #fff;
  background: rgba(20, 16, 12, 0.55);
  border-radius: 50%;
}
.tcard__meta { display: grid; min-width: 0; padding: 0 3px 3px; }
.tcard__meta strong { overflow: hidden; font-size: 12.5px; line-height: 1.3; text-overflow: ellipsis; white-space: nowrap; }
.tcard__meta small { overflow: hidden; font-size: 10.5px; line-height: 1.3; color: var(--tp-muted); text-overflow: ellipsis; white-space: nowrap; }
.tcard__check {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  color: #fff;
  background: var(--tp-ink);
  border-radius: 50%;
  animation: tp-pop 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}
@keyframes tp-pop { from { transform: scale(0); } }
</style>
