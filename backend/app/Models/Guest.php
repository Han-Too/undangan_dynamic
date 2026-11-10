<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Guest extends Model
{
    protected $fillable = ['name', 'slug', 'phone'];

    protected function casts(): array
    {
        return [
            'opened_at' => 'datetime',
            'open_count' => 'integer',
        ];
    }

    /** Nomor WA selalu disimpan dalam format wa.me: "0812-345 678" / "+62 812..." -> "62812345678". */
    protected function phone(): Attribute
    {
        return Attribute::make(set: fn ($value) => self::normalizePhone($value));
    }

    public static function normalizePhone(?string $raw): ?string
    {
        $text = trim((string) $raw);
        $digits = preg_replace('/\D/', '', $text);
        if ($digits === '') {
            return null;
        }

        return match (true) {
            str_starts_with($text, '+') => $digits,
            str_starts_with($digits, '00') => substr($digits, 2),
            str_starts_with($digits, '62') => $digits,
            str_starts_with($digits, '0') => '62'.substr($digits, 1),
            str_starts_with($digits, '8') => '62'.$digits,
            default => $digits,
        };
    }

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    public function rsvp(): HasOne
    {
        return $this->hasOne(Rsvp::class);
    }

    /** Slug unik di dalam satu undangan: "Adit & Istri" -> adit-dan-istri, adit-dan-istri-2, ... */
    public static function uniqueSlug(Invitation $invitation, string $name, ?int $ignoreId = null): string
    {
        $base = Invitation::slugify($name) ?: 'tamu';
        $slug = $base;
        $taken = fn ($s) => $invitation->guests()->where('slug', $s)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists();
        for ($i = 2; $taken($slug); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }
}
