import { onMounted, toValue } from 'vue';
import { loadAllFonts, loadFonts } from '../../composables/useFonts';

/** Muat font yang dibutuhkan untuk pratinjau di panel editor (daftar nama atau semua font). */
export function useFontsPreload(names) {
  onMounted(() => (names ? loadFonts(toValue(names)) : loadAllFonts()));
}
