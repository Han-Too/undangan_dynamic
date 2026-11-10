import { reactive } from 'vue';

/** State UI builder (bukan data undangan): panel aktif, mode, bottom sheet mobile. */
const ui = reactive({
  mode: 'edit', // 'edit' | 'preview'
  panel: 'theme',
  focus: null, // sub-bagian yang dibuka di dalam panel (mis. 'cover' di panel General)
  sheetOpen: false, // bottom sheet editor di mobile
  coverTick: 0, // dinaikkan untuk meminta preview menampilkan cover lagi (mis. mencoba animasi pembuka)
});

export function useBuilderUi() {
  return {
    ui,
    openPanel(panel, focus = null) {
      ui.panel = panel;
      ui.focus = focus;
      ui.sheetOpen = true;
    },
    /** Tampilkan cover di preview agar animasi pembuka bisa dicoba lagi. */
    replayCover() {
      ui.coverTick++;
    },
    setMode(mode) {
      ui.mode = mode;
      if (mode === 'preview') ui.sheetOpen = false;
    },
  };
}
