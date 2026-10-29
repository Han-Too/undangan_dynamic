<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import { useMusic } from '../../composables/useMusic';
import { useToast } from '../../composables/useToast';
import { getPanel } from '../../data/editorPanels';
import Icon from '../Icon.vue';
import InvitationPreview from '../invitation/InvitationPreview.vue';
import BuilderHeader from './BuilderHeader.vue';
import EditorPanel from './EditorPanel.vue';
import PhoneFrame from './PhoneFrame.vue';
import ConfirmModal from './ui/ConfirmModal.vue';

const { ui, openPanel, setMode } = useBuilderUi();
const { dirty, save, reset, meta } = useInvitation();
const { pause } = useMusic();
const { push } = useToast();

const preview = ref(null);
const opened = ref(false);
const saving = ref(false);
const confirmReset = ref(false);

// ── viewport ────────────────────────────────────────────────
const isMobile = ref(false);
let mql;
const syncMql = () => (isMobile.value = mql.matches);
onMounted(() => {
  mql = matchMedia('(max-width: 719px)');
  syncMql();
  mql.addEventListener('change', syncMql);
  window.addEventListener('keydown', onKey);
  window.addEventListener('beforeunload', onBeforeUnload);
});
onBeforeUnmount(() => {
  mql?.removeEventListener('change', syncMql);
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('beforeunload', onBeforeUnload);
});

// ── aksi ────────────────────────────────────────────────────
async function onSave() {
  saving.value = true;
  try {
    await save();
    push('Undangan tersimpan', 'success');
  } catch (e) {
    push(e.message, 'error');
  } finally {
    saving.value = false;
  }
}

function onReset() {
  confirmReset.value = false;
  reset();
  opened.value = false;
  pause();
  preview.value?.showCover();
  push('Dikembalikan ke default. Klik Save untuk menyimpan.', 'success');
}

function onKey(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    onSave();
  }
}
const onBeforeUnload = (e) => {
  if (dirty.value) e.preventDefault();
};

// ── sinkron editor ↔ preview ────────────────────────────────
let fromPreview = false; // klik chip "Edit" di preview: jangan scroll ulang
function onPreviewEdit({ panel, focus }) {
  fromPreview = true;
  openPanel(panel, focus);
}

watch(
  () => ui.panel,
  async () => {
    const skip = fromPreview;
    fromPreview = false;
    const target = getPanel(ui.panel).section;
    if (skip || !target || ui.mode !== 'edit') return;
    opened.value = true;
    await nextTick();
    preview.value?.scrollToSection(target);
  },
);

function showCover() {
  preview.value?.showCover();
}

function togglePreviewMode(mode) {
  setMode(mode);
}
</script>

<template>
  <div class="builder" :class="[`builder--${ui.mode}`, { 'is-mobile': isMobile }]">
    <BuilderHeader
      :mode="ui.mode"
      :dirty="dirty"
      :saving="saving"
      :invitation="meta"
      @preview="togglePreviewMode('preview')"
      @edit="togglePreviewMode('edit')"
      @save="onSave"
      @reset="confirmReset = true"
    />

    <div class="body">
      <aside class="sheet" :class="{ 'is-open': ui.sheetOpen }" :aria-hidden="isMobile && !ui.sheetOpen ? 'true' : undefined" :inert="isMobile && !ui.sheetOpen">
        <div class="sheet__bar">
          <span class="sheet__grip" aria-hidden="true" />
          <strong>{{ getPanel(ui.panel).label }}</strong>
          <button type="button" class="btn btn--ghost btn--sm" aria-label="Tutup editor" @click="ui.sheetOpen = false">
            <Icon name="x" :size="16" />
          </button>
        </div>
        <EditorPanel />
      </aside>

      <main class="stage">
        <div v-if="ui.mode === 'edit'" class="stage__bar">
          <div class="seg" role="group" aria-label="Tampilan preview">
            <button type="button" :class="{ 'is-on': !opened }" @click="showCover">Cover</button>
            <button type="button" :class="{ 'is-on': opened }" @click="opened = true">Isi</button>
          </div>
          <span class="stage__hint"><Icon name="pencil" :size="13" /> Arahkan kursor ke bagian undangan untuk mengedit</span>
        </div>

        <div class="stage__phone">
          <PhoneFrame :bare="isMobile || ui.mode === 'preview'">
            <InvitationPreview ref="preview" v-model:opened="opened" :editable="ui.mode === 'edit'" @edit="onPreviewEdit" />
          </PhoneFrame>
        </div>

        <button v-if="ui.mode === 'preview'" type="button" class="fab fab--edit" @click="togglePreviewMode('edit')">
          <Icon name="arrowLeft" :size="16" /> Kembali edit
        </button>
        <button v-else-if="isMobile && !ui.sheetOpen" type="button" class="fab fab--edit" @click="ui.sheetOpen = true">
          <Icon name="sliders" :size="16" /> Edit
        </button>
      </main>
    </div>

    <ConfirmModal
      :open="confirmReset"
      title="Reset Invitation?"
      message="Semua customization akan dikembalikan ke konfigurasi default. Perubahan baru tersimpan ke server setelah Anda menekan Save."
      confirm-text="Reset"
      danger
      @confirm="onReset"
      @cancel="confirmReset = false"
    />
  </div>
</template>

<style scoped>
.builder { display: grid; grid-template-rows: var(--header-h) minmax(0, 1fr); height: 100dvh; }
.body { display: grid; grid-template-columns: 420px minmax(0, 1fr); min-height: 0; }

.sheet { min-height: 0; border-right: 1px solid var(--ui-border); background: var(--ui-bg); }
.sheet__bar { display: none; }

.stage {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 16px 20px 24px;
  background:
    radial-gradient(circle, #d6d1c4 1px, transparent 1.2px) 0 0 / 22px 22px,
    var(--ui-bg);
}
.stage__bar { display: flex; align-items: center; justify-content: center; gap: 16px; padding-bottom: 14px; }
.stage__hint { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--ui-muted); }
.stage__phone { flex: 1; min-height: 0; }

.seg { display: inline-grid; grid-template-columns: 1fr 1fr; padding: 3px; background: var(--ui-surface); border: 1px solid var(--ui-border); border-radius: 999px; }
.seg button { padding: 6px 16px; font-size: 12.5px; font-weight: 600; color: var(--ui-muted); background: none; border: 0; border-radius: 999px; transition: all 0.15s; }
.seg button.is-on { color: #fff; background: var(--ui-ink); }

.fab {
  position: absolute;
  left: 50%;
  bottom: 28px;
  z-index: 30;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  font-weight: 600;
  color: #fff;
  background: var(--ui-ink);
  border: 0;
  border-radius: 999px;
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.55);
  transform: translateX(-50%);
  transition: background 0.15s;
}
.fab:hover { background: var(--ui-accent); }

/* Mode Preview: tamu-view tanpa editor */
.builder--preview .sheet { display: none; }
.builder--preview .body { grid-template-columns: 1fr; }
.builder--preview .stage { padding: 0; }
.builder--preview .fab { left: 16px; bottom: 16px; transform: none; }

/* Tablet: editor di atas, preview di bawah */
@media (max-width: 1099px) {
  .builder { height: auto; min-height: 100dvh; }
  .body { grid-template-columns: 1fr; grid-template-rows: auto auto; }
  .sheet { height: 460px; border-right: 0; border-bottom: 1px solid var(--ui-border); }
  .stage { padding-bottom: 40px; }
  .stage__phone { flex: none; height: 860px; }
  .builder--preview { height: 100dvh; }
  .builder--preview .stage__phone { flex: 1; height: auto; }
  .stage__hint { display: none; }
}

/* Mobile: preview penuh + editor sebagai bottom sheet */
@media (max-width: 719px) {
  .builder { height: 100dvh; min-height: 0; }
  .body { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) auto; }
  .stage { order: -1; padding: 0; background: var(--ui-bg); }
  .stage__bar { padding: 8px 0; background: var(--ui-bg); border-bottom: 1px solid var(--ui-border); }
  .stage__hint { display: none; }
  .stage__phone { flex: 1; height: auto; min-height: 0; }
  .fab { bottom: 18px; left: 16px; transform: none; }

  .sheet {
    height: 0;
    overflow: hidden;
    border: 0;
    border-radius: 18px 18px 0 0;
    box-shadow: 0 -12px 40px -16px rgba(0, 0, 0, 0.35);
    transition: height 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
  }
  .sheet.is-open { height: min(56dvh, 480px); }
  .sheet__bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 8px 4px 16px;
    background: var(--ui-bg);
  }
  .sheet__grip { position: absolute; top: 6px; left: 50%; width: 36px; height: 4px; background: var(--ui-border-strong); border-radius: 4px; transform: translateX(-50%); }
  .sheet :deep(.editor) { height: 100%; }
}
</style>
