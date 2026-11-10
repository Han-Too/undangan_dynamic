<script setup>
import { computed, reactive } from 'vue';
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import { coverTextAnims, densities, openingAnims, particleMotions, particlePresets, photoMotions, revealAnims } from '../../data/animations';
import Icon from '../Icon.vue';
import { shapes } from '../invitation/fx/shapes';
import AccordionGroup from './ui/AccordionGroup.vue';
import PanelHeader from './ui/PanelHeader.vue';
import ToggleSwitch from './ui/ToggleSwitch.vue';

/**
 * Pengaturan animasi. Saklar utama mematikan semua gerakan; tiap pilihan "Ikuti tema" disimpan
 * sebagai string kosong sehingga ikut berubah saat tema diganti.
 */
const { state, theme } = useInvitation();
const { replayCover } = useBuilderUi();
const a = state.animation;
const open = reactive({ opening: true, reveal: true, text: false, particles: true, extra: false });

/** Grup pilihan bertema: key di state.animation ↔ key di theme.motion. */
const choiceGroups = computed(() => [
  { key: 'opening', acc: 'opening', title: 'Animasi Buka Undangan', list: openingAnims, replay: true },
  { key: 'reveal', acc: 'reveal', title: 'Animasi Muncul Section', list: revealAnims },
  { key: 'coverText', acc: 'text', title: 'Animasi Teks Cover', list: coverTextAnims, replay: true },
]);

const isOn = (key, id) => (id === '' ? !a[key] : a[key] === id);
const setChoice = (key, id, replay) => {
  a[key] = id;
  if (replay) replayCover();
};
const themeName = (list, key) => list.find((o) => o.id === theme.value.motion[key])?.name ?? '';

const particleIcon = (p) => (p.shapes ? shapes[p.shapes[0]] : '');
const customized = computed(() => ['reveal', 'opening', 'coverText', 'photo', 'particles', 'motion'].some((k) => a[k]) || a.density !== 'normal');
function resetAll() {
  Object.assign(a, { enabled: true, reveal: '', opening: '', coverText: '', photo: '', particles: '', motion: '', density: 'normal', burst: true, ornaments: true });
}
</script>

<template>
  <div class="panel">
    <PanelHeader title="Animasi" desc="Atur gerakan undangan: cara cover dibuka, cara section muncul, partikel latar, dan lainnya. Bisa dimatikan semuanya." />

    <div class="master" :class="{ 'is-off': !a.enabled }">
      <ToggleSwitch v-model="a.enabled" label="Aktifkan animasi" :hint="a.enabled ? 'Semua animasi berjalan sesuai pilihan di bawah.' : 'Undangan tampil diam tanpa gerakan.'" />
    </div>

    <div class="row">
      <button type="button" class="btn btn--sm" @click="replayCover"><Icon name="play" :size="12" /> Coba dari cover</button>
      <button v-if="customized" type="button" class="btn btn--sm btn--ghost" @click="resetAll"><Icon name="reset" :size="14" /> Ikuti tema</button>
    </div>

    <fieldset class="groups" :disabled="!a.enabled">
      <AccordionGroup v-for="g in choiceGroups" :key="g.key" v-model="open[g.acc]" :title="g.title">
        <div class="chips" role="radiogroup" :aria-label="g.title">
          <button type="button" role="radio" class="chipbtn" :class="{ 'is-on': isOn(g.key, '') }" :aria-checked="isOn(g.key, '')" @click="setChoice(g.key, '', g.replay)">
            Ikuti tema <em>({{ themeName(g.list, g.key) }})</em>
          </button>
          <button
            v-for="o in g.list"
            :key="o.id"
            type="button"
            role="radio"
            class="chipbtn"
            :class="{ 'is-on': isOn(g.key, o.id) }"
            :aria-checked="isOn(g.key, o.id)"
            @click="setChoice(g.key, o.id, g.replay)"
          >
            <span class="demo" :data-demo="`${g.key}-${o.id}`" aria-hidden="true" />{{ o.name }}
          </button>
        </div>
      </AccordionGroup>

      <AccordionGroup v-model="open.particles" title="Partikel Latar">
        <div class="parts" role="radiogroup" aria-label="Partikel latar">
          <button
            v-for="p in particlePresets"
            :key="p.id"
            type="button"
            role="radio"
            class="part"
            :class="{ 'is-on': p.id === 'theme' ? !a.particles : a.particles === p.id }"
            @click="a.particles = p.id === 'theme' ? '' : p.id"
          >
            <svg v-if="p.shapes" viewBox="0 0 24 24" fill="currentColor" v-html="particleIcon(p)" />
            <Icon v-else :name="p.id === 'none' ? 'x' : 'palette'" :size="18" />
            <small>{{ p.name }}</small>
          </button>
        </div>

        <div class="field">
          <span class="field__label">Arah gerak</span>
          <div class="seg seg--5">
            <button v-for="m in particleMotions" :key="m.id" type="button" :class="{ 'is-on': a.motion === m.id }" @click="a.motion = m.id">{{ m.name }}</button>
          </div>
        </div>
        <div class="field">
          <span class="field__label">Jumlah partikel</span>
          <div class="seg">
            <button v-for="d in densities" :key="d.id" type="button" :class="{ 'is-on': a.density === d.id }" @click="a.density = d.id">{{ d.name }}</button>
          </div>
        </div>
      </AccordionGroup>

      <AccordionGroup v-model="open.extra" title="Gerak Foto & Ornamen">
        <div class="field">
          <span class="field__label">Gerak foto profil</span>
          <div class="chips">
            <button type="button" class="chipbtn" :class="{ 'is-on': !a.photo }" @click="a.photo = ''">Ikuti tema <em>({{ themeName(photoMotions, 'photo') }})</em></button>
            <button v-for="m in photoMotions" :key="m.id" type="button" class="chipbtn" :class="{ 'is-on': a.photo === m.id }" @click="a.photo = m.id">{{ m.name }}</button>
          </div>
        </div>
        <ToggleSwitch v-model="a.burst" label="Ledakan partikel saat dibuka" hint="Partikel memercik dari tombol Buka Undangan." />
        <ToggleSwitch v-model="a.ornaments" label="Ornamen bergoyang" hint="Ornamen bingkai cover & pembatas bergerak pelan." />
      </AccordionGroup>
    </fieldset>
  </div>
</template>

<style scoped>
.row { display: flex; flex-wrap: wrap; gap: 6px; }
.master { padding: 12px 14px; background: var(--ui-accent-soft); border-radius: var(--ui-radius); }
.master.is-off { background: var(--ui-sunken); }
.groups { display: grid; gap: 14px; min-width: 0; margin: 0; padding: 0; border: 0; transition: opacity 0.2s; }
.groups:disabled { opacity: 0.45; pointer-events: none; }

.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chipbtn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ui-muted);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 999px;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.chipbtn em { font-style: normal; font-weight: 500; opacity: 0.75; }
.chipbtn:hover { color: var(--ui-ink); border-color: var(--ui-ink); }
.chipbtn.is-on { color: #fff; background: var(--ui-ink); border-color: var(--ui-ink); }

/* Demo mini: kotak kecil yang memperagakan efek saat chip di-hover */
.demo {
  width: 12px;
  height: 12px;
  flex: none;
  background: var(--ui-accent);
  border-radius: 3px;
  opacity: 0.85;
}
.chipbtn.is-on .demo { background: #fff; }
.chipbtn:hover .demo { animation: demo-generic 1.1s ease-in-out infinite; }
.chipbtn:hover .demo[data-demo$='-fade'] { animation-name: demo-fade; }
.chipbtn:hover .demo[data-demo*='zoom'] { animation-name: demo-zoom; }
.chipbtn:hover .demo[data-demo$='-slideLeft'],
.chipbtn:hover .demo[data-demo$='-alternate'] { animation-name: demo-left; }
.chipbtn:hover .demo[data-demo$='-slideRight'] { animation-name: demo-right; }
.chipbtn:hover .demo[data-demo$='-drop'],
.chipbtn:hover .demo[data-demo$='-slideDown'] { animation-name: demo-drop; }
.chipbtn:hover .demo[data-demo$='-flip'],
.chipbtn:hover .demo[data-demo$='-book'] { animation-name: demo-flip; }
.chipbtn:hover .demo[data-demo$='-rotate'] { animation-name: demo-rotate; }
.chipbtn:hover .demo[data-demo$='-none'] { animation: none; }
@keyframes demo-generic { 0% { opacity: 0; transform: translateY(6px); } 60%, 100% { opacity: 1; transform: none; } }
@keyframes demo-fade { 0% { opacity: 0; } 60%, 100% { opacity: 1; } }
@keyframes demo-zoom { 0% { opacity: 0; transform: scale(0.3); } 60%, 100% { opacity: 1; transform: none; } }
@keyframes demo-left { 0% { opacity: 0; transform: translateX(8px); } 60%, 100% { opacity: 1; transform: none; } }
@keyframes demo-right { 0% { opacity: 0; transform: translateX(-8px); } 60%, 100% { opacity: 1; transform: none; } }
@keyframes demo-drop { 0% { opacity: 0; transform: translateY(-8px); } 60%, 100% { opacity: 1; transform: none; } }
@keyframes demo-flip { 0% { transform: perspective(40px) rotateY(90deg); } 60%, 100% { transform: none; } }
@keyframes demo-rotate { 0% { transform: rotate(-90deg); opacity: 0; } 60%, 100% { transform: none; opacity: 1; } }

.parts { display: grid; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 8px; }
.part {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 10px 4px 8px;
  color: var(--ui-accent);
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 11px;
}
.part svg { width: 20px; height: 20px; }
.part small { font-size: 11px; line-height: 1.2; color: var(--ui-muted); }
.part:hover { border-color: var(--ui-ink); }
.part.is-on { border-color: var(--ui-ink); box-shadow: 0 0 0 1px var(--ui-ink); }
.part:hover svg { animation: demo-zoom 1s ease-in-out infinite alternate; }

.seg { display: grid; grid-template-columns: repeat(3, 1fr); padding: 3px; gap: 3px; background: var(--ui-sunken); border-radius: 10px; }
.seg--5 { grid-template-columns: repeat(5, 1fr); }
.seg button { padding: 8px 2px; font-size: 11.5px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 8px; }
.seg button.is-on { color: var(--ui-ink); background: var(--ui-surface); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); }
</style>
