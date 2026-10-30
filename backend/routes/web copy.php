<?php

use Illuminate\Support\Facades\Route;

/*
 * Mode produksi: hasil `npm run build` frontend ada di public/spa.
 * Semua URL selain /api dan /storage dilayani oleh SPA Vue (vue-router yang menentukan halamannya).
 * Saat development, buka frontend lewat Vite (http://localhost:5173), bukan lewat sini.
 */
Route::get('/{any?}', function () {
    $index = public_path('spa/index.html');
    if (! file_exists($index)) {
        return response('Frontend belum di-build. Jalankan `npm run build` di folder frontend, atau buka http://localhost:5173 saat development.', 404);
    }

    return response()->file($index, ['Cache-Control' => 'no-cache']);
})->where('any', '^(?!api/|storage/|up$).*');
