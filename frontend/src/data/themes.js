/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  KONFIGURASI TEMA
 *  Menambah tema baru = menambah satu objek di `themes` (tanpa menyentuh komponen).
 *
 *  colors      primary = aksen/ornamen · secondary = isi tegas (tombol, countdown)
 *              background · surface (kartu) · text
 *  fonts       font bawaan; user bisa menimpanya di menu Typography
 *  headingColor  warna judul: 'text' | 'primary' | 'secondary'
 *  vars        CSS variable tambahan (radius, bayangan, dll.)
 *  pattern     { id (lihat patterns.js), size px, opacity }
 *  fx          partikel + efek latar:
 *                particles { shapes[], count, motion: 'fall'|'rise'|'twinkle', size:[min,max] }
 *                patternMotion 'drift' | 'spin' | 'none'
 *                glow        daftar warna cahaya lembut ('primary' | 'secondary' | hex)
 *  ornaments   divider: floral|star|wayang|heart · corner: floral|geometric|tumpal|vine
 *              frame: arch|oval|octagon|rect · band: true → pita tumpal di batas section
 *  sectionStyle  airy | framed | bordered | glass (lihat styles/invitation.css)
 *  copy        teks bawaan tema. Dipakai saat ganti tema bila user belum mengubah teksnya.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const people2 = (a, b) => [a, b];

export const themes = {
  wedding: {
    id: 'wedding',
    name: 'Pernikahan',
    tagline: 'Elegan, floral, hangat',
    colors: { primary: '#b08d57', secondary: '#6f8560', background: '#faf6ee', surface: '#fffdf8', text: '#4b3d31' },
    fonts: { heading: 'Cormorant Garamond', body: 'Montserrat' },
    headingColor: 'text',
    vars: { '--radius': '22px', '--btn-radius': '999px', '--btn-shadow': '0 10px 24px -12px rgba(111,133,96,.7)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'floral', size: 120, opacity: 0.1 },
    fx: { particles: { shapes: ['petal', 'flower'], count: 14, motion: 'fall', size: [10, 22] }, patternMotion: 'none', glow: ['primary', '#e8d9bd'] },
    ornaments: { divider: 'floral', corner: 'floral', frame: 'arch', band: false },
    sectionStyle: 'airy',
    copy: {
      cover: { label: 'THE WEDDING OF', names: 'Raka & Ayu' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami. Merupakan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.',
      },
      profile: {
        title: 'Mempelai',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama', parents: 'Putra pertama dari Bapak Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri kedua dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-akad', title: 'Akad Nikah', date: '2026-12-12', time: '08.00 – 10.00 WIB', place: 'Gedung Graha Anggun' },
        { id: 'ev-resepsi', title: 'Resepsi', date: '2026-12-12', time: '11.00 – 14.00 WIB', place: 'Gedung Graha Anggun' },
      ],
      gallery: { title: 'Galeri Kami', caption: 'Potongan kisah perjalanan kami menuju hari bahagia.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara.' },
      gift: { title: 'Wedding Gift', text: 'Doa restu Anda adalah hadiah terindah. Jika ingin memberi tanda kasih, dapat melalui:' },
      closing: {
        quote: '“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup agar kamu merasa tenteram kepadanya.”',
        source: 'QS. Ar-Rum: 21',
        message: 'Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
        signature: 'Raka & Ayu',
      },
    },
  },

  khitanan: {
    id: 'khitanan',
    name: 'Khitanan',
    tagline: 'Islami, ceria, hangat',
    colors: { primary: '#c3a04d', secondary: '#0f6b4f', background: '#f7f3e6', surface: '#fffdf5', text: '#12392e' },
    fonts: { heading: 'Playfair Display', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '14px', '--btn-radius': '12px', '--btn-shadow': '0 8px 20px -10px rgba(15,107,79,.65)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'islamicStar', size: 80, opacity: 0.09 },
    fx: { particles: { shapes: ['star8', 'sparkle', 'crescent'], count: 12, motion: 'twinkle', size: [10, 20] }, patternMotion: 'drift', glow: ['#0f6b4f', 'primary'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'octagon', band: false },
    sectionStyle: 'framed',
    copy: {
      cover: { label: 'KHITANAN', names: 'Muhammad Raka' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara khitanan putra kami tercinta.',
      },
      profile: {
        title: 'Putra Kami',
        people: [{ name: 'Raka', fullName: 'Muhammad Raka Pratama', parents: 'Putra dari Bapak Hendra & Ibu Sari' }],
      },
      events: [
        { id: 'ev-khitan', title: 'Khitanan', date: '2026-12-12', time: '08.00 WIB', place: 'Kediaman Keluarga' },
        { id: 'ev-syukuran', title: 'Syukuran', date: '2026-12-12', time: '11.00 – 14.00 WIB', place: 'Kediaman Keluarga' },
      ],
      gallery: { title: 'Momen Bahagia', caption: 'Tumbuh menjadi anak yang saleh dan membanggakan.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Kehadiran dan doa Anda sangat berarti bagi kami sekeluarga.' },
      gift: { title: 'Tanda Kasih', text: 'Doa restu Anda adalah hadiah terindah. Jika ingin memberi tanda kasih, dapat melalui:' },
      closing: {
        quote: '“Semoga menjadi anak yang saleh, berbakti kepada orang tua, serta bermanfaat bagi agama dan bangsa.”',
        source: '',
        message: 'Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih. Jazakumullahu khairan.',
        signature: 'Keluarga Besar Pratama',
      },
    },
  },

  jawa: {
    id: 'jawa',
    name: 'Jawa',
    tagline: 'Tradisi, anggun, berkelas',
    colors: { primary: '#c9a14a', secondary: '#8b2332', background: '#2a1a12', surface: '#37251b', text: '#f3e7cf' },
    fonts: { heading: 'Cinzel', body: 'Lora' },
    headingColor: 'primary',
    vars: { '--radius': '6px', '--btn-radius': '4px', '--btn-shadow': '0 8px 22px -10px rgba(0,0,0,.8)', '--heading-spacing': '.06em', '--heading-transform': 'none' },
    pattern: { id: 'kawung', size: 64, opacity: 0.1 },
    fx: { particles: { shapes: ['dot', 'diamond', 'sparkle'], count: 16, motion: 'rise', size: [6, 14] }, patternMotion: 'drift', glow: ['#8b2332', 'primary'] },
    ornaments: { divider: 'wayang', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'bordered',
    copy: {
      cover: { label: 'PAWIWAHAN', names: 'Raka & Ayu' },
      opening: {
        title: 'Sugeng Rawuh',
        text: 'Dengan penuh hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada upacara pernikahan adat Jawa putra-putri kami.',
      },
      profile: {
        title: 'Panganten',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama', parents: 'Putra pertama dari Bapak Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri kedua dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-ijab', title: 'Ijab Qobul', date: '2026-12-12', time: '08.00 – 10.00 WIB', place: 'Pendopo Graha Anggun' },
        { id: 'ev-panggih', title: 'Panggih & Resepsi', date: '2026-12-12', time: '11.00 – 14.00 WIB', place: 'Pendopo Graha Anggun' },
      ],
      gallery: { title: 'Gambar Kenangan', caption: 'Selembar kenangan sebelum hari bahagia tiba.' },
      rsvp: { title: 'Konfirmasi Rawuh', text: 'Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran.' },
      gift: { title: 'Tanda Kasih', text: 'Doa restu Panjenengan adalah anugerah terindah. Apabila berkenan memberi tanda kasih:' },
      closing: {
        quote: '“Urip iku urup — hidup itu menyala, memberi cahaya bagi sesama.”',
        source: 'Falsafah Jawa',
        message: 'Matur nuwun atas doa dan restu Panjenengan sedaya. Kehadiran Panjenengan adalah kehormatan bagi kami.',
        signature: 'Raka & Ayu',
      },
    },
  },

  romantic: {
    id: 'romantic',
    name: 'Romantis',
    tagline: 'Lembut, modern, penuh cinta',
    colors: { primary: '#c9507a', secondary: '#7b1e3a', background: '#fdf0f3', surface: '#fff8f9', text: '#4a1f2e' },
    fonts: { heading: 'Great Vibes', body: 'Montserrat' },
    headingColor: 'secondary',
    vars: { '--radius': '28px', '--btn-radius': '999px', '--btn-shadow': '0 12px 28px -10px rgba(201,80,122,.65)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'hearts', size: 90, opacity: 0.09 },
    fx: { particles: { shapes: ['heart', 'petal', 'sparkle'], count: 18, motion: 'rise', size: [10, 24] }, patternMotion: 'none', glow: ['primary', '#c9a7e8'] },
    ornaments: { divider: 'heart', corner: 'vine', frame: 'oval', band: false },
    sectionStyle: 'glass',
    copy: {
      cover: { label: 'WE ARE GETTING MARRIED', names: 'Raka & Ayu' },
      opening: {
        title: 'Dengan Cinta',
        text: 'Dua hati, satu cerita. Dengan penuh cinta kami mengundang Anda untuk merayakan hari paling bahagia dalam hidup kami.',
      },
      profile: {
        title: 'Kami Berdua',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama', parents: 'Putra pertama dari Bapak Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri kedua dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-holy', title: 'Pemberkatan', date: '2026-12-12', time: '09.00 – 10.30 WIB', place: 'Gedung Graha Anggun' },
        { id: 'ev-dinner', title: 'Dinner Reception', date: '2026-12-12', time: '18.30 – 21.00 WIB', place: 'Gedung Graha Anggun' },
      ],
      gallery: { title: 'Our Moments', caption: 'Setiap momen bersamamu adalah favoritku.' },
      rsvp: { title: 'Akankah Anda Hadir?', text: 'Kehadiran Anda akan melengkapi kebahagiaan kami.' },
      gift: { title: 'Love Gift', text: 'Kehadiran Anda sudah cukup bagi kami. Jika ingin berbagi kebahagiaan:' },
      closing: {
        quote: '“Di antara jutaan kemungkinan, aku memilih kamu — hari ini, esok, dan selamanya.”',
        source: '',
        message: 'Terima kasih telah menjadi bagian dari perjalanan cinta kami.',
        signature: 'Raka & Ayu',
      },
    },
  },
};

export const themeList = Object.values(themes);
export const DEFAULT_THEME = 'wedding';
export const getTheme = (id) => themes[id] || themes[DEFAULT_THEME];
