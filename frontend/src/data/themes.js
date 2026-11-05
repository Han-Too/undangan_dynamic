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

  lamaran: {
    id: 'lamaran',
    name: 'Lamaran',
    tagline: 'Hangat, kalem, intim',
    colors: { primary: '#c48b7a', secondary: '#6e8470', background: '#f8f3ef', surface: '#fffaf6', text: '#463a35' },
    fonts: { heading: 'Cormorant Garamond', body: 'Inter' },
    headingColor: 'text',
    vars: { '--radius': '20px', '--btn-radius': '999px', '--btn-shadow': '0 10px 24px -12px rgba(110,132,112,.7)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'floral', size: 120, opacity: 0.08 },
    fx: { particles: { shapes: ['petal', 'sparkle'], count: 12, motion: 'fall', size: [8, 18] }, patternMotion: 'none', glow: ['primary', '#dfe6d8'] },
    ornaments: { divider: 'floral', corner: 'vine', frame: 'arch', band: false },
    sectionStyle: 'airy',
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
    colors: { primary: '#f0913e', secondary: '#3d7dd8', background: '#fff8ec', surface: '#ffffff', text: '#3a3352' },
    fonts: { heading: 'Dancing Script', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '24px', '--btn-radius': '999px', '--btn-shadow': '0 10px 22px -10px rgba(61,125,216,.6)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'confetti', size: 100, opacity: 0.14 },
    fx: { particles: { shapes: ['balloon', 'confetti', 'star8'], count: 16, motion: 'rise', size: [12, 26] }, patternMotion: 'drift', glow: ['primary', '#ffd3e0'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'oval', band: false },
    sectionStyle: 'airy',
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
    colors: { primary: '#d4af6a', secondary: '#e07a9b', background: '#1b1f33', surface: '#252a42', text: '#f1ecdf' },
    fonts: { heading: 'Playfair Display', body: 'Montserrat' },
    headingColor: 'primary',
    vars: { '--radius': '16px', '--btn-radius': '999px', '--btn-shadow': '0 10px 26px -10px rgba(0,0,0,.8)', '--heading-spacing': '.02em', '--heading-transform': 'none' },
    pattern: { id: 'dots', size: 36, opacity: 0.08 },
    fx: { particles: { shapes: ['sparkle', 'confetti', 'dot'], count: 18, motion: 'rise', size: [6, 16] }, patternMotion: 'drift', glow: ['primary', 'secondary'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'glass',
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
    colors: { primary: '#a66cc9', secondary: '#d9568f', background: '#fbf4fd', surface: '#ffffff', text: '#45284f' },
    fonts: { heading: 'Great Vibes', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '26px', '--btn-radius': '999px', '--btn-shadow': '0 12px 26px -10px rgba(217,86,143,.6)', '--heading-spacing': '.01em', '--heading-transform': 'none' },
    pattern: { id: 'dots', size: 44, opacity: 0.1 },
    fx: { particles: { shapes: ['sparkle', 'heart', 'dot'], count: 18, motion: 'twinkle', size: [8, 18] }, patternMotion: 'none', glow: ['primary', '#ffc9de'] },
    ornaments: { divider: 'heart', corner: 'vine', frame: 'oval', band: false },
    sectionStyle: 'glass',
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
    colors: { primary: '#c9a85c', secondary: '#3f8a7f', background: '#f2f8f6', surface: '#ffffff', text: '#24433e' },
    fonts: { heading: 'Playfair Display', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '18px', '--btn-radius': '999px', '--btn-shadow': '0 8px 20px -10px rgba(63,138,127,.6)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'islamicStar', size: 80, opacity: 0.08 },
    fx: { particles: { shapes: ['star8', 'crescent', 'sparkle'], count: 12, motion: 'twinkle', size: [8, 18] }, patternMotion: 'drift', glow: ['secondary', '#f3e6c4'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'arch', band: false },
    sectionStyle: 'framed',
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
    colors: { primary: '#b5853f', secondary: '#4f6b3a', background: '#f6f1e4', surface: '#fffcf3', text: '#3b3226' },
    fonts: { heading: 'Lora', body: 'Poppins' },
    headingColor: 'secondary',
    vars: { '--radius': '14px', '--btn-radius': '12px', '--btn-shadow': '0 8px 20px -10px rgba(79,107,58,.6)', '--heading-spacing': '0', '--heading-transform': 'none' },
    pattern: { id: 'leaves', size: 110, opacity: 0.1 },
    fx: { particles: { shapes: ['leaf', 'petal'], count: 12, motion: 'fall', size: [10, 20] }, patternMotion: 'none', glow: ['primary', '#d9e2c6'] },
    ornaments: { divider: 'floral', corner: 'vine', frame: 'arch', band: false },
    sectionStyle: 'framed',
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
    colors: { primary: '#c9a227', secondary: '#1f3a68', background: '#f5f6fa', surface: '#ffffff', text: '#1d2742' },
    fonts: { heading: 'Cinzel', body: 'Inter' },
    headingColor: 'secondary',
    vars: { '--radius': '10px', '--btn-radius': '8px', '--btn-shadow': '0 8px 20px -10px rgba(31,58,104,.6)', '--heading-spacing': '.04em', '--heading-transform': 'none' },
    pattern: { id: 'grid', size: 48, opacity: 0.07 },
    fx: { particles: { shapes: ['mortarboard', 'confetti', 'sparkle'], count: 14, motion: 'fall', size: [10, 22] }, patternMotion: 'none', glow: ['primary', '#c9d4ea'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'bordered',
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
    colors: { primary: '#e0663f', secondary: '#1f2a37', background: '#f7f5f2', surface: '#ffffff', text: '#1f2a37' },
    fonts: { heading: 'Montserrat', body: 'Inter' },
    headingColor: 'secondary',
    vars: { '--radius': '12px', '--btn-radius': '10px', '--btn-shadow': '0 8px 20px -12px rgba(31,42,55,.7)', '--heading-spacing': '.02em', '--heading-transform': 'none' },
    pattern: { id: 'grid', size: 56, opacity: 0.06 },
    fx: { particles: { shapes: ['dot', 'diamond'], count: 10, motion: 'twinkle', size: [5, 11] }, patternMotion: 'drift', glow: ['primary', '#d7dde6'] },
    ornaments: { divider: 'star', corner: 'geometric', frame: 'rect', band: false },
    sectionStyle: 'airy',
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
};

export const themeList = Object.values(themes);
export const DEFAULT_THEME = 'wedding';
export const getTheme = (id) => themes[id] || themes[DEFAULT_THEME];
