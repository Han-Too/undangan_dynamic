import { api } from './api';

/**
 * Service RSVP ke backend. Sumber data bergantung konteks halaman:
 *   { mode: 'admin', invitationId }        builder dashboard (lihat semua, hapus, uji kirim)
 *   { mode: 'public', slug, guestSlug }    halaman tamu (ucapan terbaru, kirim konfirmasi)
 *
 *   list(ctx)            -> Promise<Rsvp[]>
 *   submit(ctx, entry)   -> Promise<Rsvp>
 *   clear(ctx)           -> Promise<void>   (khusus admin)
 */
export const rsvpService = {
  async list(ctx) {
    if (ctx.mode === 'admin') return api.get(`/invitations/${ctx.invitationId}/rsvps`);
    const res = await api.get(`/public/invitations/${ctx.slug}`);
    return res.rsvps;
  },

  async submit(ctx, { name, attendance, guests, message }) {
    const body = { name: String(name).trim(), attendance, guests, message };
    if (!body.name) throw new Error('Nama wajib diisi.');
    if (ctx.mode === 'admin') return api.post(`/invitations/${ctx.invitationId}/rsvps`, body);
    return api.post(`/public/invitations/${ctx.slug}/rsvps`, { ...body, guest: ctx.guestSlug || undefined });
  },

  async clear(ctx) {
    if (ctx.mode === 'admin') await api.delete(`/invitations/${ctx.invitationId}/rsvps`);
  },
};
