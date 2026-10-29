import { reactive } from 'vue';

/** State UI builder (bukan data undangan): panel aktif, mode, bottom sheet mobile. */
const ui = reactive({
  mode: 'edit', // 'edit' | 'preview'
  panel: 'theme',
  focus: null, // sub-bagian yang dibuka di dalam panel (mis. 'cover' di panel General)
  sheetOpen: false, // bottom sheet editor di mobile
});

export function useBuilderUi() {
  return {
    ui,
    openPanel(panel, focus = null) {
      ui.panel = panel;
      ui.focus = focus;
      ui.sheetOpen = true;
    },
    setMode(mode) {
      ui.mode = mode;
      if (mode === 'preview') ui.sheetOpen = false;
    },
  };
}
