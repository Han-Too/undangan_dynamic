/**
 * Musik placeholder: arpeggio piano-ish lembut, disintesis langsung di browser sebagai WAV
 * sehingga project tidak butuh file audio. Dibuat sekali lalu di-cache sebagai object URL.
 * Buffer bersifat melingkar (tail membungkus ke awal) agar loop terdengar mulus.
 */
const SAMPLE_RATE = 22050;
const BAR = 4; // detik per akor
const CHORDS = [
  [57, 60, 64, 69], // Am
  [53, 57, 60, 65], // F
  [48, 55, 60, 64], // C
  [55, 59, 62, 67], // G
];
const PATTERN = [0, 1, 2, 3, 2, 1, 2, 1];

const midiToHz = (m) => 440 * 2 ** ((m - 69) / 12);

function synth() {
  const length = SAMPLE_RATE * BAR * CHORDS.length;
  const buf = new Float32Array(length);
  const step = BAR / PATTERN.length;

  const addTone = (start, freq, dur, amp) => {
    const n = Math.floor(dur * SAMPLE_RATE);
    const s0 = Math.floor(start * SAMPLE_RATE);
    for (let i = 0; i < n; i++) {
      const t = i / SAMPLE_RATE;
      const attack = Math.min(1, t / 0.012);
      const env = attack * Math.exp(-t * 2.4);
      const v = Math.sin(2 * Math.PI * freq * t) + 0.28 * Math.sin(4 * Math.PI * freq * t) * Math.exp(-t * 4);
      buf[(s0 + i) % length] += v * env * amp;
    }
  };

  CHORDS.forEach((chord, ci) => {
    const barStart = ci * BAR;
    PATTERN.forEach((p, ni) => addTone(barStart + ni * step, midiToHz(chord[p] + 12), 2.2, 0.2));
    // pad lembut di bass
    addTone(barStart, midiToHz(chord[0] - 12), BAR + 1, 0.16);
    addTone(barStart, midiToHz(chord[0]), BAR + 0.5, 0.08);
  });

  // gema sederhana (feedback delay melingkar)
  const delay = Math.floor(0.36 * SAMPLE_RATE);
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < length; i++) buf[i] += 0.32 * buf[(i - delay + length) % length];
  }

  let peak = 0;
  for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(buf[i]));
  const gain = peak ? 0.8 / peak : 1;

  const pcm = new DataView(new ArrayBuffer(44 + length * 2));
  const w = (o, s) => [...s].forEach((c, i) => pcm.setUint8(o + i, c.charCodeAt(0)));
  w(0, 'RIFF');
  pcm.setUint32(4, 36 + length * 2, true);
  w(8, 'WAVEfmt ');
  pcm.setUint32(16, 16, true);
  pcm.setUint16(20, 1, true);
  pcm.setUint16(22, 1, true);
  pcm.setUint32(24, SAMPLE_RATE, true);
  pcm.setUint32(28, SAMPLE_RATE * 2, true);
  pcm.setUint16(32, 2, true);
  pcm.setUint16(34, 16, true);
  w(36, 'data');
  pcm.setUint32(40, length * 2, true);
  for (let i = 0; i < length; i++) pcm.setInt16(44 + i * 2, Math.max(-1, Math.min(1, buf[i] * gain)) * 32767, true);
  return new Blob([pcm], { type: 'audio/wav' });
}

let cached = '';
export function getDefaultMusicUrl() {
  if (!cached) cached = URL.createObjectURL(synth());
  return cached;
}
