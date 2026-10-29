import { computed, ref } from 'vue';
import { rsvpService } from '../services/rsvpService';

const entries = ref([]);
let context = null;

/**
 * Hubungkan state RSVP ke undangan yang sedang dibuka (lihat bentuk konteks di rsvpService).
 * `initial` dipakai bila data sudah ikut terambil bersama undangan (halaman tamu).
 */
export async function bindRsvp(ctx, initial) {
  context = ctx;
  entries.value = initial ?? [];
  if (!initial) entries.value = await rsvpService.list(ctx);
}

async function load() {
  if (context) entries.value = await rsvpService.list(context);
}

/** State RSVP bersama (form di undangan + ringkasan di editor). */
export function useRsvp() {
  const stats = computed(() => {
    const attending = entries.value.filter((e) => e.attendance === 'hadir');
    return {
      total: entries.value.length,
      attending: attending.length,
      declined: entries.value.length - attending.length,
      guests: attending.reduce((sum, e) => sum + e.guests, 0),
    };
  });

  return {
    entries,
    stats,
    reload: load,
    async submit(payload) {
      if (!context) throw new Error('Undangan belum dimuat.');
      const entry = await rsvpService.submit(context, payload);
      // Tamu berlink pribadi memperbarui RSVP lamanya: ganti entri dengan id sama.
      entries.value = [entry, ...entries.value.filter((e) => e.id !== entry.id)];
      return entry;
    },
    async clear() {
      if (!context) return;
      await rsvpService.clear(context);
      entries.value = [];
    },
  };
}
