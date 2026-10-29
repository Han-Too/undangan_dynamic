import InvitationClosing from '../components/invitation/InvitationClosing.vue';
import InvitationCountdown from '../components/invitation/InvitationCountdown.vue';
import InvitationEvent from '../components/invitation/InvitationEvent.vue';
import InvitationGallery from '../components/invitation/InvitationGallery.vue';
import InvitationGift from '../components/invitation/InvitationGift.vue';
import InvitationLocation from '../components/invitation/InvitationLocation.vue';
import InvitationOpening from '../components/invitation/InvitationOpening.vue';
import InvitationProfile from '../components/invitation/InvitationProfile.vue';
import InvitationRsvp from '../components/invitation/InvitationRsvp.vue';

/**
 * Daftar section undangan (urutan = urutan tampil), selain Cover.
 * Menambah section baru: buat komponen, daftarkan di sini, lalu (opsional) tambahkan
 * `sections.<id>` di data/defaults.js agar bisa dimatikan user.
 *
 *  id     kunci visibilitas di state.sections
 *  label  nama pada tombol "Edit …" dan daftar toggle
 *  panel  id panel editor yang dibuka saat tombol Edit diklik (lihat data/editorPanels.js)
 *  focus  sub-bagian di dalam panel yang dibuka
 */
export const invitationSections = [
  { id: 'opening', label: 'Pembuka', component: InvitationOpening, panel: 'general', focus: 'opening' },
  { id: 'profile', label: 'Profil', component: InvitationProfile, panel: 'general', focus: 'profile' },
  { id: 'event', label: 'Acara', component: InvitationEvent, panel: 'event' },
  { id: 'countdown', label: 'Countdown', component: InvitationCountdown, panel: 'general', focus: 'cover' },
  { id: 'gallery', label: 'Galeri', component: InvitationGallery, panel: 'gallery' },
  { id: 'location', label: 'Lokasi', component: InvitationLocation, panel: 'location' },
  { id: 'rsvp', label: 'RSVP', component: InvitationRsvp, panel: 'rsvp' },
  { id: 'gift', label: 'Hadiah', component: InvitationGift, panel: 'gift' },
  { id: 'closing', label: 'Penutup', component: InvitationClosing, panel: 'general', focus: 'closing' },
];
