<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Penyimpanan file unggahan (foto & musik).
 *
 * - Produksi (Vercel): BLOB_READ_WRITE_TOKEN terisi -> file dikirim ke Vercel Blob dan yang disimpan
 *   adalah URL absolut (https://xxx.public.blob.vercel-storage.com/...). Filesystem container Vercel
 *   tidak permanen, jadi file tidak boleh disimpan di storage/ lokal.
 * - Lokal: disk `public` Laravel, yang disimpan path relatif (invitations/1/photos/abc.jpg).
 */
class MediaStorage
{
    private const API_URL = 'https://vercel.com/api/blob';

    private const API_VERSION = '13';

    /**
     * Blob aktif bila ada BLOB_READ_WRITE_TOKEN (store lama) atau BLOB_STORE_ID (store baru, auth via OIDC).
     * Keduanya otomatis ditambahkan Vercel saat Blob store dihubungkan ke project.
     */
    public static function usesBlob(): bool
    {
        return filled(config('services.vercel_blob.token')) || filled(config('services.vercel_blob.store_id'));
    }

    /** Simpan file di folder `$dir`; mengembalikan nilai yang disimpan di DB (path lokal atau URL Blob). */
    public static function store(UploadedFile $file, string $dir): string
    {
        if (! self::usesBlob()) {
            return $file->store($dir, 'public');
        }

        $ext = $file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin';
        $pathname = trim($dir, '/').'/'.Str::random(40).'.'.$ext;

        $response = self::request()
            ->withHeaders([
                'x-vercel-blob-access' => 'public',
                'x-add-random-suffix' => '0',
                'x-content-type' => $file->getMimeType() ?: 'application/octet-stream',
                'x-cache-control-max-age' => '31536000',
            ])
            ->withBody(file_get_contents($file->getRealPath()), 'application/octet-stream')
            ->put(self::API_URL.'/?'.http_build_query(['pathname' => $pathname]));

        if ($response->failed() || ! $response->json('url')) {
            throw new RuntimeException('Gagal mengunggah ke Vercel Blob: '.$response->body());
        }

        return $response->json('url');
    }

    /** URL yang dipakai frontend. Path lokal -> /storage/... (diteruskan proxy dev), URL Blob -> apa adanya. */
    public static function url(?string $stored): ?string
    {
        if (! $stored) {
            return null;
        }

        return self::isUrl($stored) ? $stored : '/storage/'.ltrim($stored, '/');
    }

    public static function delete(?string $stored): void
    {
        if (! $stored) {
            return;
        }

        if (self::isUrl($stored)) {
            if (self::usesBlob()) {
                self::deleteBlobs([$stored]);
            }

            return;
        }

        Storage::disk('public')->delete($stored);
    }

    /** Hapus semua file dalam folder (dipakai saat undangan dihapus). */
    public static function deleteDirectory(string $dir): void
    {
        Storage::disk('public')->deleteDirectory($dir);

        if (! self::usesBlob()) {
            return;
        }

        $cursor = null;
        do {
            $response = self::request()->get(self::API_URL, array_filter([
                'prefix' => trim($dir, '/').'/',
                'limit' => 1000,
                'cursor' => $cursor,
            ]));
            if ($response->failed()) {
                report(new RuntimeException('Gagal membaca daftar Vercel Blob: '.$response->body()));

                return;
            }

            self::deleteBlobs(collect($response->json('blobs', []))->pluck('url')->all());
            $cursor = $response->json('hasMore') ? $response->json('cursor') : null;
        } while ($cursor);
    }

    private static function deleteBlobs(array $urls): void
    {
        if (! $urls) {
            return;
        }

        $response = self::request()->post(self::API_URL.'/delete', ['urls' => array_values($urls)]);
        if ($response->failed()) {
            // Gagal hapus tidak boleh menggagalkan aksi user; cukup dicatat.
            report(new RuntimeException('Gagal menghapus dari Vercel Blob: '.$response->body()));
        }
    }

    private static function request()
    {
        [$token, $storeId] = self::credentials();

        return Http::withToken($token)
            ->withHeaders(['x-api-version' => self::API_VERSION, 'x-vercel-blob-store-id' => $storeId])
            ->acceptJson()
            ->timeout(60)
            ->retry(2, 500, throw: false);
    }

    /**
     * Sama seperti resolveBlobAuth() di SDK @vercel/blob:
     * 1. Read-write token (format vercel_blob_rw_<storeId>_<secret>).
     * 2. OIDC token Vercel + BLOB_STORE_ID. Token diambil dari header request `x-vercel-oidc-token`,
     *    file VERCEL_OIDC_TOKEN_FILE, atau env VERCEL_OIDC_TOKEN (urutan yang sama dengan @vercel/oidc).
     *
     * @return array{0: string, 1: string} [token, storeId]
     */
    private static function credentials(): array
    {
        $readWrite = config('services.vercel_blob.token');
        if (filled($readWrite)) {
            return [$readWrite, explode('_', $readWrite)[3] ?? ''];
        }

        $storeId = (string) config('services.vercel_blob.store_id');
        $storeId = str_starts_with($storeId, 'store_') ? substr($storeId, 6) : $storeId;

        $oidc = app()->bound('request') ? request()->header('x-vercel-oidc-token') : null;
        if (blank($oidc) && ($file = self::env('VERCEL_OIDC_TOKEN_FILE')) && is_readable($file)) {
            $oidc = trim((string) file_get_contents($file));
        }
        $oidc = filled($oidc) ? $oidc : self::env('VERCEL_OIDC_TOKEN');

        if (blank($oidc) || blank($storeId)) {
            throw new RuntimeException('Vercel Blob: token OIDC tidak ditemukan. Tambahkan env BLOB_READ_WRITE_TOKEN dari halaman Blob store.');
        }

        return [$oidc, $storeId];
    }

    /** Env runtime yang diinjeksi Vercel (bukan dari .env), jadi dibaca langsung dan tidak lewat config. */
    private static function env(string $key): ?string
    {
        $value = $_SERVER[$key] ?? $_ENV[$key] ?? getenv($key);

        return is_string($value) && trim($value) !== '' ? trim($value) : null;
    }

    private static function isUrl(string $value): bool
    {
        return str_starts_with($value, 'http://') || str_starts_with($value, 'https://');
    }
}
