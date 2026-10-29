import { onMounted, toValue } from 'vue';
import { loadAllFonts, loadFont } from '../../composables/useFonts';

/** Muat font yang dibutuhkan untuk pratinjau di panel editor (daftar nama atau semua font). */
export function useFontsPreload(names) {
  onMounted(() => (names ? toValue(names).forEach(loadFont) : loadAllFonts()));
}
