-- =====================================================================
--  Undangan Online — skema database PostgreSQL
--
--  Cara pakai (DBeaver):
--    1. Buat database kosong, mis. `undangan_online`.
--    2. Buka SQL Editor pada database itu, tempel seluruh file ini,
--       lalu jalankan sebagai script (Alt+X / "Execute SQL Script").
--
--  Script aman dijalankan ulang: tabel memakai IF NOT EXISTS dan data
--  awal memakai ON CONFLICT DO NOTHING.
--
--  Akun awal:
--    admin@undangan.test / admin123   (role admin)
--    user@undangan.test  / user123    (role user)
--  SEGERA ganti password setelah login pertama.
-- =====================================================================

-- Hapus komentar blok di bawah HANYA bila ingin mengulang dari nol (semua data hilang).
-- DROP TABLE IF EXISTS rsvps, guests, invitations, personal_access_tokens, users CASCADE;

-- ---------------------------------------------------------------------
--  users: akun login dashboard. role = admin (kelola semua) | user (milik sendiri)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    role            VARCHAR(20)  NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    remember_token  VARCHAR(100),
    created_at      TIMESTAMP(0),
    updated_at      TIMESTAMP(0)
);

-- ---------------------------------------------------------------------
--  personal_access_tokens: token login API (Laravel Sanctum)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS personal_access_tokens (
    id              BIGSERIAL PRIMARY KEY,
    tokenable_type  VARCHAR(255) NOT NULL,
    tokenable_id    BIGINT       NOT NULL,
    name            VARCHAR(255) NOT NULL,
    token           VARCHAR(64)  NOT NULL UNIQUE,
    abilities       TEXT,
    last_used_at    TIMESTAMP(0),
    expires_at      TIMESTAMP(0),
    created_at      TIMESTAMP(0),
    updated_at      TIMESTAMP(0)
);
CREATE INDEX IF NOT EXISTS personal_access_tokens_tokenable_index
    ON personal_access_tokens (tokenable_type, tokenable_id);

-- ---------------------------------------------------------------------
--  invitations: satu undangan. Semua setelan builder (tema, warna, font,
--  teks, acara, foto, musik, lokasi, ...) disimpan utuh di kolom `config`.
--  URL publik: /{slug}
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invitations (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT       NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    config          JSONB        NOT NULL DEFAULT '{}'::jsonb,
    audio_path      VARCHAR(255),
    is_published    BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP(0),
    updated_at      TIMESTAMP(0)
);
CREATE INDEX IF NOT EXISTS invitations_user_id_index ON invitations (user_id);

-- ---------------------------------------------------------------------
--  guests: tamu per undangan. Tiap tamu punya link sendiri:
--  /{invitation.slug}/{guest.slug}  ->  "Kepada Yth. Adit & Istri"
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS guests (
    id              BIGSERIAL PRIMARY KEY,
    invitation_id   BIGINT       NOT NULL REFERENCES invitations (id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(160) NOT NULL,
    phone           VARCHAR(30),
    opened_at       TIMESTAMP(0),
    open_count      INTEGER      NOT NULL DEFAULT 0,
    created_at      TIMESTAMP(0),
    updated_at      TIMESTAMP(0),
    CONSTRAINT guests_invitation_slug_unique UNIQUE (invitation_id, slug)
);

-- ---------------------------------------------------------------------
--  rsvps: konfirmasi kehadiran + ucapan. Tamu dengan link pribadi hanya
--  punya satu RSVP (kirim ulang = memperbarui), tamu umum boleh banyak.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rsvps (
    id              BIGSERIAL PRIMARY KEY,
    invitation_id   BIGINT       NOT NULL REFERENCES invitations (id) ON DELETE CASCADE,
    guest_id        BIGINT       REFERENCES guests (id) ON DELETE SET NULL,
    name            VARCHAR(80)  NOT NULL,
    attendance      VARCHAR(10)  NOT NULL CHECK (attendance IN ('hadir', 'tidak')),
    guests          SMALLINT     NOT NULL DEFAULT 0 CHECK (guests BETWEEN 0 AND 20),
    message         TEXT,
    created_at      TIMESTAMP(0),
    updated_at      TIMESTAMP(0)
);
CREATE INDEX IF NOT EXISTS rsvps_invitation_created_index ON rsvps (invitation_id, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS rsvps_guest_id_unique ON rsvps (guest_id) WHERE guest_id IS NOT NULL;

-- =====================================================================
--  Data awal
-- =====================================================================
INSERT INTO users (name, email, password, role, is_active, created_at, updated_at) VALUES
    ('Administrator', 'admin@undangan.test', '$2y$12$jnhf85zG8/nwrdVJ/5wOdeB487foiuuaIS/ZyhEC5DWb9tJpgBXi6', 'admin', TRUE, NOW(), NOW()),
    ('User Demo',     'user@undangan.test',  '$2y$12$1s1.ixrUjZI0B2jK7KsMJOa4oel4zV1dM45oZJ/aPKsCsPn0iM3OG', 'user',  TRUE, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Undangan contoh milik admin. config '{}' = memakai setelan default builder.
INSERT INTO invitations (user_id, title, slug, config, is_published, created_at, updated_at)
SELECT id, 'Raka & Dinda', 'raka-dinda', '{}'::jsonb, TRUE, NOW(), NOW()
FROM users WHERE email = 'admin@undangan.test'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO guests (invitation_id, name, slug, created_at, updated_at)
SELECT i.id, g.name, g.slug, NOW(), NOW()
FROM invitations i
CROSS JOIN (VALUES ('Adit & Istri', 'adit-dan-istri'), ('Joko & Istri', 'joko-dan-istri')) AS g (name, slug)
WHERE i.slug = 'raka-dinda'
ON CONFLICT (invitation_id, slug) DO NOTHING;
