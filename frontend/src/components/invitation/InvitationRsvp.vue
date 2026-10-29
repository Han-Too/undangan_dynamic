<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useInvitation } from '../../composables/useInvitation';
import { useRsvp } from '../../composables/useRsvp';
import Icon from '../Icon.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme, guest } = useInvitation();
const { entries, submit } = useRsvp();

// Tamu berlink pribadi: nama terisi otomatis, dan RSVP sebelumnya (bila ada) ditampilkan kembali.
const blank = () => {
  const prev = guest.value?.rsvp;
  return prev
    ? { name: prev.name, attendance: prev.attendance, guests: prev.guests || 1, message: prev.message }
    : { name: guest.value?.name ?? '', attendance: 'hadir', guests: 1, message: '' };
};
const form = reactive(blank());
watch(guest, () => Object.assign(form, blank()));
const busy = ref(false);
const error = ref('');
const sent = ref(false);

const wishes = computed(() => entries.value.filter((e) => e.message).slice(0, 4));

async function onSubmit() {
  error.value = '';
  busy.value = true;
  try {
    const entry = await submit({ ...form });
    if (guest.value) guest.value.rsvp = entry;
    Object.assign(form, blank());
    sent.value = true;
    setTimeout(() => (sent.value = false), 4000);
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <h2 class="inv-title">{{ state.content.rsvp.title }}</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <p class="inv-text">{{ state.content.rsvp.text }}</p>

  <form class="inv-form" @submit.prevent="onSubmit">
    <label class="inv-field">
      <span>Nama</span>
      <input v-model="form.name" class="inv-input" type="text" required maxlength="80" autocomplete="name" placeholder="Nama lengkap" />
    </label>

    <div class="inv-field">
      <span>Kehadiran</span>
      <div class="inv-choice">
        <label><input v-model="form.attendance" type="radio" value="hadir" /><span>Hadir</span></label>
        <label><input v-model="form.attendance" type="radio" value="tidak" /><span>Tidak Hadir</span></label>
      </div>
    </div>

    <label v-if="form.attendance === 'hadir'" class="inv-field">
      <span>Jumlah tamu</span>
      <select v-model.number="form.guests" class="inv-input">
        <option v-for="n in 6" :key="n" :value="n">{{ n }} orang</option>
      </select>
    </label>

    <label class="inv-field">
      <span>Ucapan &amp; doa</span>
      <textarea v-model="form.message" class="inv-input" maxlength="300" placeholder="Tulis ucapan untuk kami…" />
    </label>

    <p v-if="error" class="rsvp__msg rsvp__msg--error" role="alert">{{ error }}</p>
    <p v-if="sent" class="rsvp__msg" role="status"><Icon name="check" :size="15" /> Terima kasih, konfirmasi Anda sudah kami terima.</p>

    <button class="inv-btn" type="submit" :disabled="busy">{{ guest?.rsvp ? 'Perbarui Konfirmasi' : 'Kirim Konfirmasi' }}</button>
  </form>

  <div v-if="wishes.length" class="rsvp__wishes">
    <p class="inv-eyebrow">Ucapan</p>
    <blockquote v-for="w in wishes" :key="w.id" class="rsvp__wish">
      <p>{{ w.message }}</p>
      <cite>{{ w.name }}</cite>
    </blockquote>
  </div>
</template>

<style>
.rsvp__msg {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: var(--c-secondary);
}
.rsvp__msg--error { color: #c0392b; }
.inv-root .inv-form .inv-btn { justify-self: center; margin-top: 4px; }
.rsvp__wishes { width: 100%; display: grid; gap: 12px; margin-top: 10px; }
.rsvp__wish {
  margin: 0;
  padding: 12px 14px;
  text-align: left;
  border-left: 2px solid var(--c-primary);
  background: color-mix(in srgb, var(--c-surface) 70%, transparent);
  border-radius: 0 calc(var(--radius) * 0.5) calc(var(--radius) * 0.5) 0;
}
.rsvp__wish p { margin: 0 0 4px; font-size: 0.88rem; color: var(--c-text); overflow-wrap: anywhere; }
.rsvp__wish cite { font-size: 0.74rem; font-style: normal; letter-spacing: 0.08em; color: var(--c-primary); }
</style>
