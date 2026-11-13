/**
 * Katalog tema premium: dibangun dari "keluarga" gaya (Tionghoa, Jepang & Korea, Islami, Taman, adat Nusantara, dll.).
 * Keluarga menentukan font, pola, partikel, ilustrasi scene (data/scenes.js), animasi buka, dan teks bawaan;
 * tiap tema cukup mengatur palet + bagian yang berbeda. Format akhirnya sama dengan `themes` di themes.js.
 */

const vars = (radius, btn, shadow, spacing = '0', transform = 'none') => ({
  '--radius': radius,
  '--btn-radius': btn,
  '--btn-shadow': shadow,
  '--heading-spacing': spacing,
  '--heading-transform': transform,
});
const c = (primary, secondary, background, surface, text) => ({ primary, secondary, background, surface, text });
const fx = (shapes, count, motion, size, glow = ['primary', 'secondary'], patternMotion = 'none') => ({ particles: { shapes, count, motion, size }, patternMotion, glow });

/* ── Teks bawaan ─────────────────────────────────────────────── */
const SALAM = 'Assalamu’alaikum Warahmatullahi Wabarakatuh';
const AR_RUM = '“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.”';
const ev = (id, title, time, place = 'Gedung Graha Anggun') => ({ id, title, date: '2026-12-12', time, place });
const couple = (a = ['Raka', 'Raka Pratama', 'Putra pertama dari Bapak Hendra & Ibu Sari'], b = ['Ayu', 'Ayu Lestari', 'Putri kedua dari Bapak Wibowo & Ibu Dewi']) => [
  { name: a[0], fullName: a[1], parents: a[2] },
  { name: b[0], fullName: b[1], parents: b[2] },
];

function weddingCopy({ label = 'THE WEDDING OF', names = 'Raka & Ayu', people = couple(), openingTitle, opening, events, gallery, rsvp, gift, quote, source = '', message, profileTitle = 'Mempelai' }) {
  return {
    cover: { label, names },
    opening: { title: openingTitle, text: opening },
    profile: { title: profileTitle, people },
    events: events ?? [ev('ev-akad', 'Akad Nikah', '08.00 – 10.00 WIB'), ev('ev-resepsi', 'Resepsi', '11.00 – 14.00 WIB')],
    gallery: gallery ?? { title: 'Galeri Kami', caption: 'Potongan kisah kami menuju hari bahagia.' },
    rsvp: rsvp ?? { title: 'Konfirmasi Kehadiran', text: 'Mohon kabari kehadiran Anda agar kami dapat menyambut dengan sebaik-baiknya.' },
    gift: gift ?? { title: 'Tanda Kasih', text: 'Doa restu Anda adalah hadiah terindah. Bila ingin memberi tanda kasih, dapat melalui:' },
    closing: {
      quote,
      source,
      message: message ?? 'Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
      signature: names,
    },
  };
}

const COPY = {
  general: () =>
    weddingCopy({
      openingTitle: 'Dengan Penuh Syukur',
      opening: 'Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan menjadi bagian dari hari bahagia kami.',
      quote: '“Cinta tidak saling menatap, melainkan bersama-sama memandang ke arah yang sama.”',
    }),
  chinese: () =>
    weddingCopy({
      names: 'Kevin & Clarissa',
      people: couple(['Kevin', 'Kevin Wijaya', 'Putra dari Bapak Hendra Wijaya & Ibu Lina'], ['Clarissa', 'Clarissa Tan', 'Putri dari Bapak Johan Tan & Ibu Mei']),
      openingTitle: 'Sukacita Ganda',
      opening: 'Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk merayakan pernikahan kami. Kehadiran dan doa restu Anda adalah berkah bagi kedua keluarga.',
      events: [ev('ev-teapai', 'Tea Pai', '09.00 – 11.00 WIB', 'Kediaman Mempelai Wanita'), ev('ev-resepsi', 'Resepsi', '18.00 – 21.00 WIB')],
      gift: { title: 'Angpao Digital', text: 'Doa restu Anda sudah lebih dari cukup. Bila ingin mengirim angpao, dapat melalui:' },
      quote: '“Dua hati yang dipertemukan langit, dipersatukan dalam satu rumah.”',
      message: 'Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i di hari bahagia kami.',
    }),
  asian: () =>
    weddingCopy({
      openingTitle: 'Dengan Penuh Syukur',
      opening: 'Seperti musim semi yang datang tepat waktunya, kami dipertemukan dan kini melangkah bersama. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.',
      gallery: { title: 'Musim Kami', caption: 'Setiap musim menyimpan cerita.' },
      quote: '“Bunga yang mekar perlahan adalah bunga yang paling lama bertahan.”',
    }),
  islami: () =>
    weddingCopy({
      label: 'WALIMATUL ‘URSY',
      openingTitle: SALAM,
      opening: 'Bismillahirrahmanirrahim. Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami. Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
      events: [ev('ev-akad', 'Akad Nikah', '08.00 – 09.30 WIB', 'Masjid Al-Ikhlas'), ev('ev-walimah', 'Walimah', '11.00 – 13.00 WIB')],
      quote: AR_RUM,
      source: 'QS. Ar-Rum: 21',
      message: 'Wassalamu’alaikum Warahmatullahi Wabarakatuh. Atas doa dan kehadirannya, kami ucapkan jazakumullah khairan.',
    }),
  garden: () =>
    weddingCopy({
      openingTitle: 'Bersemi Bersama',
      opening: 'Seperti taman yang tumbuh dari benih kecil, cinta kami dirawat dengan sabar hingga mekar hari ini. Kami mengundang Bapak/Ibu/Saudara/i untuk merayakannya bersama kami.',
      gallery: { title: 'Taman Kenangan', caption: 'Bertumbuh bersama, hari demi hari.' },
      quote: '“Di mana pun cinta ditanam, di situ ia akan tumbuh.”',
    }),
  elegant: () =>
    weddingCopy({
      openingTitle: 'Together With Their Families',
      opening: 'Dengan penuh hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan dan merayakan janji suci kami.',
      gallery: { title: 'Our Moments', caption: 'Sebuah kisah, dalam beberapa bingkai.' },
      quote: '“Whatever our souls are made of, his and mine are the same.”',
      source: 'Emily Brontë',
    }),
  modern: () =>
    weddingCopy({
      label: 'SAVE THE DATE',
      openingTitle: 'Kami Menikah',
      opening: 'Setelah perjalanan panjang, kami memutuskan untuk melanjutkannya bersama. Datang, rayakan, dan doakan kami.',
      gallery: { title: 'Perjalanan Kita', caption: '' },
      quote: '“Rumah bukan tempat, melainkan seseorang.”',
    }),
  fun: () =>
    weddingCopy({
      label: 'WE’RE GETTING MARRIED!',
      openingTitle: 'Halo, Kamu!',
      opening: 'Akhirnya kami resmi! Kami ingin kamu ikut merayakan hari paling seru dalam hidup kami. Jangan lupa datang, ya!',
      gallery: { title: 'Arsip Kebucinan', caption: 'Dari kenalan sampai pelaminan.' },
      rsvp: { title: 'Datang, Kan?', text: 'Kabari kami biar kursimu aman dan camilannya cukup.' },
      gift: { title: 'Kirim Kado', text: 'Kehadiranmu sudah kado terbaik. Tapi kalau mau kirim sesuatu:' },
      quote: '“Ternyata jodoh itu bukan dicari, tapi diajak jajan terus.”',
      message: 'Sampai jumpa di hari H. Jangan telat, nanti ketinggalan foto bareng!',
    }),
  jawa: () =>
    weddingCopy({
      label: 'PAWIWAHAN',
      openingTitle: SALAM,
      opening: 'Kanthi nyuwun sih rahmatipun Gusti. Dengan memohon rahmat Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada pawiwahan putra-putri kami.',
      events: [ev('ev-siraman', 'Siraman', '09.00 WIB', 'Kediaman Mempelai Wanita'), ev('ev-akad', 'Akad Nikah', '08.00 – 10.00 WIB'), ev('ev-panggih', 'Panggih & Resepsi', '11.00 – 14.00 WIB')],
      quote: '“Witing tresna jalaran saka kulina.”',
      source: 'Pepatah Jawa',
      message: 'Matur nuwun atas doa pangestu dan kehadiran Bapak/Ibu/Saudara/i.',
    }),
  sunda: () =>
    weddingCopy({
      openingTitle: SALAM,
      opening: 'Kalayan rahmat Gusti Nu Maha Suci. Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan putra-putri kami dengan adat Sunda.',
      quote: '“Silih asih, silih asah, silih asuh.”',
      source: 'Falsafah Sunda',
      message: 'Hatur nuhun atas doa dan kehadirannya.',
    }),
  minang: () =>
    weddingCopy({
      label: 'BARALEK GADANG',
      openingTitle: SALAM,
      opening: 'Dengan rahmat Allah SWT, kami mengundang Bapak/Ibu/Dunsanak untuk hadir pada baralek putra-putri kami.',
      events: [ev('ev-akad', 'Akad Nikah', '08.00 – 10.00 WIB'), ev('ev-baralek', 'Baralek', '11.00 – 16.00 WIB')],
      quote: '“Adat basandi syarak, syarak basandi Kitabullah.”',
      source: 'Falsafah Minangkabau',
      message: 'Tarimo kasih atas doa jo kahadiran Bapak/Ibu/Dunsanak.',
    }),
  aceh: () =>
    weddingCopy({
      label: 'WALIMATUL ‘URSY',
      openingTitle: SALAM,
      opening: 'Dengan rahmat Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri walimah putra-putri kami.',
      events: [ev('ev-akad', 'Akad Nikah', '08.00 – 10.00 WIB', 'Masjid Raya'), ev('ev-walimah', 'Walimah', '11.00 – 15.00 WIB')],
      quote: AR_RUM,
      source: 'QS. Ar-Rum: 21',
      message: 'Teurimong geunaseh atas doa dan kehadirannya.',
    }),
  batak: () =>
    weddingCopy({
      names: 'Samuel & Ruth',
      people: couple(['Samuel', 'Samuel Simanjuntak', 'Putra dari Bapak J. Simanjuntak & Ibu br. Sitorus'], ['Ruth', 'Ruth br. Nainggolan', 'Putri dari Bapak P. Nainggolan & Ibu br. Siregar']),
      openingTitle: 'Horas!',
      opening: 'Dengan sukacita kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pemberkatan dan pesta adat pernikahan kami.',
      events: [ev('ev-pemberkatan', 'Pemberkatan Nikah', '09.00 WIB', 'Gereja HKBP'), ev('ev-adat', 'Pesta Adat', '12.00 WIB')],
      quote: '“Demikianlah mereka bukan lagi dua, melainkan satu.”',
      source: 'Matius 19:6',
      message: 'Mauliate atas doa dan kehadiran Bapak/Ibu/Saudara/i.',
    }),
  toraja: () =>
    weddingCopy({
      names: 'Yohanes & Maria',
      people: couple(['Yohanes', 'Yohanes Pakiding', 'Putra dari Bapak Daniel & Ibu Ruth'], ['Maria', 'Maria Tandirerung', 'Putri dari Bapak Petrus & Ibu Agustina']),
      openingTitle: 'Salam Sejahtera',
      opening: 'Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami dan sukacita rambu tuka’ keluarga.',
      events: [ev('ev-pemberkatan', 'Pemberkatan Nikah', '09.00 WITA', 'Gereja Toraja'), ev('ev-resepsi', 'Resepsi', '12.00 WITA')],
      quote: '“Kasih itu sabar, kasih itu murah hati.”',
      source: '1 Korintus 13:4',
      message: 'Kurre sumanga’ atas doa dan kehadiran Bapak/Ibu/Saudara/i.',
    }),
  bali: () =>
    weddingCopy({
      label: 'PAWIWAHAN',
      names: 'Made & Ayu',
      people: couple(['Made', 'I Made Wirawan', 'Putra dari I Nyoman Sudarsa & Ni Ketut Ariani'], ['Ayu', 'Ni Luh Ayu Pratiwi', 'Putri dari I Wayan Suarta & Ni Made Sri']),
      openingTitle: 'Om Swastyastu',
      opening: 'Atas asung kertha wara nugraha Ida Sang Hyang Widhi Wasa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada upacara pawiwahan putra-putri kami.',
      events: [ev('ev-pawiwahan', 'Upacara Pawiwahan', '09.00 WITA', 'Kediaman Mempelai Pria'), ev('ev-resepsi', 'Resepsi', '17.00 WITA')],
      quote: '“Semoga kalian berdua tidak terpisahkan, mencapai umur panjang, dan bahagia bersama keturunan.”',
      source: 'Rg Veda',
      message: 'Om Shanti Shanti Shanti Om. Matur suksma atas doa dan kehadirannya.',
    }),
  betawi: () =>
    weddingCopy({
      openingTitle: SALAM,
      opening: 'Dengan rahmat Allah SWT, kami mengundang Abang, Mpok, Bapak, dan Ibu untuk hadir di pernikahan kami dengan adat Betawi.',
      quote: AR_RUM,
      source: 'QS. Ar-Rum: 21',
      message: 'Makasih banyak atas doa dan kedatangannya.',
    }),
  melayu: () =>
    weddingCopy({
      label: 'WALIMATUL URUS',
      openingTitle: SALAM,
      opening: 'Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang, kami mempersilakan Dato’, Datin, Tuan, dan Puan ke majlis perkahwinan putra-putri kami.',
      quote: '“Kalau ada sumur di ladang, boleh kita menumpang mandi. Kalau ada umur yang panjang, boleh kita berjumpa lagi.”',
      source: 'Pantun Melayu',
      message: 'Terima kasih atas doa dan kehadiran Tuan dan Puan.',
    }),
  pedangPora: () =>
    weddingCopy({
      names: 'Raka & Ayu',
      people: couple(['Raka', 'Letda Raka Pratama, S.Tr.', 'Putra dari Bapak Hendra & Ibu Sari'], ['Ayu', 'Ayu Lestari, S.Kep.', 'Putri dari Bapak Wibowo & Ibu Dewi']),
      openingTitle: SALAM,
      opening: 'Dengan rahmat Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami dengan prosesi Pedang Pora.',
      events: [ev('ev-akad', 'Akad Nikah', '08.00 – 10.00 WIB'), ev('ev-pora', 'Pedang Pora & Resepsi', '11.00 – 14.00 WIB')],
      quote: '“Setia pada janji, teguh dalam pengabdian.”',
      message: 'Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i.',
    }),
  birthday: (age = '5', name = 'Alya') => ({
    cover: { label: `ULANG TAHUN KE-${age}`, names: name },
    opening: { title: 'Halo, Teman-Teman!', text: `Yuk datang ke pesta ulang tahun ${name}! Ada kue, permainan seru, dan banyak keceriaan.` },
    profile: { title: 'Yang Berulang Tahun', people: [{ name, fullName: `${name} Putri Pratama`, parents: 'Putri dari Bapak Hendra & Ibu Sari' }] },
    events: [ev('ev-party', 'Pesta Ulang Tahun', '15.00 – 17.00 WIB', 'Kediaman Keluarga')],
    gallery: { title: 'Momen Ceria', caption: 'Tumbuh besar dengan senyum dan tawa.' },
    rsvp: { title: 'Kamu Datang, Kan?', text: 'Kabari kami ya, supaya kue dan bingkisannya cukup untuk semua.' },
    gift: { title: `Kado untuk ${name}`, text: 'Kehadiranmu sudah jadi kado terindah. Jika ingin berbagi hadiah:' },
    closing: { quote: `“Semoga ${name} tumbuh sehat, ceria, dan menjadi kebanggaan keluarga.”`, source: '', message: 'Terima kasih sudah datang dan ikut merayakan!', signature: `${name} & Keluarga` },
  }),
  khitan: () => ({
    cover: { label: 'TASYAKURAN KHITAN', names: 'Muhammad Raka' },
    opening: { title: SALAM, text: 'Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri tasyakuran khitanan putra kami.' },
    profile: { title: 'Putra Kami', people: [{ name: 'Raka', fullName: 'Muhammad Raka Pratama', parents: 'Putra dari Bapak Hendra & Ibu Sari' }] },
    events: [ev('ev-khitan', 'Tasyakuran Khitan', '10.00 – 13.00 WIB', 'Kediaman Keluarga')],
    gallery: { title: 'Galeri', caption: 'Langkah pertama menuju kedewasaan.' },
    rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon kabari kehadiran Anda.' },
    gift: { title: 'Tanda Kasih', text: 'Doa Anda adalah hadiah terbaik. Bila ingin memberi tanda kasih:' },
    closing: { quote: '“Semoga menjadi anak yang saleh, berbakti, dan bermanfaat bagi sesama.”', source: '', message: 'Jazakumullah khairan atas doa dan kehadirannya.', signature: 'Keluarga Bapak Hendra' },
  }),
};

/* ── Keluarga gaya ───────────────────────────────────────────── */
const FAMILY = {
  chinese: {
    group: 'Tionghoa',
    fonts: { heading: 'Cinzel', body: 'Lora' },
    headingColor: 'secondary',
    vars: vars('14px', '4px', '0 10px 24px -12px rgba(150,20,30,.6)', '.06em'),
    pattern: { id: 'lattice', size: 56, opacity: 0.07 },
    fx: fx(['peony', 'plum', 'sparkle'], 14, 'fall', [10, 20]),
    ornaments: { divider: 'floral', corner: 'geometric', frame: 'octagon', band: false },
    sectionStyle: 'framed',
    cover: { layout: 'center', frame: 'lanterns', background: 'lattice' },
    photo: { shape: 'circle', border: 'double', decor: 'flowers' },
    motion: { reveal: 'fadeUp', opening: 'doors', coverText: 'tracking', photo: 'float' },
    scene: 'xiPlum',
    copy: COPY.chinese,
  },
  asian: {
    group: 'Jepang & Korea',
    fonts: { heading: 'Cormorant Garamond', body: 'Jost' },
    headingColor: 'text',
    vars: vars('6px', '999px', '0 10px 24px -14px rgba(60,40,40,.5)', '.04em'),
    pattern: { id: 'seigaiha', size: 44, opacity: 0.07 },
    fx: fx(['sakura', 'petal'], 16, 'fall', [10, 18]),
    ornaments: { divider: 'floral', corner: 'floral', frame: 'arch', band: false },
    sectionStyle: 'minimal',
    cover: { layout: 'center', frame: 'sakura', background: 'paper' },
    photo: { shape: 'arch', border: 'thin', decor: 'flowers' },
    motion: { reveal: 'blur', opening: 'shoji', coverText: 'blur', photo: 'sway' },
    scene: 'sakuraFuji',
    copy: COPY.asian,
  },
  islami: {
    group: 'Islami',
    fonts: { heading: 'Cormorant Garamond', body: 'Lato' },
    headingColor: 'secondary',
    vars: vars('18px', '999px', '0 10px 24px -14px rgba(60,70,50,.5)', '.02em'),
    pattern: { id: 'islamicStar', size: 80, opacity: 0.06 },
    fx: fx(['jasmine', 'sparkle'], 12, 'fall', [8, 16]),
    ornaments: { divider: 'star', corner: 'geometric', frame: 'arch', band: false },
    sectionStyle: 'arch',
    cover: { layout: 'arch', frame: 'mihrab', background: 'soft' },
    photo: { shape: 'dome', border: 'double', decor: 'islamic' },
    motion: { reveal: 'fadeUp', opening: 'envelope', coverText: 'rise', photo: 'none' },
    scene: 'islamic',
    copy: COPY.islami,
  },
  garden: {
    group: 'Taman & Bunga',
    fonts: { heading: 'Pinyon Script', body: 'Cormorant Garamond' },
    headingColor: 'secondary',
    vars: vars('22px', '999px', '0 10px 24px -12px rgba(110,90,80,.5)', '0'),
    pattern: { id: 'floral', size: 120, opacity: 0.06 },
    fx: fx(['petal', 'flower', 'butterfly'], 16, 'fall', [10, 20]),
    ornaments: { divider: 'floral', corner: 'floral', frame: 'arch', band: false },
    sectionStyle: 'airy',
    cover: { layout: 'arch', frame: 'bouquet', background: 'watercolor' },
    photo: { shape: 'arch', border: 'double', decor: 'flowers' },
    motion: { reveal: 'zoomIn', opening: 'curtain', coverText: 'blur', photo: 'float' },
    scene: 'garden',
    copy: COPY.garden,
  },
  elegant: {
    group: 'Elegan & Mewah',
    fonts: { heading: 'Italiana', body: 'Montserrat' },
    headingColor: 'primary',
    vars: vars('4px', '2px', '0 14px 30px -16px rgba(0,0,0,.6)', '.08em', 'uppercase'),
    pattern: { id: 'damask', size: 70, opacity: 0.05 },
    fx: fx(['sparkle', 'dot', 'goldLeaf'], 16, 'twinkle', [5, 13], ['primary', '#000000']),
    ornaments: { divider: 'star', corner: 'geometric', frame: 'arch', band: false },
    sectionStyle: 'bordered',
    cover: { layout: 'center', frame: 'deco', background: 'satin' },
    photo: { shape: 'arch', border: 'thin', decor: 'corners' },
    motion: { reveal: 'blur', opening: 'zoom', coverText: 'tracking', photo: 'tilt' },
    scene: 'noir',
    copy: COPY.elegant,
  },
  modern: {
    group: 'Modern & Minimalis',
    fonts: { heading: 'Bodoni Moda', body: 'Inter' },
    headingColor: 'text',
    vars: vars('0px', '0px', 'none', '.02em'),
    pattern: { id: 'lines', size: 22, opacity: 0.05 },
    fx: fx(['dot'], 6, 'float', [3, 6]),
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'minimal',
    cover: { layout: 'editorial', frame: 'single', background: 'plain' },
    photo: { shape: 'rect', border: 'thin', decor: 'none' },
    motion: { reveal: 'slideLeft', opening: 'wipe', coverText: 'tracking', photo: 'none' },
    scene: 'minimal',
    copy: COPY.modern,
  },
  fun: {
    group: 'Lucu & Ceria',
    fonts: { heading: 'Caveat', body: 'Quicksand' },
    headingColor: 'secondary',
    vars: vars('18px', '14px', '4px 4px 0 rgba(0,0,0,.85)', '0'),
    pattern: { id: 'dots', size: 30, opacity: 0.08 },
    fx: fx(['heart', 'star5', 'confetti'], 14, 'float', [10, 18]),
    ornaments: { divider: 'heart', corner: 'vine', frame: 'rect', band: false },
    sectionStyle: 'offset',
    cover: { layout: 'card', frame: 'polaroid', background: 'dots' },
    photo: { shape: 'stamp', border: 'white', decor: 'hearts' },
    motion: { reveal: 'bounce', opening: 'book', coverText: 'drop', photo: 'tilt' },
    scene: 'doodle',
    copy: COPY.fun,
  },
  jawa: {
    group: 'Adat Jawa & Sunda',
    fonts: { heading: 'Cinzel Decorative', body: 'Lora' },
    headingColor: 'secondary',
    vars: vars('10px', '6px', '0 10px 24px -12px rgba(90,55,30,.6)', '.04em'),
    pattern: { id: 'kawung', size: 60, opacity: 0.07 },
    fx: fx(['jasmine', 'flower'], 12, 'fall', [8, 16]),
    ornaments: { divider: 'wayang', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'framed',
    cover: { layout: 'center', frame: 'gunungan', background: 'kawung' },
    photo: { shape: 'arch', border: 'tiered', decor: 'flowers' },
    motion: { reveal: 'fadeUp', opening: 'doors', coverText: 'rise', photo: 'none' },
    scene: 'jawa',
    copy: COPY.jawa,
  },
  sumatra: {
    group: 'Adat Sumatra & Melayu',
    fonts: { heading: 'Cinzel', body: 'Lora' },
    headingColor: 'secondary',
    vars: vars('10px', '6px', '0 10px 24px -12px rgba(110,20,25,.6)', '.05em'),
    pattern: { id: 'songket', size: 40, opacity: 0.07 },
    fx: fx(['jasmine', 'goldLeaf'], 12, 'fall', [8, 16]),
    ornaments: { divider: 'gonjong', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'framed',
    cover: { layout: 'center', frame: 'royal', background: 'songket' },
    photo: { shape: 'arch', border: 'tiered', decor: 'flowers' },
    motion: { reveal: 'fadeUp', opening: 'doors', coverText: 'rise', photo: 'none' },
    scene: 'minang',
    copy: COPY.minang,
  },
  nusantara: {
    group: 'Adat Bali, Betawi & Timur',
    fonts: { heading: 'Cinzel', body: 'Lora' },
    headingColor: 'secondary',
    vars: vars('10px', '6px', '0 10px 24px -12px rgba(110,40,20,.6)', '.05em'),
    pattern: { id: 'patra', size: 60, opacity: 0.07 },
    fx: fx(['frangipani', 'petal'], 12, 'fall', [10, 18]),
    ornaments: { divider: 'spiral', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'framed',
    cover: { layout: 'center', frame: 'tumpal', background: 'soft' },
    photo: { shape: 'arch', border: 'tiered', decor: 'flowers' },
    motion: { reveal: 'fadeUp', opening: 'doors', coverText: 'rise', photo: 'none' },
    scene: 'bali',
    copy: COPY.bali,
  },
  pedangPora: {
    group: 'Pedang Pora',
    fonts: { heading: 'Cinzel', body: 'Montserrat' },
    headingColor: 'secondary',
    vars: vars('8px', '4px', '0 10px 24px -12px rgba(30,40,20,.6)', '.08em', 'uppercase'),
    pattern: { id: 'chevron', size: 40, opacity: 0.05 },
    fx: fx(['star5', 'sparkle'], 10, 'twinkle', [8, 14]),
    ornaments: { divider: 'star', corner: 'geometric', frame: 'arch', band: false },
    sectionStyle: 'bordered',
    cover: { layout: 'center', frame: 'royal', background: 'soft' },
    photo: { shape: 'arch', border: 'double', decor: 'stars' },
    motion: { reveal: 'fadeUp', opening: 'curtain', coverText: 'tracking', photo: 'none' },
    scene: 'pedangPora',
    copy: COPY.pedangPora,
  },
  birthday: {
    category: 'ulangTahun',
    group: 'Anak',
    fonts: { heading: 'Fredoka', body: 'Nunito' },
    headingColor: 'secondary',
    vars: vars('22px', '999px', '0 8px 0 rgba(0,0,0,.12)', '0'),
    pattern: { id: 'confetti', size: 100, opacity: 0.1 },
    fx: fx(['balloon', 'confetti', 'star5'], 16, 'rise', [12, 24]),
    ornaments: { divider: 'star', corner: 'vine', frame: 'rect', band: false },
    sectionStyle: 'card',
    cover: { layout: 'card', frame: 'balloons', background: 'confetti' },
    photo: { shape: 'scallop', border: 'rainbow', decor: 'balloons' },
    motion: { reveal: 'bounce', opening: 'zoom', coverText: 'drop', photo: 'pulse' },
    scene: 'party',
    copy: () => COPY.birthday(),
  },
};

/**
 * Daftar tema: [id, nama, tagline, keluarga, palet, opsi]
 * opsi menimpa bawaan keluarga; `copy` boleh berupa objek, atau `copyOf` = nama penyusun teks di COPY.
 */
const LIST = [
  /* ── Tionghoa ── */
  ['xiModern', 'Shuangxi Modern', 'Panel kisi merah, 囍 emas, gading', 'chinese', c('#c9a24a', '#b3202c', '#fbf6ec', '#fffdf7', '#3b2418')],
  ['jadeMoon', 'Gerbang Bulan Giok', 'Moon gate, taman tinta, ikan koi', 'chinese', c('#c8a15a', '#2f7a62', '#f4f1e6', '#fffdf6', '#23392f'), { scene: 'jadeGarden', motion: { opening: 'iris' }, cover: { frame: 'oval', background: 'ruyi' }, pattern: { id: 'ruyi', size: 120, opacity: 0.08 } }],
  ['peacockBlossom', 'Bulu Merak', 'Merak, sakura, awan emas cat air', 'chinese', c('#c79a5b', '#cf6f8c', '#fbf3f1', '#fffafa', '#4a2f35'), { scene: 'peacock', fx: fx(['sakura', 'feather'], 14, 'fall', [10, 18]), cover: { layout: 'arch', frame: 'sakura', background: 'watercolor' }, motion: { opening: 'curtain' } }],
  ['moonFlower', 'Bunga Rembulan', 'Peony pink, bulan purnama, 3D lembut', 'chinese', c('#c9a45c', '#c2566e', '#fbf2ee', '#fffaf8', '#4a2a30'), { scene: 'peonyChinese', motion: { opening: 'iris' } }],
  ['redGoldLuxe', 'Merah Emas Mewah', 'Marun pekat, aksen emas berkilau', 'chinese', c('#d4af5f', '#9e1b26', '#2a0d0f', '#3a1416', '#f6e7cf'), { scene: 'lanternNight', cover: { background: 'satin' }, fx: fx(['sparkle', 'goldLeaf'], 16, 'twinkle', [6, 14]) }],
  ['pinkPavilion', 'Paviliun Merah Muda', 'Atap paviliun, kelopak, pastel', 'chinese', c('#c99a62', '#d9718b', '#fdf0f2', '#fffafb', '#4d2e36'), { scene: 'palace', fx: fx(['peony', 'sakura'], 14, 'fall', [10, 18]) }],
  ['dragonPhoenix', 'Naga & Phoenix', 'Merah-emas klasik, awan ruyi', 'chinese', c('#e0b85e', '#a3121f', '#fff6ea', '#fffaf2', '#3d1a12'), { pattern: { id: 'ruyi', size: 120, opacity: 0.08 }, cover: { background: 'ruyi', frame: 'royal' } }],
  ['teaPai', 'Upacara Teh', 'Teko, bunga plum, nuansa teh', 'chinese', c('#b8955a', '#8a3b2e', '#f5efe4', '#fffaf2', '#3a2a20'), { scene: 'peonyChinese', motion: { opening: 'shoji' } }],
  ['peonyPink', 'Peony Merah Jambu', 'Buket peony, blush, emas lembut', 'chinese', c('#c69a6b', '#d6537a', '#fdf2f4', '#fffafb', '#4b2a33'), { scene: 'peonyChinese', fx: fx(['peony', 'petal'], 16, 'fall', [10, 20]) }],
  ['porcelainBlue', 'Porselen Biru', 'Biru kobalt di atas putih porselen', 'chinese', c('#2d5aa6', '#1b3c7a', '#f7f9fc', '#ffffff', '#1d2b45'), { scene: 'porcelain', pattern: { id: 'porcelain', size: 80, opacity: 0.08 }, cover: { background: 'porcelain', frame: 'swirl' }, fx: fx(['plum', 'cloud'], 10, 'float', [10, 18]) }],
  ['emeraldPavilion', 'Paviliun Zamrud', 'Hijau zamrud, atap istana', 'chinese', c('#d1ae63', '#0f5d4a', '#f3f1e7', '#fffdf5', '#1f332c'), { scene: 'palace' }],
  ['crimsonRoyal', 'Crimson Kerajaan', 'Merah tua megah, lampion', 'chinese', c('#d8b26a', '#9b1b25', '#fbf3e6', '#fffaf1', '#3a1a15'), { scene: 'lanternNight' }],
  ['doubleHappy', 'Bahagia Ganda', 'Simbol 囍 besar, merah menyala', 'chinese', c('#e2b65a', '#c4161c', '#fff4e8', '#fffaf2', '#3c160f'), { fx: fx(['peony', 'sparkle'], 16, 'fall', [10, 20]) }],
  ['vermilion', 'Vermilion Istana', 'Jingga vermilion, kisi istana', 'chinese', c('#d9b46a', '#c23b22', '#fbf1e4', '#fffaf2', '#3d2014'), { scene: 'palace', motion: { opening: 'shoji' } }],
  ['shanShui', 'Gunung & Mentari', 'Lukisan tinta, matahari merah', 'chinese', c('#b48c5a', '#c8382c', '#f6f1e6', '#fffcf5', '#2c2a26'), { scene: 'shanShui', pattern: { id: 'ruyi', size: 120, opacity: 0.05 }, cover: { background: 'paper', frame: 'single' }, motion: { opening: 'wipe', reveal: 'blur' } }],
  ['jadeMinimal', 'Giok Minimalis', 'Hijau giok tenang, ruang lapang', 'chinese', c('#8fb5a2', '#2f6f5c', '#f7f8f4', '#ffffff', '#2b3a34'), { scene: 'minimal', sectionStyle: 'minimal', cover: { background: 'plain', frame: 'single' }, fx: fx(['plum'], 6, 'fall', [8, 14]) }],
  ['longFengMini', 'Naga Phoenix Minimalis', 'Garis tipis, merah aksen', 'chinese', c('#c7a25b', '#a8232c', '#fbfaf7', '#ffffff', '#2a2422'), { sectionStyle: 'minimal', cover: { background: 'plain', frame: 'double' } }],
  ['blushWindow', 'Jendela Kaca Patri', 'Blush, jendela lengkung, peony', 'chinese', c('#c99c7a', '#d98ba0', '#fdf4f3', '#fffafa', '#4a3034'), { scene: 'peonyChinese', cover: { layout: 'arch', frame: 'arch' } }],
  ['lanternFestival', 'Festival Lampion', 'Malam lampion merah menyala', 'chinese', c('#e8b96a', '#d0342c', '#16121f', '#221b2e', '#f5e9d8'), { scene: 'lanternNight', cover: { background: 'night' }, fx: fx(['lantern', 'sparkle'], 14, 'rise', [12, 22]) }],
  ['celadon', 'Galeri Seladon', 'Hijau seladon, nuansa museum', 'chinese', c('#8aa898', '#4c7a6b', '#f2f4ef', '#ffffff', '#2c3a34'), { scene: 'porcelain', pattern: { id: 'porcelain', size: 80, opacity: 0.06 }, sectionStyle: 'card' }],
  ['koiPond', 'Kolam Koi', 'Koi berenang di kolam giok', 'chinese', c('#d5a253', '#2f7d74', '#eef4f0', '#fbfdfb', '#1f3532'), { scene: 'koi', fx: fx(['koi', 'plum'], 8, 'float', [14, 22]), motion: { opening: 'iris' } }],
  ['crimsonLattice', 'Kisi Merah', 'Pintu geser kisi merah emas', 'chinese', c('#d9b36c', '#a51f2b', '#fbf5ec', '#fffaf3', '#3a1d16'), { scene: 'palace', motion: { opening: 'shoji' } }],
  ['goldenPearl', 'Mutiara Emas', 'Gading & emas, peony mutiara', 'chinese', c('#c9a96e', '#9c7a3c', '#fbf7ef', '#fffdf8', '#3d3222'), { scene: 'peonyChinese', fx: fx(['sparkle', 'dot', 'peony'], 14, 'twinkle', [6, 14]) }],
  ['springTea', 'Teh Musim Semi', 'Pastel tea pai, bunga plum', 'chinese', c('#c7a77d', '#e3a1a6', '#f7f6ef', '#fffefa', '#4f4038'), { scene: 'peonyChinese', fx: fx(['plum', 'petal'], 14, 'fall', [8, 16]), motion: { opening: 'shoji' } }],

  /* ── Jepang & Korea ── */
  ['hanokPalace', 'Istana Hanok', 'Atap istana Korea, dancheong', 'asian', c('#c9a45c', '#2e6f8e', '#f6f2ea', '#fffdf8', '#2b3036'), { scene: 'korean', fonts: { heading: 'Gilda Display', body: 'Jost' }, fx: fx(['peony', 'petal'], 12, 'fall', [10, 18]), motion: { opening: 'doors' } }],
  ['zenGarden', 'Taman Zen', 'Bambu, teratai, ketenangan', 'asian', c('#9a8f7a', '#5e6b52', '#f3f0e8', '#fbfaf6', '#2e3329'), { scene: 'zen', fx: fx(['leaf'], 8, 'fall', [10, 16]), cover: { frame: 'bamboo' } }],
  ['rinpaGold', 'Rinpa Emas', 'Bunga tradisional berlatar emas', 'asian', c('#c6a15b', '#c94f5d', '#f8f2e4', '#fffbf2', '#3b2c22'), { scene: 'hanaRinpa', cover: { background: 'seigaiha', frame: 'floralTop' } }],
  ['fujiSpring', 'Fuji Musim Semi', 'Gunung Fuji & sakura klasik', 'asian', c('#d68aa0', '#3a5a8c', '#fbf3f4', '#fffafb', '#2f3245'), {}],

  /* ── Islami ── */
  ['sakinahIvory', 'Segel Gading', 'Amplop bersegel, arch anggrek', 'islami', c('#b9975b', '#5b6b4e', '#fbf8f1', '#fffefa', '#3a3a2c')],
  ['mihrabJasmine', 'Mihrab Melati', 'Mihrab gading dirambati melati', 'islami', c('#a9b79c', '#7f9a8a', '#f7f6ef', '#fffef9', '#40493f'), { scene: 'islamicJasmine', fx: fx(['jasmine'], 12, 'fall', [8, 14]) }],
  ['hijabArch', 'Gapura Melati', 'Tirai satin, lentera berayun', 'islami', c('#b9a06a', '#7d97b8', '#f8f6f2', '#fffefb', '#36404d'), { scene: 'islamicJasmine', motion: { opening: 'curtain' } }],
  ['burgundyBlush', 'Burgundy & Blush', 'Mawar burgundy, tanpa foto', 'islami', c('#c49a7a', '#7b1e3a', '#fbf1f1', '#fffafa', '#3e1f27'), { scene: 'islamicRose', fx: fx(['rose', 'petal'], 12, 'fall', [10, 18]) }],
  ['starryNight', 'Malam Berbintang', 'Bulan sabit di langit malam', 'islami', c('#e3c27a', '#6f84c6', '#121a33', '#1b2546', '#efe8d8'), { scene: 'islamicNight', cover: { background: 'night', frame: 'moon' }, fx: fx(['star5', 'sparkle', 'crescent'], 16, 'twinkle', [6, 14]) }],

  /* ── Taman & Bunga ── */
  ['watercolorBloom', 'Taman Cat Air', 'Buket berlapis, burung melintas', 'garden', c('#d19aa6', '#8aa37b', '#fdf8f6', '#fffcfb', '#4a3a3c')],
  ['gazeboGarden', 'Taman Gazebo', 'Pohon tersibak, jalan setapak', 'garden', c('#9db58c', '#6d8b5f', '#f6f7f0', '#fffffb', '#33402f'), { scene: 'enchanted', fx: fx(['butterfly', 'leaf'], 10, 'float', [12, 20]) }],
  ['storybookPanorama', 'Buku Cerita Panorama', 'Ilustrasi panorama berhalaman', 'garden', c('#e1a86b', '#6e9a7a', '#fbf6ea', '#fffdf6', '#3c3a2c'), { scene: 'storybook', fonts: { heading: 'Amatic SC', body: 'Nunito' }, motion: { opening: 'book' } }],
  ['storybook', 'Buku Cerita', 'Ilustrasi manis ala dongeng', 'garden', c('#e8a0a0', '#7aa5b8', '#fdf7ef', '#fffdf8', '#3e3b40'), { scene: 'storybook', fonts: { heading: 'Patrick Hand', body: 'Nunito' }, motion: { opening: 'book' } }],
  ['gardenSoiree', 'Pesta Taman Senja', 'Senja jingga, kunang-kunang', 'garden', c('#e2a76f', '#6b4e71', '#fbf2ea', '#fffaf5', '#3b2c3a'), { scene: 'meadow', cover: { background: 'dusk' }, fx: fx(['firefly', 'petal'], 16, 'float', [8, 16]) }],
  ['midnightOrchid', 'Anggrek Tengah Malam', 'Burgundy gelap, anggrek', 'garden', c('#d8a7b1', '#8e2b51', '#1c1018', '#29161f', '#f4e6ea'), { scene: 'moonGarden', cover: { background: 'vignette' }, fonts: { heading: 'Playfair Display', body: 'Lato' }, fx: fx(['frangipani', 'sparkle'], 12, 'fall', [10, 18]) }],
  ['botanicalEditorial', 'Botani Editorial', 'Gading, daun, tata letak majalah', 'garden', c('#9a8a6a', '#5b6f53', '#faf8f2', '#ffffff', '#2f3029'), { scene: 'minimalFloral', fonts: { heading: 'Bodoni Moda', body: 'Jost' }, cover: { layout: 'editorial', background: 'paper', frame: 'leaves' }, sectionStyle: 'minimal' }],
  ['moonlitGarden', 'Taman Bulan', 'Bunga malam & cahaya bulan', 'garden', c('#e6d3a3', '#8d7ab8', '#141826', '#1d2235', '#ece7da'), { scene: 'moonGarden', cover: { background: 'night' }, fonts: { heading: 'Playfair Display', body: 'Lato' }, fx: fx(['firefly', 'flower'], 16, 'float', [8, 16]) }],
  ['whisperPetals', 'Bisikan Kelopak', 'Floral minimal, ruang putih', 'garden', c('#d7b4a8', '#a58b84', '#fbf9f7', '#ffffff', '#45393a'), { scene: 'minimalFloral', sectionStyle: 'minimal', cover: { background: 'plain', frame: 'roses' }, fx: fx(['petal'], 8, 'fall', [10, 16]) }],
  ['secretForest', 'Hutan Bunga Rahasia', 'Hutan berbunga, kunang-kunang', 'garden', c('#d9a3b5', '#4f7a5c', '#f3f5ee', '#fcfdf9', '#2e3b30'), { scene: 'enchanted', fx: fx(['firefly', 'petal', 'butterfly'], 18, 'float', [8, 16]) }],
  ['eternalRose', 'Taman Mawar Abadi', 'Mawar merah, renda klasik', 'garden', c('#c9848f', '#7c2d3a', '#fcf4f3', '#fffafa', '#43252b'), { scene: 'roseGarden', fx: fx(['rose', 'petal'], 14, 'fall', [10, 20]), cover: { frame: 'roses' } }],
  ['eternalBloom', 'Mekar Abadi', 'Floral mewah, bingkai barok', 'garden', c('#c8a165', '#a8566b', '#fbf6f0', '#fffcf8', '#3f2d2a'), { cover: { frame: 'baroque' } }],
  ['bohoNature', 'Bohemian Alam', 'Pampas, terakota, bunga liar', 'garden', c('#c08a5b', '#7b8a5a', '#f6efe4', '#fffaf2', '#3d3326'), { scene: 'bohemian', fonts: { heading: 'Italianno', body: 'Jost' }, fx: fx(['leaf', 'flower'], 12, 'fall', [10, 18]) }],
  ['wildMeadow', 'Padang Bunga Liar', 'Rumput bergoyang, bunga kuning', 'garden', c('#e3a33f', '#7a9a5b', '#fbf7ea', '#fffdf5', '#3a3a28'), { scene: 'meadow', fx: fx(['flower', 'butterfly'], 12, 'float', [10, 18]) }],
  ['blueArchway', 'Gapura Taman Biru', 'Hydrangea biru, gapura', 'garden', c('#7d9cc0', '#4d6c93', '#f3f6fa', '#ffffff', '#2a3446'), { cover: { layout: 'arch', frame: 'arch' } }],
  ['lavenderWisteria', 'Wisteria Lavender', 'Wisteria menjuntai, ungu lembut', 'garden', c('#a48fc6', '#6c5a92', '#f7f4fb', '#fffeff', '#3a3348'), { scene: 'wisteria', fx: fx(['lavender', 'petal'], 14, 'fall', [10, 18]) }],
  ['sakuraDream', 'Mimpi Sakura', 'Hujan kelopak sakura', 'garden', c('#e59ab0', '#9a6b8e', '#fdf3f6', '#fffafc', '#4a3343'), { scene: 'sakuraDream', fx: fx(['sakura', 'petal'], 20, 'fall', [10, 18]), cover: { frame: 'sakura' } }],

  /* ── Elegan & Mewah ── */
  ['satinNoir', 'Sutra Hitam', 'Sinematik gelap, emas champagne', 'elegant', c('#d6b77c', '#a88a52', '#121110', '#1b1918', '#efe6d6')],
  ['decoGold', 'Art Deco Emas', 'Kipas deco, hitam & emas', 'elegant', c('#d4af6a', '#8c7440', '#0f0f12', '#18181c', '#ece4d2'), { scene: 'deco', pattern: { id: 'fan', size: 48, opacity: 0.06 }, fonts: { heading: 'Cinzel', body: 'Montserrat' } }],
  ['midnightGlam', 'Glamor Malam', 'Plum gelap, kilau dramatis', 'elegant', c('#c9a96e', '#8a3d5c', '#141016', '#1e1820', '#efe3d4'), { cover: { background: 'vignette' } }],
  ['spatialDepth', 'Ruang Kedalaman', 'Kaca buram, lapisan berlapis', 'modern', c('#9fb3c8', '#2c3e55', '#eef2f6', '#ffffff', '#1f2a37'), { sectionStyle: 'glass', cover: { background: 'aurora', frame: 'none' }, motion: { reveal: 'zoomOut', opening: 'zoom' }, fx: fx(['bubble', 'dot'], 10, 'float', [8, 18]) }],
  ['ivoryLetter', 'Surat Gading', 'Surat cinta beludru & segel', 'elegant', c('#b7965c', '#6b1f2a', '#f7f1e6', '#fffbf3', '#3a2620'), { scene: 'minimalFloral', motion: { opening: 'envelope', reveal: 'fadeUp' }, cover: { background: 'damask', frame: 'lace' }, vars: vars('8px', '999px', '0 10px 24px -14px rgba(90,30,40,.5)', '.04em'), headingColor: 'secondary', fonts: { heading: 'Pinyon Script', body: 'Cormorant Garamond' } }],
  ['silverMirror', 'Cermin Mawar Perak', 'Maroon & perak berkilau', 'elegant', c('#b8bcc4', '#7a1f32', '#fbf6f5', '#ffffff', '#3a2027'), { scene: 'roseGarden', cover: { background: 'marble', frame: 'baroque' }, fx: fx(['rose', 'sparkle'], 12, 'fall', [8, 16]) }],
  ['maroonAtelier', 'Atelier Marun', 'Marun & emas premium', 'elegant', c('#d2ad6b', '#6e1423', '#fbf4ec', '#fffaf4', '#3a1a1f'), { scene: 'roseGarden', cover: { background: 'damask', frame: 'royal' } }],
  ['rusticWood', 'Kayu Emas Rustic', 'Serat kayu, lampu gantung', 'elegant', c('#c69a4f', '#6b4a2f', '#f4ecdf', '#fffaf1', '#3a2c1f'), { scene: 'rustic', cover: { background: 'paper', frame: 'leaves' }, fonts: { heading: 'Alex Brush', body: 'Lora' }, fx: fx(['leaf', 'firefly'], 12, 'float', [8, 16]), vars: vars('12px', '999px', '0 10px 24px -12px rgba(100,70,40,.5)') }],
  ['rusticClassic', 'Rustic Klasik', 'Kertas kraft, bunga kering', 'elegant', c('#b8924f', '#7a5a3a', '#f7f0e3', '#fffbf3', '#3d3022'), { scene: 'rustic', cover: { background: 'paper', frame: 'laurel' }, fonts: { heading: 'Great Vibes', body: 'Lora' }, vars: vars('12px', '999px', '0 10px 24px -12px rgba(100,70,40,.5)') }],
  ['snowElegance', 'Salju Anggun', 'Musim dingin, pinus bersalju', 'elegant', c('#9fb6cc', '#5b7894', '#f6f9fc', '#ffffff', '#2b3a4a'), { scene: 'snow', cover: { background: 'glow', frame: 'snow' }, fx: fx(['snow', 'dot'], 22, 'fall', [8, 16]), fonts: { heading: 'Cormorant Garamond', body: 'Lato' } }],

  /* ── Modern & Minimalis ── */
  ['ourJourney', 'Kisah Kita', 'Foto penuh, kartu kaca buram', 'modern', c('#e8d5b5', '#c9a77a', '#111111', '#1c1c1c', '#f2f2f2'), { scene: 'photo', sectionStyle: 'glass', cover: { layout: 'bottom', frame: 'none', background: 'vignette' }, fonts: { heading: 'Playfair Display', body: 'Inter' } }],
  ['pureLine', 'Garis Murni', 'Hitam putih, tipografi bersih', 'modern', c('#111111', '#111111', '#ffffff', '#ffffff', '#111111')],
  ['modernMinimal', 'Minimalis Modern', 'Simpel, hangat, elegan', 'modern', c('#a08a6d', '#3b3b3b', '#f8f7f4', '#ffffff', '#2a2a2a'), { fonts: { heading: 'Cormorant Garamond', body: 'Jost' } }],
  ['brutal', 'Brutalis', 'Blok tegas, tipografi besar', 'modern', c('#ff4d2e', '#111111', '#f2efe8', '#ffffff', '#111111'), { fonts: { heading: 'Bebas Neue', body: 'Inter' }, vars: vars('0px', '0px', '6px 6px 0 #111', '.02em', 'uppercase'), sectionStyle: 'offset', motion: { reveal: 'slideRight', opening: 'blinds' } }],

  /* ── Lucu & Ceria ── */
  ['doodleScrapbook', 'Scrapbook Doodle', 'Stiker, spiral, pesawat kertas', 'fun', c('#f4a261', '#e76f8a', '#fffaf0', '#ffffff', '#3d3a4b')],
  ['retroDisco', 'Disko Ceri', 'Bola disko, ceri, retro 70-an', 'fun', c('#ff5c8a', '#b388ff', '#1b1033', '#271848', '#fbe9ff'), { scene: 'retro', fonts: { heading: 'Pacifico', body: 'Outfit' }, fx: fx(['cherry', 'disco', 'sparkle'], 14, 'float', [10, 20]), cover: { background: 'night', frame: 'lights' } }],
  ['photobooth', 'Bilik Foto', 'Strip foto, gaya photobooth', 'fun', c('#ff7a7a', '#2b2b2b', '#fff6f0', '#ffffff', '#2b2b2b'), { scene: 'photo', cover: { frame: 'polaroid', background: 'stripes' } }],
  ['paperDoodle', 'Kertas Coretan', 'Buku bergaris, coretan biru', 'fun', c('#5b8def', '#f25c78', '#fdfbf6', '#ffffff', '#2f3240'), { scene: 'notebook', cover: { background: 'notebook', frame: 'dashed' }, pattern: { id: 'notebook', size: 24, opacity: 0.12 } }],
  ['sweetNotes', 'Catatan Manis', 'Memo pastel, catatan kecil', 'fun', c('#ffb4a2', '#9a8fb5', '#fffaf6', '#ffffff', '#4a4458'), { scene: 'notebook', fonts: { heading: 'Shadows Into Light', body: 'Quicksand' } }],
  ['kittyLetter', 'Surat Si Kucing', 'Jejak kucing, surat pastel', 'fun', c('#f7a8b8', '#9b7bb8', '#fff7fa', '#ffffff', '#4a3a4f'), { scene: 'kitty', motion: { opening: 'envelope' }, fx: fx(['heart', 'star5'], 12, 'float', [10, 18]) }],
  ['scribbleLove', 'Coretan Cinta', 'Coretan spidol warna-warni', 'fun', c('#ff6b6b', '#4d96ff', '#fffdf7', '#ffffff', '#2b2d42')],
  ['loveMail', 'Kartu Pos Cinta', 'Perangko, cap pos, surat', 'fun', c('#d9824b', '#3d6e8f', '#fbf5ea', '#fffdf7', '#3a3127'), { scene: 'postal', motion: { opening: 'envelope' }, cover: { frame: 'ticket', background: 'paper' }, fx: fx(['plane', 'heart'], 10, 'float', [10, 18]) }],
  ['strawberryPicnic', 'Piknik Stroberi', 'Kain kotak, ceri, cottagecore', 'fun', c('#e9505e', '#7fae6b', '#fff8f2', '#ffffff', '#3d2f2f'), { scene: 'picnic', pattern: { id: 'gingham', size: 40, opacity: 0.08 }, fx: fx(['cherry', 'flower'], 12, 'fall', [10, 18]), cover: { frame: 'scallop' } }],
  ['paperBoat', 'Perahu Kertas', 'Sungai, perahu, petualangan', 'fun', c('#4fb0c6', '#f4a259', '#f5fbfc', '#ffffff', '#24414a'), { scene: 'river', fx: fx(['bubble', 'plane'], 10, 'float', [10, 18]), cover: { frame: 'waves' } }],
  ['lovePlaylist', 'Playlist Kita', 'Piringan hitam, lagu cinta', 'fun', c('#ff8a5b', '#2b2d42', '#fdf7f2', '#ffffff', '#2b2d42'), { scene: 'music', fx: fx(['note'], 12, 'rise', [10, 18]), cover: { frame: 'notes' } }],
  ['coquette', 'Pita Coquette', 'Pita pink, renda, manis', 'fun', c('#f2a7c0', '#c97c9d', '#fff6f9', '#ffffff', '#4b3442'), { scene: 'minimalFloral', fonts: { heading: 'Parisienne', body: 'Quicksand' }, fx: fx(['heart', 'petal'], 14, 'fall', [8, 16]), cover: { frame: 'ribbon', background: 'soft' }, vars: vars('22px', '999px', '0 8px 20px -10px rgba(200,120,150,.6)') }],

  /* ── Adat Jawa & Sunda ── */
  ['pendopoSenja', 'Pendopo Senja', 'Lorong joglo, gunungan menyibak', 'jawa', c('#c9a15a', '#6b3f23', '#f6eedf', '#fffaf0', '#3a2615'), { scene: 'pendopo', cover: { background: 'dusk' } }],
  ['sekarJawi', 'Sekar Jawi', 'Sogan & prada, melati', 'jawa', c('#b98d4e', '#4f5d3a', '#f5efe2', '#fffbf2', '#33301f')],
  ['batikParang', 'Batik Parang', 'Parang klasik, cokelat sogan', 'jawa', c('#b8893f', '#5a3a22', '#f3ebdc', '#fffaf0', '#33231a'), { pattern: { id: 'parang', size: 44, opacity: 0.07 }, cover: { background: 'parang' } }],
  ['pasundan', 'Kembang Pasundan', 'Bambu, melati, hijau Sunda', 'jawa', c('#c3a35c', '#3f6b4f', '#f4f1e6', '#fffdf6', '#2b3a2f'), { scene: 'sunda', copyOf: 'sunda', pattern: { id: 'megamendung', size: 140, opacity: 0.06 }, cover: { frame: 'cloud', background: 'megamendung' }, ornaments: { divider: 'floral', corner: 'tumpal', frame: 'arch', band: true } }],

  /* ── Adat Sumatra & Melayu ── */
  ['rumahGadang', 'Rumah Gadang Senja', 'Marun, kayu ukir, gonjong', 'sumatra', c('#d4a94f', '#c0392b', '#2b1410', '#3a1c16', '#f3e3c3'), { cover: { background: 'dusk' } }],
  ['suntiang', 'Suntiang Emas', 'Mahkota suntiang, marun', 'sumatra', c('#d9b15c', '#8c1d24', '#fbf2e3', '#fffaf2', '#3a1d17')],
  ['mahligaiMinang', 'Mahligai Minang', 'Pelaminan Minang 3D', 'sumatra', c('#cfa452', '#5c1a1b', '#f7efe0', '#fffaf1', '#331b17')],
  ['gayoHighland', 'Dataran Tinggi Gayo', 'Bukit kopi, kerawang', 'sumatra', c('#d1a54f', '#6b1d1d', '#f4efe3', '#fffbf3', '#33221c'), { scene: 'gayo', copyOf: 'aceh', pattern: { id: 'kerawang', size: 60, opacity: 0.08 }, ornaments: { divider: 'spiral', corner: 'tumpal', frame: 'arch', band: true } }],
  ['kerawangGayo', 'Kerawang Gayo', 'Motif kerawang di latar gelap', 'sumatra', c('#e2b04a', '#d1372f', '#1b1714', '#262019', '#f1e5cf'), { scene: 'gayo', copyOf: 'aceh', pattern: { id: 'kerawang', size: 60, opacity: 0.1 }, ornaments: { divider: 'spiral', corner: 'tumpal', frame: 'arch', band: true } }],
  ['samanAceh', 'Rapai & Saman', 'Rapai, saman, hijau Aceh', 'sumatra', c('#d6a94e', '#1e5a3c', '#f4efe2', '#fffbf2', '#24301f'), { scene: 'aceh', copyOf: 'aceh', pattern: { id: 'islamicStar', size: 80, opacity: 0.06 } }],
  ['lutTawar', 'Senja Danau', 'Danau senja, bukit Gayo', 'sumatra', c('#e2a35a', '#3b5f7a', '#f7efe3', '#fffaf3', '#2c3440'), { scene: 'gayo', copyOf: 'aceh', cover: { background: 'dusk' }, pattern: { id: 'kerawang', size: 60, opacity: 0.06 } }],
  ['acehHeritage', 'Pusaka Aceh', 'Hijau tua & emas, kubah', 'sumatra', c('#cfa14b', '#14432f', '#f5f0e3', '#fffbf3', '#1f2b23'), { scene: 'aceh', copyOf: 'aceh', pattern: { id: 'islamicStar', size: 80, opacity: 0.06 } }],
  ['jeumpa', 'Jeumpa Putih', 'Bunga jeumpa, putih elegan', 'sumatra', c('#c2a36b', '#5f7d6a', '#fbfaf5', '#ffffff', '#2f3830'), { scene: 'islamicJasmine', copyOf: 'aceh', sectionStyle: 'arch' }],
  ['kerawangNight', 'Kerawang Malam', 'Kerawang emas di malam hari', 'sumatra', c('#e0b252', '#c8352e', '#14110f', '#1f1a16', '#efe4cf'), { scene: 'gayo', copyOf: 'aceh', cover: { background: 'night' }, pattern: { id: 'kerawang', size: 60, opacity: 0.1 } }],
  ['duaPusaka', 'Dua Pusaka', 'Paduan Aceh & Gayo', 'sumatra', c('#d3a64c', '#7b1d1d', '#f6f0e2', '#fffaf2', '#331f1a'), { scene: 'aceh', copyOf: 'aceh', pattern: { id: 'kerawang', size: 60, opacity: 0.07 } }],
  ['pintoAceh', 'Pintu Emas Aceh', 'Pintu Aceh berukir emas', 'sumatra', c('#d8ad55', '#0f4a3a', '#f4efe1', '#fffbf2', '#1f2b25'), { scene: 'aceh', copyOf: 'aceh' }],
  ['pituRuang', 'Tujuh Ruang', 'Rumah adat Gayo bertingkat', 'sumatra', c('#cfa24e', '#5a2d1a', '#f5eee0', '#fffaf1', '#33241b'), { scene: 'gayo', copyOf: 'aceh', pattern: { id: 'kerawang', size: 60, opacity: 0.07 } }],
  ['kerawangMinimal', 'Benang Kerawang', 'Garis kerawang minimalis', 'sumatra', c('#b7863f', '#8c2b25', '#fbf9f4', '#ffffff', '#2d2520'), { scene: 'minimal', copyOf: 'aceh', sectionStyle: 'minimal', pattern: { id: 'kerawang', size: 60, opacity: 0.05 }, cover: { background: 'plain', frame: 'double' } }],
  ['pelitaAceh', 'Pelita Aceh', 'Lentera menyala di malam Aceh', 'sumatra', c('#e8c06a', '#2f8a6b', '#0f1714', '#16211c', '#efe6d0'), { scene: 'islamicNight', copyOf: 'aceh', cover: { background: 'night' } }],
  ['gorgaToba', 'Gorga Toba', 'Ukiran gorga merah-hitam-putih', 'sumatra', c('#c9302c', '#1a1a1a', '#f6f1ea', '#fffaf4', '#2a1c1a'), { scene: 'batak', copyOf: 'batak', pattern: { id: 'gorga', size: 60, opacity: 0.08 }, ornaments: { divider: 'spiral', corner: 'tumpal', frame: 'arch', band: true } }],
  ['tenunPelita', 'Tenun Pelita', 'Tenun biru, cahaya pelita', 'sumatra', c('#d4ad5b', '#1f4e5f', '#f6f1e5', '#fffbf3', '#20323a'), { scene: 'melayu', copyOf: 'melayu', pattern: { id: 'tenun', size: 44, opacity: 0.08 } }],
  ['songketKencana', 'Songket Kencana', 'Songket ungu bertabur emas', 'sumatra', c('#dbb258', '#6b1f45', '#f8f0e6', '#fffaf3', '#35202d'), { scene: 'melayu', copyOf: 'melayu' }],
  ['pesisir', 'Mahligai Pesisir', 'Ombak pesisir, hijau laut', 'sumatra', c('#d2ab62', '#1f6f78', '#f2f6f3', '#fdfffd', '#1f3436'), { scene: 'melayu', copyOf: 'melayu', pattern: { id: 'tenun', size: 44, opacity: 0.06 } }],
  ['pelaminDiraja', 'Pelamin Diraja', 'Pelamin kerajaan, marun emas', 'sumatra', c('#dcb35c', '#5a1630', '#fbf3e5', '#fffaf2', '#331a24'), { scene: 'melayu', copyOf: 'melayu', cover: { frame: 'royal', background: 'songket' } }],

  /* ── Adat Bali, Betawi & Timur ── */
  ['palangPintu', 'Palang Pintu Betawi', 'Gigi balang, ondel-ondel, meriah', 'nusantara', c('#e0a93b', '#c2272d', '#fdf5e8', '#fffaf2', '#3a1f17'), { scene: 'betawi', copyOf: 'betawi', pattern: { id: 'tumpalBand', size: 28, opacity: 0.06 } }],
  ['parreAllo', 'Matahari Toraja', 'Ukiran pa’barre allo', 'nusantara', c('#d9a53c', '#9b1c1c', '#f5eee2', '#fffaf2', '#1d1714'), { scene: 'toraja', copyOf: 'toraja', pattern: { id: 'toraja', size: 56, opacity: 0.08 } }],
  ['rambuTuka', 'Rambu Tuka’', 'Sukacita adat Toraja', 'nusantara', c('#e2b04a', '#2c2420', '#f3ece0', '#fffaf1', '#231c18'), { scene: 'toraja', copyOf: 'toraja', pattern: { id: 'toraja', size: 56, opacity: 0.07 } }],
  ['tongkonanAgung', 'Tongkonan Agung', 'Rumah tongkonan di malam hari', 'nusantara', c('#e3b14d', '#c9302c', '#17120f', '#221a15', '#f2e4cc'), { scene: 'toraja', copyOf: 'toraja', cover: { background: 'night' }, pattern: { id: 'toraja', size: 56, opacity: 0.1 } }],
  ['puriMalam', 'Puri Malam', 'Puri Bali bercahaya obor', 'nusantara', c('#e6bd62', '#c26a3d', '#141018', '#1f1820', '#f1e5cf'), { cover: { background: 'night' } }],
  ['baliAtelier', 'Atelier Bali', 'Kamboja, hijau tropis lembut', 'nusantara', c('#c5a46b', '#4d6b4a', '#f8f4ec', '#fffdf7', '#2e3326'), { cover: { frame: 'tropical' } }],
  ['baliDewata', 'Pulau Dewata', 'Candi bentar & kain poleng', 'nusantara', c('#d9a441', '#a8322d', '#fbf3e3', '#fffaf1', '#33211a'), { pattern: { id: 'poleng', size: 28, opacity: 0.05 } }],

  /* ── Pedang Pora ── */
  ['pedangHijau', 'Pedang Pora Hijau', 'Gapura pedang, hijau loreng', 'pedangPora', c('#c9a74c', '#3c4f2a', '#f3f2ea', '#ffffff', '#232a1b')],
  ['pedangCokelat', 'Pedang Pora Cokelat', 'Gapura pedang, cokelat tegas', 'pedangPora', c('#c9a74c', '#5a4630', '#f4efe6', '#ffffff', '#2c2418')],

  /* ── Ulang Tahun & Syukuran ── */
  ['birthdayFun', 'Pesta Ceria', 'Bendera, balon, warna cerah', 'birthday', c('#ffb703', '#fb5607', '#fff8ec', '#ffffff', '#3a2a1a'), { group: 'Remaja & Dewasa', copy: COPY.birthday('17', 'Nadia') }],
  ['kidsParty', 'Pesta Anak', 'Ceria, biru & pink', 'birthday', c('#4cc9f0', '#f72585', '#f7fbff', '#ffffff', '#2a2f45')],
  ['balloonParty', 'Pesta Balon', 'Balon melayang ke langit', 'birthday', c('#ff6f91', '#845ec2', '#fff7fb', '#ffffff', '#3a2f4a'), { fx: fx(['balloon'], 14, 'rise', [16, 30]), copy: COPY.birthday('7', 'Raka') }],
  ['khitanEmerald', 'Khitanan Zamrud', 'Hijau zamrud, lentera emas', 'islami', c('#cfae5f', '#0e6b52', '#f4f3ea', '#fffdf5', '#14382d'), { category: 'syukuran', group: undefined, scene: 'khitan', copyOf: 'khitan', motion: { opening: 'doors' } }],
];

function build([id, name, tagline, family, colors, o = {}]) {
  const f = FAMILY[family];
  const copy = o.copy ?? (o.copyOf ? COPY[o.copyOf]() : f.copy());
  return {
    id,
    name,
    tagline,
    category: o.category ?? f.category ?? 'pernikahan',
    group: 'group' in o ? o.group : f.group,
    colors,
    fonts: { ...f.fonts, ...o.fonts },
    headingColor: o.headingColor ?? f.headingColor,
    vars: o.vars ?? f.vars,
    pattern: o.pattern ?? f.pattern,
    fx: o.fx ?? f.fx,
    ornaments: o.ornaments ?? f.ornaments,
    sectionStyle: o.sectionStyle ?? f.sectionStyle,
    cover: { ...f.cover, ...o.cover },
    photo: { ...f.photo, ...o.photo },
    motion: { ...f.motion, ...o.motion },
    scene: o.scene ?? f.scene,
    premium: true,
    copy,
  };
}

export const catalogThemes = Object.fromEntries(LIST.map((row) => [row[0], build(row)]));
