/** URL publik undangan. Tanpa `guestSlug` = link umum, dengan `guestSlug` = link pribadi tamu. */
export const invitationUrl = (slug, guestSlug) => `${location.origin}/${slug}${guestSlug ? `/${guestSlug}` : ''}`;

/** 0812-345 / +62 812 345 -> 62812345 (format wa.me). */
export function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}

export const DEFAULT_SHARE_TEMPLATE = `Kepada Yth.
{nama}

Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.

Info lengkap acara dapat dilihat di:
{link}

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.`;

export const fillTemplate = (template, { name, link }) => template.replaceAll('{nama}', name).replaceAll('{link}', link);

export const whatsappUrl = (phone, text) => `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(text)}`;
