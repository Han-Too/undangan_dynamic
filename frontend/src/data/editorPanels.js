import ColorEditor from '../components/builder/ColorEditor.vue';
import ContentEditor from '../components/builder/ContentEditor.vue';
import EventEditor from '../components/builder/EventEditor.vue';
import GalleryEditor from '../components/builder/GalleryEditor.vue';
import GiftEditor from '../components/builder/GiftEditor.vue';
import LocationEditor from '../components/builder/LocationEditor.vue';
import MusicEditor from '../components/builder/MusicEditor.vue';
import PhotoEditor from '../components/builder/PhotoEditor.vue';
import RsvpEditor from '../components/builder/RsvpEditor.vue';
import ThemeSelector from '../components/builder/ThemeSelector.vue';
import TypographyEditor from '../components/builder/TypographyEditor.vue';

/**
 * Menu editor (dikelompokkan). Menambah panel: buat komponen, tambahkan satu item di sini.
 *  section  id section undangan yang di-scroll saat panel dibuka (opsional)
 */
export const editorGroups = [
  {
    id: 'design',
    label: 'Design',
    items: [
      { id: 'theme', label: 'Tema', icon: 'palette', component: ThemeSelector },
      { id: 'typography', label: 'Font', icon: 'type', component: TypographyEditor },
      { id: 'colors', label: 'Warna', icon: 'droplet', component: ColorEditor },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      { id: 'general', label: 'Umum', icon: 'file', component: ContentEditor },
      { id: 'event', label: 'Acara', icon: 'calendar', component: EventEditor, section: 'event' },
      { id: 'gallery', label: 'Galeri', icon: 'grid', component: GalleryEditor, section: 'gallery' },
      { id: 'rsvp', label: 'RSVP', icon: 'mail', component: RsvpEditor, section: 'rsvp' },
      { id: 'gift', label: 'Hadiah', icon: 'gift', component: GiftEditor, section: 'gift' },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    items: [
      { id: 'photos', label: 'Foto', icon: 'image', component: PhotoEditor },
      { id: 'music', label: 'Musik', icon: 'music', component: MusicEditor },
    ],
  },
  {
    id: 'location',
    label: 'Location',
    items: [{ id: 'location', label: 'Maps', icon: 'pin', component: LocationEditor, section: 'location' }],
  },
];

export const editorPanels = editorGroups.flatMap((g) => g.items);
export const getPanel = (id) => editorPanels.find((p) => p.id === id) ?? editorPanels[0];
