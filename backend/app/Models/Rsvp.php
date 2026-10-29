<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rsvp extends Model
{
    protected $fillable = ['guest_id', 'name', 'attendance', 'guests', 'message'];

    protected function casts(): array
    {
        return ['guests' => 'integer'];
    }

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    public function guest(): BelongsTo
    {
        return $this->belongsTo(Guest::class);
    }

    /** Aturan validasi formulir RSVP (dipakai endpoint publik dan dashboard). */
    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:80'],
            'attendance' => ['required', 'in:hadir,tidak'],
            'guests' => ['nullable', 'integer', 'min:1', 'max:20'],
            'message' => ['nullable', 'string', 'max:300'],
        ];
    }

    public static function normalize(array $data): array
    {
        return [
            'name' => trim($data['name']),
            'attendance' => $data['attendance'],
            'guests' => $data['attendance'] === 'hadir' ? max(1, (int) ($data['guests'] ?? 1)) : 0,
            'message' => trim((string) ($data['message'] ?? '')),
        ];
    }

    /** Bentuk data yang dikirim ke frontend (sama dengan bentuk entri RSVP di Vue). */
    public function toEntry(): array
    {
        return [
            'id' => $this->id,
            'guestId' => $this->guest_id,
            'name' => $this->name,
            'attendance' => $this->attendance,
            'guests' => $this->guests,
            'message' => $this->message ?? '',
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
