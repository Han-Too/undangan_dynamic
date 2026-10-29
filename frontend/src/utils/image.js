const MAX_FILE_MB = 15;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('File gambar tidak dapat dibaca.'));
    };
    img.src = url;
  });
}

/**
 * Baca file gambar, perkecil (sisi terpanjang <= maxSize) dan kompres ke JPEG
 * agar unggahan ke server ringan dan undangan cepat dibuka tamu.
 */
export async function compressImage(file, { maxSize = 1600, quality = 0.85 } = {}) {
  if (!file || !file.type.startsWith('image/')) throw new Error('Pilih file gambar (JPG, PNG, WEBP).');
  if (file.size > MAX_FILE_MB * 1024 * 1024) throw new Error(`Ukuran gambar maksimal ${MAX_FILE_MB} MB.`);

  const img = await loadImage(file);
  const ratio = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * ratio);
  canvas.height = Math.round(img.naturalHeight * ratio);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  if (!blob) throw new Error('Gagal memproses gambar.');
  return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
}
