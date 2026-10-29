<?php

namespace App\Models;

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
