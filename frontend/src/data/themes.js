/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  KONFIGURASI TEMA
 *  Menambah tema baru = menambah satu objek di `themes` (tanpa menyentuh komponen).
 *
 *  category    id kategori (lihat `themeCategories`) · group: subjudul opsional di dalam kategori
 *  audience    'female' | 'male' (opsional) → lencana "Cewek" / "Cowok" di pemilih tema
 *  colors     primary = aksen/ornamen · secondary = isi tegas (tombol, countdown)
 *              background · surface (kartu) · text
 *  fonts       font bawaan; user bisa menimpanya di menu Typography
 *  headingColor  warna judul: 'text' | 'primary' | 'secondary'
 *  vars        CSS variable tambahan (radius, bayangan, dll.)
 *  pattern     { id (lihat patterns.js), size px, opacity }
 *  fx          partikel + efek latar:
 *                particles { shapes[], count, motion: 'fall'|'rise'|'twinkle', size:[min,max] }
 *                patternMotion 'drift' | 'spin' | 'none'
 *                glow        daftar warna cahaya lembut ('primary' | 'secondary' | hex)
 *  ornaments   divider: floral|star|wayang|heart|siger|gonjong|spiral · corner: floral|geometric|tumpal|vine
 *              frame: arch|oval|octagon|rect · band: true → pita tumpal di batas section
 *  sectionStyle  airy | framed | bordered | glass | card | minimal | dashed | offset | arch | tinted
 *              (lihat styles/invitation.css)
 *  cover       desain cover bawaan { layout, frame, background } (lihat coverBackgrounds.js & coverFrames.js)
 *  photo       bingkai foto profil bawaan { shape, border, decor } (data/photoFrames.js) — opsional
 *  motion      animasi bawaan { reveal, opening, coverText, photo } (data/animations.js) — opsional
 *  copy        teks bawaan tema. Dipakai saat ganti tema bila user belum mengubah teksnya.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { DEFAULT_MOTION } from './animations.js';
import { moreThemes } from './themesMore.js';

const people2 = (a, b) => [a, b];

/**
 * Kategori pada pemilih tema (urutan = urutan tab).
 * kind 'greeting' = kartu ucapan: section di GREETING_HIDDEN_SECTIONS tidak dipakai.
 */
export const themeCategories = [
  { id: 'pernikahan', name: 'Pernikahan', desc: 'Undangan nikah modern, lamaran, dan adat Nusantara.' },
  { id: 'ulangTahun', name: 'Ulang Tahun', desc: 'Pesta ulang tahun anak, remaja, hingga dewasa.' },
  { id: 'syukuran', name: 'Syukuran', desc: 'Khitanan, aqiqah, dan tasyakuran keluarga.' },
  { id: 'lainnya', name: 'Acara Lain', desc: 'Wisuda, reuni, gathering, dan acara umum.' },
  { id: 'ucapan', name: 'Ucapan', kind: 'greeting', desc: 'Kartu ucapan digital, tanpa detail acara, RSVP, atau lokasi.' },
];

export const GREETING_HIDDEN_SECTIONS = ['event', 'countdown', 'location', 'rsvp', 'gift'];

/** Teks cover bawaan untuk semua tema ucapan. */
const greetingCover = { guestText: 'Ada pesan spesial untukmu', buttonText: 'Buka Ucapan' };

export const themes = {
  wedding: {
    id: 'wedding',
    name: 'Pernikahan',
    tagline: 'Elegan, floral, hangat',
    category: 'pernikahan', group: 'Modern',
    colors: { primary: '#b08d57', secondary: '#6f8560', background: '#faf6ee', surface: '#fffdf8', text: '#4b3d31' },
    fonts: { heading: 'Cormorant Garamond', body: 'Montserrat' },
    headingColor: 'text',
    vars: { '--radius': '22px', '--btn-radius': '999px', '--btn-shadow': '0 10px 24px -12px rgba(111,133,96,.7)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'floral', size: 120, opacity: 0.1 },
    fx: { particles: { shapes: ['petal', 'flower'], count: 14, motion: 'fall', size: [10, 22] }, patternMotion: 'none', glow: ['primary', '#e8d9bd'] },
    ornaments: { divider: 'floral', corner: 'floral', frame: 'arch', band: false },
    sectionStyle: 'airy',
    cover: { layout: 'arch', frame: 'bouquet', background: 'soft' },
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
    category: 'syukuran',
    colors: { primary: '#c3a04d', secondary: '#0f6b4f', background: '#f7f3e6', surface: '#fffdf5', text: '#12392e' },
    fonts: { heading: 'Playfair Display', body: 'Nunito' },
    headingColor: 'secondary',
    vars: { '--radius': '14px', '--btn-radius': '12px', '--btn-shadow': '0 8px 20px -10px rgba(15,107,79,.65)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'islamicStar', size: 80, opacity: 0.09 },
    fx: { particles: { shapes: ['star8', 'sparkle', 'crescent'], count: 12, motion: 'twinkle', size: [10, 20] }, patternMotion: 'drift', glow: ['#0f6b4f', 'primary'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'octagon', band: false },
    sectionStyle: 'framed',
    cover: { layout: 'center', frame: 'mihrab', background: 'islamic' },
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
    name: 'Adat Jawa',
    tagline: 'Tradisi, anggun, berkelas',
    category: 'pernikahan', group: 'Adat Nusantara',
    colors: { primary: '#c9a14a', secondary: '#8b2332', background: '#2a1a12', surface: '#37251b', text: '#f3e7cf' },
    fonts: { heading: 'Cinzel Decorative', body: 'Lora' },
    headingColor: 'primary',
    vars: { '--radius': '6px', '--btn-radius': '4px', '--btn-shadow': '0 8px 22px -10px rgba(0,0,0,.8)', '--heading-spacing': '.06em', '--heading-transform': 'none' },
    pattern: { id: 'kawung', size: 64, opacity: 0.1 },
    fx: { particles: { shapes: ['dot', 'diamond', 'sparkle'], count: 16, motion: 'rise', size: [6, 14] }, patternMotion: 'drift', glow: ['#8b2332', 'primary'] },
    ornaments: { divider: 'wayang', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'bordered',
    cover: { layout: 'center', frame: 'gunungan', background: 'theme' },
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
    category: 'pernikahan', group: 'Modern',
    colors: { primary: '#c9507a', secondary: '#7b1e3a', background: '#fdf0f3', surface: '#fff8f9', text: '#4a1f2e' },
    fonts: { heading: 'Pinyon Script', body: 'Montserrat' },
    headingColor: 'secondary',
    vars: { '--radius': '28px', '--btn-radius': '999px', '--btn-shadow': '0 12px 28px -10px rgba(201,80,122,.65)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'hearts', size: 90, opacity: 0.09 },
    fx: { particles: { shapes: ['heart', 'petal', 'sparkle'], count: 18, motion: 'rise', size: [10, 24] }, patternMotion: 'none', glow: ['primary', '#c9a7e8'] },
    ornaments: { divider: 'heart', corner: 'vine', frame: 'oval', band: false },
    sectionStyle: 'glass',
    cover: { layout: 'card', frame: 'vine', background: 'aurora' },
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

  lamaran: {
    id: 'lamaran',
    name: 'Lamaran',
    tagline: 'Hangat, kalem, intim',
    category: 'pernikahan', group: 'Lamaran & Tunangan',
    colors: { primary: '#c48b7a', secondary: '#6e8470', background: '#f8f3ef', surface: '#fffaf6', text: '#463a35' },
    fonts: { heading: 'Italiana', body: 'Jost' },
    headingColor: 'text',
    vars: { '--radius': '20px', '--btn-radius': '999px', '--btn-shadow': '0 10px 24px -12px rgba(110,132,112,.7)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'floral', size: 120, opacity: 0.08 },
    fx: { particles: { shapes: ['petal', 'sparkle'], count: 12, motion: 'fall', size: [8, 18] }, patternMotion: 'none', glow: ['primary', '#dfe6d8'] },
    ornaments: { divider: 'floral', corner: 'vine', frame: 'arch', band: false },
    sectionStyle: 'minimal',
    cover: { layout: 'split', frame: 'floral4', background: 'paper' },
    copy: {
      cover: { label: 'THE ENGAGEMENT OF', names: 'Raka & Ayu' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Dengan memohon rahmat Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan menjadi saksi pada acara lamaran putra-putri kami.',
      },
      profile: {
        title: 'Calon Mempelai',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama', parents: 'Putra pertama dari Bapak Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri kedua dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-lamaran', title: 'Acara Lamaran', date: '2026-12-12', time: '10.00 – 12.00 WIB', place: 'Kediaman Mempelai Wanita' },
      ],
      gallery: { title: 'Cerita Kami', caption: 'Langkah kecil menuju janji yang lebih besar.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi kehadiran Anda agar kami dapat menyambut dengan baik.' },
      gift: { title: 'Tanda Kasih', text: 'Doa restu Anda adalah hadiah terindah. Jika ingin memberi tanda kasih, dapat melalui:' },
      closing: {
        quote: '“Semoga niat baik ini dimudahkan dan diberkahi hingga ke pelaminan.”',
        source: '',
        message: 'Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i di hari istimewa ini.',
        signature: 'Keluarga Raka & Ayu',
      },
    },
  },

  ulangTahunAnak: {
    id: 'ulangTahunAnak',
    name: 'Ulang Tahun Anak',
    tagline: 'Ceria, warna-warni, seru',
    category: 'ulangTahun', group: 'Anak',
    colors: { primary: '#f0913e', secondary: '#3d7dd8', background: '#fff8ec', surface: '#ffffff', text: '#3a3352' },
    fonts: { heading: 'Fredoka', body: 'Quicksand' },
    headingColor: 'secondary',
    vars: { '--radius': '24px', '--btn-radius': '999px', '--btn-shadow': '0 10px 22px -10px rgba(61,125,216,.6)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'confetti', size: 100, opacity: 0.14 },
    fx: { particles: { shapes: ['balloon', 'confetti', 'star8'], count: 16, motion: 'rise', size: [12, 26] }, patternMotion: 'drift', glow: ['primary', '#ffd3e0'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'oval', band: false },
    sectionStyle: 'card',
    cover: { layout: 'center', frame: 'balloons', background: 'confetti' },
    copy: {
      cover: { label: 'ULANG TAHUN KE-5', names: 'Alya' },
      opening: {
        title: 'Halo, Teman-Teman!',
        text: 'Yuk datang ke pesta ulang tahunku! Akan ada kue, permainan seru, dan banyak keceriaan. Ajak juga Ayah dan Bunda, ya!',
      },
      profile: {
        title: 'Yang Berulang Tahun',
        people: [{ name: 'Alya', fullName: 'Alya Putri Pratama', parents: 'Putri dari Bapak Hendra & Ibu Sari' }],
      },
      events: [
        { id: 'ev-party', title: 'Pesta Ulang Tahun', date: '2026-12-12', time: '15.00 – 17.00 WIB', place: 'Kediaman Keluarga' },
      ],
      gallery: { title: 'Momen Ceria', caption: 'Tumbuh besar dengan senyum dan tawa.' },
      rsvp: { title: 'Kamu Datang, Kan?', text: 'Kabari kami ya, supaya kue dan bingkisannya cukup untuk semua.' },
      gift: { title: 'Kado untuk Alya', text: 'Kehadiranmu sudah jadi kado terindah. Jika ingin berbagi hadiah:' },
      closing: {
        quote: '“Semoga Alya tumbuh sehat, ceria, dan menjadi kebanggaan keluarga.”',
        source: '',
        message: 'Terima kasih sudah datang dan ikut merayakan hari spesial Alya!',
        signature: 'Alya & Keluarga',
      },
    },
  },

  ulangTahun: {
    id: 'ulangTahun',
    name: 'Ulang Tahun',
    tagline: 'Elegan, malam, berkilau',
    category: 'ulangTahun', group: 'Remaja & Dewasa',
    colors: { primary: '#d4af6a', secondary: '#e07a9b', background: '#1b1f33', surface: '#252a42', text: '#f1ecdf' },
    fonts: { heading: 'DM Serif Display', body: 'Outfit' },
    headingColor: 'primary',
    vars: { '--radius': '16px', '--btn-radius': '999px', '--btn-shadow': '0 10px 26px -10px rgba(0,0,0,.8)', '--heading-spacing': '.02em', '--heading-transform': 'none' },
    pattern: { id: 'dots', size: 36, opacity: 0.08 },
    fx: { particles: { shapes: ['sparkle', 'confetti', 'dot'], count: 18, motion: 'rise', size: [6, 16] }, patternMotion: 'drift', glow: ['primary', 'secondary'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'glass',
    cover: { layout: 'editorial', frame: 'stars', background: 'bokeh' },
    copy: {
      cover: { label: 'HAPPY BIRTHDAY', names: 'Raka Pratama' },
      opening: {
        title: 'Let’s Celebrate!',
        text: 'Satu tahun lagi terlewati dengan penuh syukur. Dengan senang hati saya mengundang Anda untuk merayakan bertambahnya usia bersama.',
      },
      profile: {
        title: 'Yang Berulang Tahun',
        people: [{ name: 'Raka', fullName: 'Raka Pratama', parents: 'Merayakan usia ke-30' }],
      },
      events: [
        { id: 'ev-dinner', title: 'Birthday Dinner', date: '2026-12-12', time: '19.00 – 22.00 WIB', place: 'Graha Anggun Rooftop' },
      ],
      gallery: { title: 'Cerita Setahun', caption: 'Sepotong kenangan dari perjalanan tahun ini.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi agar tempat untuk Anda dapat kami siapkan.' },
      gift: { title: 'Birthday Gift', text: 'Kehadiran Anda adalah hadiah terbaik. Jika tetap ingin berbagi:' },
      closing: {
        quote: '“Bertambah usia, bertambah syukur, bertambah alasan untuk berbahagia.”',
        source: '',
        message: 'Terima kasih telah menjadi bagian dari perjalanan hidup saya.',
        signature: 'Raka',
      },
    },
  },

  sweet17: {
    id: 'sweet17',
    name: 'Sweet Seventeen',
    tagline: 'Manis, girly, berkilau',
    category: 'ulangTahun', group: 'Remaja & Dewasa',
    colors: { primary: '#a66cc9', secondary: '#d9568f', background: '#fbf4fd', surface: '#ffffff', text: '#45284f' },
    fonts: { heading: 'Alex Brush', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '26px', '--btn-radius': '999px', '--btn-shadow': '0 12px 26px -10px rgba(217,86,143,.6)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'dots', size: 44, opacity: 0.1 },
    fx: { particles: { shapes: ['sparkle', 'heart', 'dot'], count: 18, motion: 'twinkle', size: [8, 18] }, patternMotion: 'none', glow: ['primary', '#ffc9de'] },
    ornaments: { divider: 'heart', corner: 'vine', frame: 'oval', band: false },
    sectionStyle: 'glass',
    cover: { layout: 'arch', frame: 'stars', background: 'aurora' },
    copy: {
      cover: { label: 'SWEET SEVENTEEN', names: 'Ayu' },
      opening: {
        title: 'You’re Invited!',
        text: 'Tujuh belas tahun hanya datang sekali. Aku ingin merayakannya bersama orang-orang tersayang — termasuk kamu!',
      },
      profile: {
        title: 'The Birthday Girl',
        people: [{ name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri dari Bapak Wibowo & Ibu Dewi' }],
      },
      events: [
        { id: 'ev-party', title: 'Sweet 17 Party', date: '2026-12-12', time: '18.30 – 21.30 WIB', place: 'Graha Anggun Ballroom' },
      ],
      gallery: { title: 'My Moments', caption: 'Cerita kecil menuju usia tujuh belas.' },
      rsvp: { title: 'Kamu Datang?', text: 'Konfirmasi kehadiranmu ya, biar pestanya makin lengkap!' },
      gift: { title: 'Birthday Gift', text: 'Kehadiranmu sudah cukup. Tapi kalau ingin memberi hadiah:' },
      closing: {
        quote: '“Here’s to seventeen — and every dream that comes after.”',
        source: '',
        message: 'Terima kasih sudah menjadi bagian dari hari spesialku!',
        signature: 'Ayu',
      },
    },
  },

  aqiqah: {
    id: 'aqiqah',
    name: 'Aqiqah',
    tagline: 'Lembut, islami, penuh syukur',
    category: 'syukuran',
    colors: { primary: '#c9a85c', secondary: '#3f8a7f', background: '#f2f8f6', surface: '#ffffff', text: '#24433e' },
    fonts: { heading: 'Gilda Display', body: 'Nunito' },
    headingColor: 'secondary',
    vars: { '--radius': '18px', '--btn-radius': '999px', '--btn-shadow': '0 8px 20px -10px rgba(63,138,127,.6)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'islamicStar', size: 80, opacity: 0.08 },
    fx: { particles: { shapes: ['star8', 'crescent', 'sparkle'], count: 12, motion: 'twinkle', size: [8, 18] }, patternMotion: 'drift', glow: ['secondary', '#f3e6c4'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'arch', band: false },
    sectionStyle: 'framed',
    cover: { layout: 'center', frame: 'floralTop', background: 'glow' },
    copy: {
      cover: { label: 'TASYAKURAN AQIQAH', names: 'Arsyad' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Dengan penuh rasa syukur atas karunia Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri tasyakuran aqiqah putra kami.',
      },
      profile: {
        title: 'Buah Hati Kami',
        people: [{ name: 'Arsyad', fullName: 'Muhammad Arsyad Pratama', parents: 'Putra pertama dari Bapak Hendra & Ibu Sari' }],
      },
      events: [
        { id: 'ev-aqiqah', title: 'Aqiqah & Tasyakuran', date: '2026-12-12', time: '10.00 – 13.00 WIB', place: 'Kediaman Keluarga' },
      ],
      gallery: { title: 'Si Kecil', caption: 'Amanah kecil yang membawa kebahagiaan besar.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Kehadiran dan doa Anda sangat berarti bagi kami sekeluarga.' },
      gift: { title: 'Tanda Kasih', text: 'Doa Anda untuk si kecil adalah hadiah terindah. Jika ingin memberi tanda kasih:' },
      closing: {
        quote: '“Semoga menjadi anak yang saleh, sehat, dan menjadi penyejuk hati kedua orang tuanya.”',
        source: '',
        message: 'Atas kehadiran dan doa Bapak/Ibu/Saudara/i, kami ucapkan terima kasih. Jazakumullahu khairan.',
        signature: 'Keluarga Pratama',
      },
    },
  },

  syukuran: {
    id: 'syukuran',
    name: 'Syukuran',
    tagline: 'Natural, sederhana, hangat',
    category: 'syukuran',
    colors: { primary: '#b5853f', secondary: '#4f6b3a', background: '#f6f1e4', surface: '#fffcf3', text: '#3b3226' },
    fonts: { heading: 'Crimson Pro', body: 'Lato' },
    headingColor: 'secondary',
    vars: { '--radius': '14px', '--btn-radius': '12px', '--btn-shadow': '0 8px 20px -10px rgba(79,107,58,.6)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'leaves', size: 110, opacity: 0.1 },
    fx: { particles: { shapes: ['leaf', 'petal'], count: 12, motion: 'fall', size: [10, 20] }, patternMotion: 'none', glow: ['primary', '#d9e2c6'] },
    ornaments: { divider: 'floral', corner: 'vine', frame: 'arch', band: false },
    sectionStyle: 'minimal',
    cover: { layout: 'bottom', frame: 'leaves', background: 'paper' },
    copy: {
      cover: { label: 'TASYAKURAN', names: 'Keluarga Pratama' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Sebagai ungkapan rasa syukur atas nikmat yang Allah SWT limpahkan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara syukuran keluarga kami.',
      },
      profile: {
        title: 'Tuan Rumah',
        people: [{ name: 'Keluarga Pratama', fullName: 'Bapak Hendra & Ibu Sari', parents: 'Beserta keluarga besar' }],
      },
      events: [
        { id: 'ev-doa', title: 'Pengajian & Doa Bersama', date: '2026-12-12', time: '16.00 – 17.30 WIB', place: 'Kediaman Keluarga' },
        { id: 'ev-ramah', title: 'Ramah Tamah', date: '2026-12-12', time: '18.30 – 20.00 WIB', place: 'Kediaman Keluarga' },
      ],
      gallery: { title: 'Momen Syukur', caption: 'Setiap nikmat layak dirayakan bersama.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi kehadiran agar hidangan dapat kami persiapkan.' },
      gift: { title: 'Tanda Kasih', text: 'Kehadiran dan doa Anda sudah lebih dari cukup. Jika ingin berbagi:' },
      closing: {
        quote: '“Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu.”',
        source: 'QS. Ibrahim: 7',
        message: 'Atas kehadiran dan doa Bapak/Ibu/Saudara/i, kami sekeluarga mengucapkan terima kasih.',
        signature: 'Keluarga Pratama',
      },
    },
  },

  wisuda: {
    id: 'wisuda',
    name: 'Wisuda',
    tagline: 'Formal, bangga, berprestasi',
    category: 'lainnya', group: 'Wisuda & Umum',
    colors: { primary: '#c9a227', secondary: '#1f3a68', background: '#f5f6fa', surface: '#ffffff', text: '#1d2742' },
    fonts: { heading: 'Cinzel', body: 'Raleway' },
    headingColor: 'secondary',
    vars: { '--radius': '10px', '--btn-radius': '8px', '--btn-shadow': '0 8px 20px -10px rgba(31,58,104,.6)', '--heading-spacing': '.04em', '--heading-transform': 'none' },
    pattern: { id: 'grid', size: 48, opacity: 0.07 },
    fx: { particles: { shapes: ['mortarboard', 'confetti', 'sparkle'], count: 14, motion: 'fall', size: [10, 22] }, patternMotion: 'none', glow: ['primary', '#c9d4ea'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'card',
    cover: { layout: 'editorial', frame: 'royal', background: 'split' },
    copy: {
      cover: { label: 'GRADUATION CELEBRATION', names: 'Ayu Lestari' },
      opening: {
        title: 'Dengan Penuh Syukur',
        text: 'Perjalanan panjang ini akhirnya sampai di garis akhir. Kami mengundang Bapak/Ibu/Saudara/i untuk turut merayakan kelulusan bersama kami.',
      },
      profile: {
        title: 'Sang Wisudawan',
        people: [{ name: 'Ayu', fullName: 'Ayu Lestari, S.Kom.', parents: 'Teknik Informatika · Universitas Nusantara' }],
      },
      events: [
        { id: 'ev-wisuda', title: 'Syukuran Wisuda', date: '2026-12-12', time: '12.00 – 15.00 WIB', place: 'Graha Anggun' },
      ],
      gallery: { title: 'Perjalanan Studi', caption: 'Dari hari pertama kuliah hingga toga ini dikenakan.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Kehadiran Anda akan melengkapi kebahagiaan hari ini.' },
      gift: { title: 'Tanda Kasih', text: 'Doa dan ucapan selamat Anda sudah sangat berarti. Jika ingin berbagi:' },
      closing: {
        quote: '“Pendidikan adalah senjata paling ampuh untuk mengubah dunia.”',
        source: 'Nelson Mandela',
        message: 'Terima kasih atas dukungan dan doa yang mengiringi setiap langkah perjalanan ini.',
        signature: 'Ayu & Keluarga',
      },
    },
  },

  umum: {
    id: 'umum',
    name: 'Acara Umum',
    tagline: 'Modern, minimalis, serbaguna',
    category: 'lainnya', group: 'Wisuda & Umum',
    colors: { primary: '#e0663f', secondary: '#1f2a37', background: '#f7f5f2', surface: '#ffffff', text: '#1f2a37' },
    fonts: { heading: 'Oswald', body: 'Inter' },
    headingColor: 'secondary',
    vars: { '--radius': '12px', '--btn-radius': '10px', '--btn-shadow': '0 8px 20px -12px rgba(31,42,55,.7)', '--heading-spacing': '.02em', '--heading-transform': 'none' },
    pattern: { id: 'grid', size: 56, opacity: 0.06 },
    fx: { particles: { shapes: ['dot', 'diamond'], count: 10, motion: 'twinkle', size: [5, 11] }, patternMotion: 'drift', glow: ['primary', '#d7dde6'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'minimal',
    cover: { layout: 'editorial', frame: 'bracket', background: 'stripes' },
    copy: {
      cover: { label: 'YOU’RE INVITED', names: 'Reuni Akbar 2026' },
      opening: {
        title: 'Halo, Semuanya!',
        text: 'Dengan senang hati kami mengundang Anda untuk hadir dan meramaikan acara ini. Sampai jumpa di sana!',
      },
      profile: {
        title: 'Penyelenggara',
        people: [{ name: 'Panitia', fullName: 'Alumni Angkatan 2016', parents: 'SMA Nusantara Jakarta' }],
      },
      events: [
        { id: 'ev-registrasi', title: 'Registrasi', date: '2026-12-12', time: '09.00 – 10.00 WIB', place: 'Graha Anggun' },
        { id: 'ev-utama', title: 'Acara Utama', date: '2026-12-12', time: '10.00 – 14.00 WIB', place: 'Graha Anggun' },
      ],
      gallery: { title: 'Galeri', caption: 'Sekilas momen yang akan kita ulang bersama.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi kehadiran untuk membantu panitia mempersiapkan acara.' },
      gift: { title: 'Dukungan Acara', text: 'Bagi yang ingin berkontribusi untuk kelancaran acara, dapat melalui:' },
      closing: {
        quote: '“Bertemu kembali, merajut cerita yang sempat tertunda.”',
        source: '',
        message: 'Terima kasih atas perhatian dan kehadiran Anda. Sampai jumpa!',
        signature: 'Panitia Penyelenggara',
      },
    },
  },

  /* ───────────────────────────── Pernikahan adat ───────────────────────────── */

  sunda: {
    id: 'sunda',
    name: 'Adat Sunda',
    tagline: 'Siger, mega mendung, hijau emas',
    category: 'pernikahan', group: 'Adat Nusantara',
    colors: { primary: '#b8913f', secondary: '#2f5d50', background: '#f4efe3', surface: '#fffbf2', text: '#2b3a33' },
    fonts: { heading: 'Cormorant Garamond', body: 'Lora' },
    headingColor: 'secondary',
    vars: { '--radius': '14px', '--btn-radius': '999px', '--btn-shadow': '0 10px 22px -12px rgba(47,93,80,.7)', '--heading-spacing': '.02em', '--heading-transform': 'none' },
    pattern: { id: 'megamendung', size: 140, opacity: 0.1 },
    fx: { particles: { shapes: ['flower', 'petal', 'sparkle'], count: 14, motion: 'fall', size: [8, 18] }, patternMotion: 'drift', glow: ['primary', '#cfe0d5'] },
    ornaments: { divider: 'siger', corner: 'floral', frame: 'arch', band: false },
    sectionStyle: 'framed',
    cover: { layout: 'arch', frame: 'floralTop', background: 'theme' },
    copy: {
      cover: { label: 'NIKAH ADAT SUNDA', names: 'Raka & Ayu' },
      opening: {
        title: 'Sampurasun',
        text: 'Kalayan nyuhunkeun rahmat sareng ridho Allah SWT, kami ngondang Bapak/Ibu/Saudara/i kana acara pernikahan putra-putri kami. Kasumpingan sareng pangdu’a anjeun mangrupikeun kabagjaan pikeun kami.',
      },
      profile: {
        title: 'Pangantén',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama', parents: 'Putra pertama dari Bapak Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri kedua dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-akad', title: 'Akad Nikah', date: '2026-12-12', time: '08.00 – 09.30 WIB', place: 'Gedung Graha Anggun' },
        { id: 'ev-sawer', title: 'Sawer, Nincak Endog & Resepsi', date: '2026-12-12', time: '10.30 – 14.00 WIB', place: 'Gedung Graha Anggun' },
      ],
      gallery: { title: 'Galeri Pangantén', caption: 'Rekaman kabagjaan sateuacan dinten anu dipiharep.' },
      rsvp: { title: 'Konfirmasi Kasumpingan', text: 'Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i untuk membantu persiapan kami.' },
      gift: { title: 'Tanda Kasih', text: 'Pangdu’a anjeun mangrupikeun kado anu pangéndahna. Upami bade masihan tanda kasih:' },
      closing: {
        quote: '“Silih asah, silih asih, silih asuh.”',
        source: 'Falsafah Sunda',
        message: 'Hatur nuhun kana sagala pangdu’a sareng kasumpinganana. Mugia kasaéan Bapak/Ibu/Saudara/i dibales ku Gusti Allah.',
        signature: 'Raka & Ayu',
      },
    },
  },

  bali: {
    id: 'bali',
    name: 'Adat Bali',
    tagline: 'Patra, jepun, merah prada',
    category: 'pernikahan', group: 'Adat Nusantara',
    colors: { primary: '#c99a3b', secondary: '#9c2b23', background: '#fbf4e4', surface: '#fffaf0', text: '#3d2418' },
    fonts: { heading: 'Cinzel Decorative', body: 'Lora' },
    headingColor: 'secondary',
    vars: { '--radius': '8px', '--btn-radius': '6px', '--btn-shadow': '0 10px 22px -10px rgba(156,43,35,.6)', '--heading-spacing': '.05em', '--heading-transform': 'none' },
    pattern: { id: 'patra', size: 90, opacity: 0.11 },
    fx: { particles: { shapes: ['flower', 'petal', 'sparkle'], count: 14, motion: 'fall', size: [10, 20] }, patternMotion: 'none', glow: ['primary', '#f1d6c4'] },
    ornaments: { divider: 'wayang', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'bordered',
    cover: { layout: 'center', frame: 'tumpal', background: 'theme' },
    copy: {
      cover: { label: 'UPACARA PAWIWAHAN', names: 'Gede & Ayu' },
      opening: {
        title: 'Om Swastyastu',
        text: 'Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada upacara Manusa Yadnya Pawiwahan (pernikahan) putra-putri kami.',
      },
      profile: {
        title: 'Mempelai',
        people: people2(
          { name: 'Gede', fullName: 'I Gede Raka Pratama', parents: 'Putra pertama dari I Made Hendra & Ni Ketut Sari' },
          { name: 'Ayu', fullName: 'Ni Luh Ayu Lestari', parents: 'Putri kedua dari I Wayan Wibowo & Ni Nyoman Dewi' },
        ),
      },
      events: [
        { id: 'ev-pawiwahan', title: 'Upacara Pawiwahan', date: '2026-12-12', time: '09.00 – 12.00 WITA', place: 'Kediaman Mempelai Pria, Gianyar' },
        { id: 'ev-resepsi', title: 'Resepsi', date: '2026-12-12', time: '18.00 – 21.00 WITA', place: 'Kediaman Mempelai Pria, Gianyar' },
      ],
      gallery: { title: 'Galeri Kenangan', caption: 'Sekilas kisah sebelum janji suci di hadapan Ida Sang Hyang Widhi Wasa.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Merupakan suatu kehormatan bila Bapak/Ibu/Saudara/i berkenan hadir.' },
      gift: { title: 'Tanda Kasih', text: 'Doa restu Anda adalah anugerah terindah. Jika ingin memberi tanda kasih:' },
      closing: {
        quote: '“Semoga Ida Sang Hyang Widhi Wasa senantiasa melimpahkan rahmat bagi kedua mempelai dan keluarga.”',
        source: '',
        message: 'Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih. Om Shanti Shanti Shanti Om.',
        signature: 'Gede & Ayu',
      },
    },
  },

  minang: {
    id: 'minang',
    name: 'Adat Minang',
    tagline: 'Gonjong, songket, merah emas',
    category: 'pernikahan', group: 'Adat Nusantara',
    colors: { primary: '#d6a640', secondary: '#b3242c', background: '#2a0f10', surface: '#3a1718', text: '#f6e6c8' },
    fonts: { heading: 'Prata', body: 'Lora' },
    headingColor: 'primary',
    vars: { '--radius': '6px', '--btn-radius': '4px', '--btn-shadow': '0 10px 24px -10px rgba(0,0,0,.85)', '--heading-spacing': '.03em', '--heading-transform': 'none' },
    pattern: { id: 'songket', size: 44, opacity: 0.1 },
    fx: { particles: { shapes: ['diamond', 'sparkle', 'dot'], count: 16, motion: 'rise', size: [6, 14] }, patternMotion: 'drift', glow: ['secondary', 'primary'] },
    ornaments: { divider: 'gonjong', corner: 'tumpal', frame: 'arch', band: true },
    sectionStyle: 'bordered',
    cover: { layout: 'card', frame: 'deco', background: 'songket' },
    copy: {
      cover: { label: 'BARALEK GADANG', names: 'Raka & Ayu' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Dengan memohon rahmat Allah SWT, kami sekeluarga mengundang Bapak/Ibu/Saudara/i, dunsanak sakalian, untuk hadir pada baralek pernikahan anak kemenakan kami.',
      },
      profile: {
        title: 'Marapulai & Anak Daro',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama gelar Sutan Mudo', parents: 'Putra dari Bapak Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-akad', title: 'Akad Nikah', date: '2026-12-12', time: '08.00 – 10.00 WIB', place: 'Masjid Raya Sumatera Barat' },
        { id: 'ev-baralek', title: 'Baralek (Resepsi)', date: '2026-12-13', time: '11.00 – 16.00 WIB', place: 'Rumah Gadang Keluarga, Bukittinggi' },
      ],
      gallery: { title: 'Galeri', caption: 'Sepotong cerita sebelum duduk bersanding di pelaminan.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon kabarkan kehadiran dunsanak, agar kami dapat menyambut dengan layak.' },
      gift: { title: 'Tanda Kasih', text: 'Doa restu dunsanak adalah hadiah terindah. Jika ingin memberi tanda kasih:' },
      closing: {
        quote: '“Adat basandi syarak, syarak basandi Kitabullah.”',
        source: 'Falsafah Minangkabau',
        message: 'Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i serta dunsanak sakalian.',
        signature: 'Keluarga Besar Raka & Ayu',
      },
    },
  },

  batak: {
    id: 'batak',
    name: 'Adat Batak',
    tagline: 'Gorga, ulos, merah hitam putih',
    category: 'pernikahan', group: 'Adat Nusantara',
    colors: { primary: '#e2d3b5', secondary: '#b3261e', background: '#141111', surface: '#201b1a', text: '#f2ece4' },
    fonts: { heading: 'Cinzel', body: 'Josefin Sans' },
    headingColor: 'primary',
    vars: { '--radius': '4px', '--btn-radius': '4px', '--btn-shadow': '0 10px 24px -10px rgba(179,38,30,.6)', '--heading-spacing': '.06em', '--heading-transform': 'none' },
    pattern: { id: 'gorga', size: 60, opacity: 0.09 },
    fx: { particles: { shapes: ['diamond', 'dot'], count: 12, motion: 'rise', size: [5, 12] }, patternMotion: 'none', glow: ['secondary', '#3a2a24'] },
    ornaments: { divider: 'spiral', corner: 'geometric', frame: 'rect', band: true },
    sectionStyle: 'bordered',
    cover: { layout: 'center', frame: 'double', background: 'vignette' },
    copy: {
      cover: { label: 'PESTA UNJUK', names: 'Raka & Ayu' },
      opening: {
        title: 'Horas!',
        text: 'Dengan sukacita dan memohon berkat Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada pemberkatan nikah dan pesta adat putra-putri kami.',
      },
      profile: {
        title: 'Mempelai',
        people: people2(
          { name: 'Raka', fullName: 'Raka Pratama Simanjuntak', parents: 'Putra dari Bapak H. Simanjuntak & Ibu S. br. Nainggolan' },
          { name: 'Ayu', fullName: 'Ayu Lestari br. Siregar', parents: 'Putri dari Bapak W. Siregar & Ibu D. br. Hutapea' },
        ),
      },
      events: [
        { id: 'ev-pemberkatan', title: 'Pemberkatan Nikah', date: '2026-12-12', time: '09.00 – 11.00 WIB', place: 'HKBP Graha Anggun' },
        { id: 'ev-unjuk', title: 'Pesta Unjuk (Adat)', date: '2026-12-12', time: '12.00 – 18.00 WIB', place: 'Gedung Graha Anggun' },
      ],
      gallery: { title: 'Galeri', caption: 'Cerita kami menuju hari yang diberkati.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi kehadiran untuk membantu hasuhuton mempersiapkan acara.' },
      gift: { title: 'Tanda Kasih', text: 'Doa dan kehadiran Anda adalah berkat bagi kami. Jika ingin memberi tanda kasih:' },
      closing: {
        quote: '“Somba marhula-hula, elek marboru, manat mardongan tubu.”',
        source: 'Dalihan Na Tolu',
        message: 'Mauliate godang atas doa dan kehadiran Bapak/Ibu/Saudara/i. Horas, horas, horas!',
        signature: 'Raka & Ayu',
      },
    },
  },

  bugis: {
    id: 'bugis',
    name: 'Adat Bugis',
    tagline: 'Baju bodo, sabbe, emas magenta',
    category: 'pernikahan', group: 'Adat Nusantara',
    colors: { primary: '#c99d3e', secondary: '#8e2a5a', background: '#faf3e6', surface: '#fffaf0', text: '#3a2a1c' },
    fonts: { heading: 'Bodoni Moda', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '12px', '--btn-radius': '999px', '--btn-shadow': '0 10px 22px -10px rgba(142,42,90,.6)', '--heading-spacing': '.02em', '--heading-transform': 'none' },
    pattern: { id: 'sabbe', size: 48, opacity: 0.09 },
    fx: { particles: { shapes: ['sparkle', 'diamond', 'petal'], count: 14, motion: 'twinkle', size: [7, 16] }, patternMotion: 'none', glow: ['secondary', 'primary'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'arch', band: false },
    sectionStyle: 'framed',
    cover: { layout: 'arch', frame: 'dots', background: 'theme' },
    copy: {
      cover: { label: 'MAPPABOTTING', names: 'Andi & Ayu' },
      opening: {
        title: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
        text: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada akad nikah dan tudang botting putra-putri kami.',
      },
      profile: {
        title: 'Mempelai',
        people: people2(
          { name: 'Andi', fullName: 'Andi Raka Pratama', parents: 'Putra dari Bapak Andi Hendra & Ibu Sari' },
          { name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Putri dari Bapak Wibowo & Ibu Dewi' },
        ),
      },
      events: [
        { id: 'ev-akad', title: 'Akad Nikah', date: '2026-12-12', time: '09.00 – 10.30 WITA', place: 'Kediaman Mempelai Wanita, Makassar' },
        { id: 'ev-botting', title: 'Tudang Botting (Resepsi)', date: '2026-12-12', time: '12.00 – 16.00 WITA', place: 'Gedung Graha Anggun, Makassar' },
      ],
      gallery: { title: 'Galeri', caption: 'Langkah kami menuju pelaminan.' },
      rsvp: { title: 'Konfirmasi Kehadiran', text: 'Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i untuk membantu persiapan kami.' },
      gift: { title: 'Tanda Kasih', text: 'Doa restu Anda adalah hadiah terindah. Jika ingin memberi tanda kasih:' },
      closing: {
        quote: '“Sipakatau, sipakainge, sipakalebbi.”',
        source: 'Falsafah Bugis',
        message: 'Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.',
        signature: 'Andi & Ayu',
      },
    },
  },

  /* ──────────────────────────────── Ucapan ──────────────────────────────── */

  ucapanUltahCewek: {
    id: 'ucapanUltahCewek',
    name: 'Untuk Cewek',
    tagline: 'Peach, balon, manis',
    category: 'ucapan', group: 'Ucapan Ulang Tahun', audience: 'female',
    colors: { primary: '#e88a7d', secondary: '#c85a7c', background: '#fff4ef', surface: '#ffffff', text: '#4d2c35' },
    fonts: { heading: 'Dancing Script', body: 'Quicksand' },
    headingColor: 'secondary',
    vars: { '--radius': '26px', '--btn-radius': '999px', '--btn-shadow': '0 12px 26px -10px rgba(200,90,124,.55)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'dots', size: 40, opacity: 0.12 },
    fx: { particles: { shapes: ['balloon', 'heart', 'sparkle'], count: 16, motion: 'rise', size: [10, 24] }, patternMotion: 'none', glow: ['primary', '#ffd6e4'] },
    ornaments: { divider: 'heart', corner: 'vine', frame: 'oval', band: false },
    sectionStyle: 'card',
    cover: { layout: 'card', frame: 'balloons', background: 'bokeh' },
    copy: {
      cover: { label: 'HAPPY BIRTHDAY', names: 'Ayu', ...greetingCover },
      opening: {
        title: 'Selamat Ulang Tahun, Ayu!',
        text: 'Semoga di usia yang baru ini kamu makin bahagia, makin sehat, dan semua mimpi kecil maupun besarmu satu per satu jadi nyata. Terima kasih sudah jadi orang yang begitu berarti.',
      },
      profile: {
        title: 'Birthday Girl',
        people: [{ name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Makin bersinar di usia ke-22' }],
      },
      gallery: { title: 'Sweet Memories', caption: 'Potongan kecil cerita kita tahun ini.' },
      closing: {
        quote: '“Semoga tahun ini penuh tawa, cinta, dan kejutan-kejutan manis.”',
        source: '',
        message: 'Tetap jadi dirimu yang hangat dan menyenangkan, ya. Happy birthday!',
        signature: 'Dari Raka, dengan sayang',
      },
    },
  },

  ucapanUltahCowok: {
    id: 'ucapanUltahCowok',
    name: 'Untuk Cowok',
    tagline: 'Navy, amber, bold',
    category: 'ucapan', group: 'Ucapan Ulang Tahun', audience: 'male',
    colors: { primary: '#f2b632', secondary: '#f2b632', background: '#0f1b2d', surface: '#17263d', text: '#e9eef5' },
    fonts: { heading: 'Bebas Neue', body: 'Inter' },
    headingColor: 'primary',
    vars: { '--radius': '8px', '--btn-radius': '6px', '--btn-shadow': '0 10px 24px -10px rgba(0,0,0,.8)', '--heading-spacing': '.06em', '--heading-transform': 'uppercase' },
    pattern: { id: 'confetti', size: 110, opacity: 0.1 },
    fx: { particles: { shapes: ['confetti', 'star8', 'dot'], count: 16, motion: 'rise', size: [8, 18] }, patternMotion: 'drift', glow: ['primary', '#2d6cdf'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'bordered',
    cover: { layout: 'editorial', frame: 'bracket', background: 'theme' },
    copy: {
      cover: { label: 'HAPPY BIRTHDAY', names: 'Raka', ...greetingCover },
      opening: {
        title: 'Selamat Ulang Tahun, Bro!',
        text: 'Level up satu tahun lagi! Semoga makin sehat, makin sukses, rezeki lancar, dan semua target tahun ini tembus. Tetap rendah hati dan jangan berhenti berkembang.',
      },
      profile: {
        title: 'Birthday Boy',
        people: [{ name: 'Raka', fullName: 'Raka Pratama', parents: 'Resmi naik level ke usia 25' }],
      },
      gallery: { title: 'Highlights', caption: 'Momen-momen terbaik sepanjang tahun ini.' },
      closing: {
        quote: '“Umur boleh nambah, semangat jangan pernah kurang.”',
        source: '',
        message: 'Sukses selalu dan semoga tahun ini jadi tahun terbaikmu. Cheers!',
        signature: 'Dari teman-temanmu',
      },
    },
  },

  ucapanWisudaCewek: {
    id: 'ucapanWisudaCewek',
    name: 'Untuk Cewek',
    tagline: 'Lavender, emas, anggun',
    category: 'ucapan', group: 'Ucapan Wisuda', audience: 'female',
    colors: { primary: '#c2a15a', secondary: '#8a6bb8', background: '#f8f4fc', surface: '#ffffff', text: '#3b2d4f' },
    fonts: { heading: 'Allura', body: 'Josefin Sans' },
    headingColor: 'secondary',
    vars: { '--radius': '22px', '--btn-radius': '999px', '--btn-shadow': '0 10px 24px -12px rgba(138,107,184,.65)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'floral', size: 120, opacity: 0.08 },
    fx: { particles: { shapes: ['mortarboard', 'petal', 'sparkle'], count: 14, motion: 'fall', size: [10, 20] }, patternMotion: 'none', glow: ['secondary', '#f1e4c4'] },
    ornaments: { divider: 'floral', corner: 'floral', frame: 'arch', band: false },
    sectionStyle: 'airy',
    cover: { layout: 'arch', frame: 'floralTop', background: 'soft' },
    copy: {
      cover: { label: 'HAPPY GRADUATION', names: 'Ayu', ...greetingCover },
      opening: {
        title: 'Selamat Wisuda, Ayu!',
        text: 'Semua malam panjang, revisi, dan doa akhirnya terbayar. Kamu hebat! Semoga ilmunya berkah dan langkah setelah ini membawamu ke tempat-tempat yang luar biasa.',
      },
      profile: {
        title: 'Sang Wisudawati',
        people: [{ name: 'Ayu', fullName: 'Ayu Lestari, S.Psi.', parents: 'Psikologi · Universitas Nusantara' }],
      },
      gallery: { title: 'Perjalanan Studi', caption: 'Dari mahasiswa baru hingga toga dikenakan.' },
      closing: {
        quote: '“Ini bukan akhir, melainkan awal dari cerita yang lebih indah.”',
        source: '',
        message: 'Bangga sekali padamu. Selamat menempuh babak baru!',
        signature: 'Dengan bangga, Keluarga',
      },
    },
  },

  ucapanWisudaCowok: {
    id: 'ucapanWisudaCowok',
    name: 'Untuk Cowok',
    tagline: 'Hitam, emas, klasik',
    category: 'ucapan', group: 'Ucapan Wisuda', audience: 'male',
    colors: { primary: '#d4af37', secondary: '#c9a227', background: '#121212', surface: '#1d1d1d', text: '#efe9dc' },
    fonts: { heading: 'Cinzel', body: 'Montserrat' },
    headingColor: 'primary',
    vars: { '--radius': '6px', '--btn-radius': '4px', '--btn-shadow': '0 10px 24px -10px rgba(0,0,0,.85)', '--heading-spacing': '.06em', '--heading-transform': 'none' },
    pattern: { id: 'grid', size: 48, opacity: 0.07 },
    fx: { particles: { shapes: ['mortarboard', 'confetti', 'sparkle'], count: 14, motion: 'fall', size: [10, 22] }, patternMotion: 'none', glow: ['primary', '#3a3220'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'bordered',
    cover: { layout: 'center', frame: 'royal', background: 'marble' },
    copy: {
      cover: { label: 'CONGRATULATIONS GRADUATE', names: 'Raka', ...greetingCover },
      opening: {
        title: 'Selamat Wisuda, Raka!',
        text: 'Satu misi besar selesai. Kerja keras, begadang, dan perjuanganmu akhirnya berbuah manis. Semoga ilmunya bermanfaat dan karier ke depan makin cemerlang.',
      },
      profile: {
        title: 'Sang Wisudawan',
        people: [{ name: 'Raka', fullName: 'Raka Pratama, S.T.', parents: 'Teknik Sipil · Universitas Nusantara' }],
      },
      gallery: { title: 'Perjalanan Studi', caption: 'Bab demi bab menuju hari ini.' },
      closing: {
        quote: '“Gelar adalah awal. Yang membuatnya berarti adalah apa yang kamu bangun setelahnya.”',
        source: '',
        message: 'Proud of you! Selamat melangkah ke babak berikutnya.',
        signature: 'Dari keluarga & sahabat',
      },
    },
  },

  ucapanSuksesCewek: {
    id: 'ucapanSuksesCewek',
    name: 'Untuk Cewek',
    tagline: 'Sage, rose gold, segar',
    category: 'ucapan', group: 'Ucapan Semoga Sukses', audience: 'female',
    colors: { primary: '#c58f7a', secondary: '#5f8b76', background: '#f4f8f5', surface: '#ffffff', text: '#2f3b35' },
    fonts: { heading: 'Parisienne', body: 'Nunito' },
    headingColor: 'secondary',
    vars: { '--radius': '22px', '--btn-radius': '999px', '--btn-shadow': '0 10px 24px -12px rgba(95,139,118,.65)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'leaves', size: 110, opacity: 0.09 },
    fx: { particles: { shapes: ['leaf', 'flower', 'sparkle'], count: 14, motion: 'rise', size: [8, 18] }, patternMotion: 'none', glow: ['primary', '#d6e8dc'] },
    ornaments: { divider: 'floral', corner: 'vine', frame: 'arch', band: false },
    sectionStyle: 'minimal',
    cover: { layout: 'split', frame: 'leaves', background: 'paper' },
    copy: {
      cover: { label: 'GOOD LUCK', names: 'Ayu', ...greetingCover },
      opening: {
        title: 'Semoga Sukses, Ayu!',
        text: 'Untuk langkah baru yang sedang kamu mulai — semoga dilancarkan, dimudahkan, dan selalu dikelilingi orang-orang baik. Kamu pasti bisa!',
      },
      profile: {
        title: 'Untukmu',
        people: [{ name: 'Ayu', fullName: 'Ayu Lestari', parents: 'Selamat memulai perjalanan baru' }],
      },
      gallery: { title: 'Perjalananmu', caption: 'Setiap langkah kecil membawamu sampai di sini.' },
      closing: {
        quote: '“Percaya pada prosesnya. Hal-hal baik sedang menuju ke arahmu.”',
        source: '',
        message: 'Kami selalu mendukungmu. Semoga sukses dan bahagia selalu!',
        signature: 'Dari kami yang selalu mendukungmu',
      },
    },
  },

  ucapanSuksesCowok: {
    id: 'ucapanSuksesCowok',
    name: 'Untuk Cowok',
    tagline: 'Charcoal, teal, tegas',
    category: 'ucapan', group: 'Ucapan Semoga Sukses', audience: 'male',
    colors: { primary: '#3fc1a5', secondary: '#2fa58c', background: '#1c2128', surface: '#252b34', text: '#eef1f4' },
    fonts: { heading: 'Bebas Neue', body: 'Inter' },
    headingColor: 'primary',
    vars: { '--radius': '8px', '--btn-radius': '6px', '--btn-shadow': '0 10px 24px -10px rgba(0,0,0,.8)', '--heading-spacing': '.06em', '--heading-transform': 'uppercase' },
    pattern: { id: 'chevron', size: 40, opacity: 0.08 },
    fx: { particles: { shapes: ['diamond', 'sparkle', 'dot'], count: 12, motion: 'rise', size: [6, 14] }, patternMotion: 'drift', glow: ['primary', '#2b3b4e'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'bordered',
    cover: { layout: 'editorial', frame: 'ribbon', background: 'theme' },
    copy: {
      cover: { label: 'GOOD LUCK', names: 'Raka', ...greetingCover },
      opening: {
        title: 'Semoga Sukses, Raka!',
        text: 'Tantangan baru, level baru. Semoga semua rencana berjalan lancar, setiap usaha membuahkan hasil, dan kamu terus melangkah lebih jauh dari yang kamu bayangkan.',
      },
      profile: {
        title: 'Untukmu',
        people: [{ name: 'Raka', fullName: 'Raka Pratama', parents: 'Selamat atas langkah barunya' }],
      },
      gallery: { title: 'Perjalanan', caption: 'Dari titik awal hingga sekarang.' },
      closing: {
        quote: '“Kerja keras hari ini adalah kemenangan esok hari.”',
        source: '',
        message: 'Gas terus! Kami tunggu kabar baiknya.',
        signature: 'Dari teman-temanmu',
      },
    },
  },
};

Object.assign(themes, moreThemes);

// Turunkan sifat dari kategori: tema Ucapan memakai mode "greeting".
for (const t of Object.values(themes)) {
  const cat = themeCategories.find((c) => c.id === t.category);
  t.kind = cat?.kind ?? 'invitation';
  t.cover = { layout: 'center', frame: 'theme', background: 'theme', ...t.cover };
  t.hiddenSections = t.kind === 'greeting' ? GREETING_HIDDEN_SECTIONS : [];
  t.photo = { shape: t.ornaments.frame, border: 'ring', decor: 'none', ...t.photo };
  t.motion = { ...DEFAULT_MOTION, ...t.motion };
}

export const themeList = Object.values(themes);
export const DEFAULT_THEME = 'wedding';
export const getTheme = (id) => themes[id] || themes[DEFAULT_THEME];
