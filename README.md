# Undangan Online — Vue 3 + Laravel 11 + PostgreSQL

Aplikasi undangan digital. Semua setelan undangan (tema, font, warna, teks, acara, foto, musik, lokasi, dll.) diatur di **dashboard** (wajib login) dan disimpan di **database**. Halaman undangan yang dibuka tamu cukup mengambil datanya lewat API.

Setiap tamu bisa dibuatkan **link pribadi**. Contoh untuk undangan `raka-dinda`:

| Tamu | Link | Di cover tertulis |
| --- | --- | --- |
| Adit & Istri | `http://localhost:5173/raka-dinda/adit-dan-istri` | Kepada Yth. **Adit & Istri** |
| Joko & Istri | `http://localhost:5173/raka-dinda/joko-dan-istri` | Kepada Yth. **Joko & Istri** |
| (umum) | `http://localhost:5173/raka-dinda` | — |

```
undangan-online/
├── backend/    Laravel 11 (REST API + login Sanctum)
│   └── database/schema.sql   ← SQL PostgreSQL (tabel + akun awal)
└── frontend/   Vue 3 + Vite (dashboard, editor, halaman undangan)
```

---

## 1. Kebutuhan

- **PHP 8.2 – 8.5** (Laravel 11 tidak jalan di PHP 8.1; sudah dites di 8.2 dan 8.5). Di Laragon: *Menu → PHP → Version*.
- Ekstensi PHP **`pdo_pgsql`** dan **`pgsql`** aktif. Di Laragon: *Menu → PHP → Extensions →* centang `pdo_pgsql` dan `pgsql`
  (atau buka `php.ini` dan hapus `;` di depan `extension=pdo_pgsql` dan `extension=pgsql`).
- **Composer** versi terbaru (`composer self-update`; Composer lama memunculkan banyak pesan *Deprecated* di PHP 8.4+), **Node.js 20+** & npm.
- **PostgreSQL** (bisa yang bawaan Laragon) + DBeaver.
- Agar bisa unggah musik sampai 15 MB, pastikan di `php.ini`: `upload_max_filesize = 20M` dan `post_max_size = 25M`
  (Laragon biasanya sudah lebih besar).

## 2. Database (DBeaver)

1. Buat database baru, mis. **`undangan_online`**.
2. Buka *SQL Editor* untuk database itu, buka/tempel isi file [`backend/database/schema.sql`](backend/database/schema.sql).
3. Jalankan sebagai script: **Alt + X** (*Execute SQL Script*).

Script membuat tabel `users`, `personal_access_tokens`, `invitations`, `guests`, `rsvps`, plus data awal:

| Email | Password | Role |
| --- | --- | --- |
| `admin@undangan.test` | `admin123` | admin |
| `user@undangan.test` | `user123` | user |

Juga ada satu undangan contoh **Raka & Dinda** (`/raka-dinda`) dengan tamu *Adit & Istri* dan *Joko & Istri*.
Script aman dijalankan ulang (tidak menggandakan data). **Ganti password akun awal** setelah login (menu *Profil*).

> Proyek ini **tidak** memakai `php artisan migrate`. Skema database sepenuhnya ada di `schema.sql`.

## 3. Backend (Laravel)

```bash
cd backend
composer install
copy .env.example .env        # Linux/Mac: cp .env.example .env
php artisan key:generate
php artisan storage:link      # agar foto & musik yang diunggah bisa diakses
```

Sesuaikan koneksi database di `backend/.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=undangan_online
DB_USERNAME=postgres
DB_PASSWORD=
```

Jalankan:

```bash
php artisan serve             # http://localhost:8000
```

> Kalau `php -v` di terminal masih versi 8.1, buka terminal dari Laragon (*Menu → Terminal*) setelah mengganti versi PHP,
> atau panggil langsung, mis. `C:\laragon\bin\php\php-8.5.12-Win32-vs17-x64\php.exe artisan serve`.
>
> Di PHP 8.5, Laravel 11 memunculkan peringatan `PDO::MYSQL_ATTR_SSL_CA is deprecated`. Ini tidak berbahaya: hanya tampil
> kalau `error_reporting` di `php.ini` menyertakan `E_DEPRECATED` (bawaan Laragon: `E_ALL & ~E_DEPRECATED`, jadi tidak tampil).

## 4. Frontend (Vue)

Di terminal lain:

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

Saat development Vite meneruskan `/api` dan `/storage` ke `http://127.0.0.1:8000` (lihat `frontend/vite.config.js`).
Kalau backend jalan di alamat lain, buat file `frontend/.env.local` berisi `BACKEND_URL=http://alamat-backend`.

Buka **http://localhost:5173** → otomatis diarahkan ke halaman login.

## 5. Cara pakai

1. **Login** di `/login`.
2. **Undangan → Undangan baru**: isi judul (mis. *Raka & Dinda*). Link dibuat otomatis (`/raka-dan-dinda`) atau isi sendiri.
3. Anda masuk ke **editor**: atur tema, font, warna, teks, acara, galeri, foto, musik, maps, RSVP, hadiah.
   Preview di kanan langsung berubah. Klik **Save** (atau `Ctrl + S`) untuk menyimpan ke database.
4. Klik **Tamu** (di editor atau di daftar undangan):
   - *Satu*: isi nama tamu (mis. `Adit & Istri`) dan nomor WhatsApp (opsional) → link pribadi langsung jadi.
   - *Banyak*: tempel daftar, satu tamu per baris. Format `Nama` atau `Nama | 08123456789`.
   - Tiap tamu punya tombol **Salin link**, **WA** (buka WhatsApp dengan pesan undangan + link), salin pesan, edit, hapus.
   - **Salin semua link** menyalin daftar `Nama: link` untuk ditempel ke mana saja.
   - Template pesan WhatsApp bisa diubah (`{nama}` dan `{link}` otomatis diganti).
5. Pantau di halaman Tamu: siapa yang **sudah membuka** link, siapa yang **hadir / tidak hadir**, berapa orang, dan ucapannya.
   Tamu yang mengirim RSVP lagi dari link pribadinya akan **memperbarui** RSVP lamanya, bukan menambah baru.
6. **Pengaturan** (ikon gerigi di daftar undangan): ganti judul/link, ubah status **Terbit / Draft**
   (Draft = link tidak bisa dibuka tamu), dan (khusus admin) pindahkan pemilik undangan.

### Role

| | Admin | User |
| --- | --- | --- |
| Membuat & mengatur undangan sendiri | ✔ | ✔ |
| Melihat & mengatur undangan semua user | ✔ | — |
| Menu **Pengguna** (tambah user, ubah role, nonaktifkan, hapus) | ✔ | — |

Akun yang dinonaktifkan langsung tidak bisa login dan sesi aktifnya diputus.

## 6. Produksi / deploy

Frontend di-build ke dalam Laravel sehingga cukup satu domain:

```bash
cd frontend
npm run build                 # hasil ke backend/public/spa
```

Arahkan web server (Apache/Nginx/Laragon virtual host) ke folder **`backend/public`**. Semua URL selain `/api/*` dan `/storage/*`
dilayani oleh `public/spa/index.html` (lihat `backend/routes/web.php`). Lalu:

- `.env`: `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://domain-anda`
- `php artisan storage:link`, `php artisan config:cache`, `php artisan route:cache`
- Pastikan folder `backend/storage` dan `backend/bootstrap/cache` bisa ditulis web server.

Link undangan yang dibagikan otomatis mengikuti domain tempat dashboard dibuka (mis. `https://domain-anda/raka-dinda/adit-dan-istri`).

## 7. Referensi API

Semua endpoint di bawah `/api`. Endpoint dashboard memakai header `Authorization: Bearer <token>` dari `/auth/login`.

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| POST | `/auth/login` | `{email, password}` → `{token, user}` |
| GET | `/auth/me` | user yang login |
| POST | `/auth/logout` | hapus token |
| PUT | `/auth/profile` | ubah nama/email/password sendiri |
| GET / POST | `/invitations` | daftar (admin: semua) / buat undangan |
| GET / PUT / DELETE | `/invitations/{id}` | detail (termasuk `config`) / ubah (`title`, `slug`, `is_published`, `config`, `user_id`) / hapus |
| POST | `/invitations/{id}/photos` | unggah foto (`file`) → `{url}` |
| POST / DELETE | `/invitations/{id}/audio` | unggah / hapus musik |
| GET / POST | `/invitations/{id}/guests` | daftar tamu / tambah (`{name, phone}` atau `{names: "baris\nbaris"}`) |
| PUT / DELETE | `/invitations/{id}/guests/{guestId}` | ubah / hapus tamu |
| GET / POST / DELETE | `/invitations/{id}/rsvps` | daftar / uji kirim / hapus semua RSVP |
| DELETE | `/invitations/{id}/rsvps/{rsvpId}` | hapus satu RSVP |
| GET | `/owners` | daftar akun untuk pilihan pemilik (admin) |
| GET / POST / PUT / DELETE | `/users`, `/users/{id}` | manajemen akun (admin) |
| GET | `/public/invitations/{slug}?guest={guestSlug}` | **publik** — data undangan + tamu + ucapan |
| POST | `/public/invitations/{slug}/rsvps` | **publik** — kirim RSVP (`name, attendance, guests, message, guest`) |

## 8. Struktur kode

**Backend** (`backend/app`)

- `Models/` — `User` (role admin/user), `Invitation` (kolom `config` JSONB berisi seluruh setelan editor), `Guest`, `Rsvp`.
- `Http/Controllers/Api/` — `AuthController`, `InvitationController`, `GuestController`, `RsvpController`, `UserController`, `PublicInvitationController`.
- `Policies/InvitationPolicy.php` — admin boleh semua, user hanya miliknya.
- `Http/Middleware/` — `EnsureAdmin` (alias `admin`), `EnsureActive` (alias `active`).
- `routes/api.php` — semua endpoint; `routes/web.php` — melayani SPA hasil build.
- File unggahan: `storage/app/public/invitations/{id}/` (ikut terhapus saat undangan dihapus).

**Frontend** (`frontend/src`)

- `router.js` — rute & guard login/role.
- `services/api.js` — klien HTTP (token, error, upload). `services/rsvpService.js` — RSVP mode admin/publik.
- `composables/useAuth.js` — sesi login. `composables/useInvitation.js` — state undangan (dimuat dari / disimpan ke API).
- `views/` — `LoginView`, `admin/*` (dashboard, tamu, pengguna, profil), `BuilderView` (editor), `PublicInvitationView` (halaman tamu).
- `components/builder/*` — panel editor. `components/invitation/*` — tampilan undangan (dipakai editor & halaman tamu).
- `data/themes.js`, `fonts.js`, `patterns.js`, `sections.js`, `defaults.js` — tema & bentuk data `config`.

| Tujuan | File |
| --- | --- |
| Tema baru | tambah satu objek di `frontend/src/data/themes.js` |
| Font baru | `frontend/src/data/fonts.js` |
| Section undangan baru | komponen baru + daftarkan di `data/sections.js` (default di `data/defaults.js`) |
| Panel editor baru | komponen baru + daftarkan di `data/editorPanels.js` |
| Field setelan baru | `data/defaults.js` lalu field di editor terkait (otomatis ikut tersimpan di `config`) |
