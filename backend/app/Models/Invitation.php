<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Invitation extends Model
{
    /** Dipakai rute frontend/backend, jadi tidak boleh menjadi slug undangan. */
    public const RESERVED_SLUGS = ['admin', 'login', 'api', 'storage', 'spa', 'up'];

    protected $fillable = ['title', 'slug', 'config', 'is_published'];

    protected $hidden = ['audio_path'];

    protected $appends = ['audio_url'];

    protected $attributes = ['config' => '{}', 'is_published' => true];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    /**
     * `config` = JSON utuh dari builder. Didecode sebagai objek (bukan array PHP) agar `{}` tetap `{}`
     * dan tidak berubah menjadi `[]` saat dikirim balik ke frontend.
     */
    protected function config(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => json_decode($value ?: '{}', false) ?? new \stdClass,
            set: fn ($value) => json_encode(empty((array) $value) ? new \stdClass : $value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        );
    }

    protected static function booted(): void
    {
        // File unggahan (foto & musik) disimpan per undangan; ikut dihapus bersama undangannya.
        static::deleted(fn (Invitation $inv) => Storage::disk('public')->deleteDirectory($inv->mediaDir()));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class);
    }

    public function mediaDir(): string
    {
        return "invitations/{$this->id}";
    }

    /** URL relatif (/storage/...) agar tetap benar di belakang proxy dev maupun domain produksi. */
    public static function publicUrl(?string $path): ?string
    {
        return $path ? '/storage/'.ltrim($path, '/') : null;
    }

    public function getAudioUrlAttribute(): ?string
    {
        return self::publicUrl($this->audio_path);
    }

    /** Slug unik dari teks bebas: "Raka & Dinda" -> raka-dan-dinda, raka-dan-dinda-2, ... */
    public static function uniqueSlug(string $text, ?int $ignoreId = null): string
    {
        $base = self::slugify($text) ?: 'undangan';
        $slug = $base;
        $taken = fn ($s) => in_array($s, self::RESERVED_SLUGS, true)
            || static::where('slug', $s)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists();
        for ($i = 2; $taken($slug); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }

    public static function slugify(string $text): string
    {
        return Str::limit(Str::slug($text, '-', 'id', ['@' => 'at', '&' => 'dan']), 90, '');
    }
}
