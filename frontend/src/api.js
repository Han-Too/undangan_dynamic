const API_URL = import.meta.env.VITE_API_URL;

export async function getUndangan() {
  const res = await fetch(`${API_URL}/undangan`);
  if (!res.ok) throw new Error('Gagal mengambil data');
  return res.json();
}