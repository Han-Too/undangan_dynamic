<script setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { z } from 'zod';
import { useInvitation } from '../../composables/useInvitation';
import { useRsvp } from '../../composables/useRsvp';
import Icon from '../Icon.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme, guest } = useInvitation();
const { entries, submit } = useRsvp();

const MAX_GUESTS = 6;
const MAX_MESSAGE = 300;

const schema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'Nama wajib diisi' })
      .trim()
      .min(1, 'Nama wajib diisi')
      .min(2, 'Nama minimal 2 huruf')
      .max(80, 'Nama maksimal 80 karakter'),
    attendance: z.enum(['hadir', 'tidak'], { errorMap: () => ({ message: 'Pilih salah satu' }) }),
    guests: z.number().int().min(1, 'Minimal 1 orang').max(MAX_GUESTS, `Maksimal ${MAX_GUESTS} orang`),
    message: z.string().trim().max(MAX_MESSAGE, `Ucapan maksimal ${MAX_MESSAGE} karakter`).optional().default(''),
  }),
);

// Tamu berlink pribadi: nama terisi otomatis, dan RSVP sebelumnya (bila ada) ditampilkan kembali.
const initial = () => {
  const prev = guest.value?.rsvp;
  return prev
    ? { name: prev.name, attendance: prev.attendance, guests: prev.guests || 1, message: prev.message ?? '' }
    : { name: guest.value?.name ?? '', attendance: 'hadir', guests: 1, message: '' };
};

const { defineField, errors, handleSubmit, resetForm, isSubmitting, submitCount } = useForm({
  validationSchema: schema,
  initialValues: initial(),
});
// Error tampil saat field ditinggalkan (blur), lalu ikut diperbarui saat mengetik.
const lazy = (s) => ({ validateOnModelUpdate: s.errors.length > 0 || submitCount.value > 0 });
const [name, nameAttrs] = defineField('name', lazy);
const [attendance] = defineField('attendance');
const [guests] = defineField('guests');
const [message, messageAttrs] = defineField('message', lazy);

watch(guest, () => resetForm({ values: initial() }));

const error = ref('');
const sent = ref(false);
const shaking = ref(false);
/** Getarkan form saat submit gagal; dilepas dulu satu frame agar animasi bisa diulang. */
function shake() {
  shaking.value = false;
  requestAnimationFrame(() => (shaking.value = true));
}

const stepGuests = (d) => (guests.value = Math.min(MAX_GUESTS, Math.max(1, (guests.value || 1) + d)));
const messageLength = computed(() => (message.value || '').length);
const wishes = computed(() => entries.value.filter((e) => e.message).slice(0, 4));

const onSubmit = handleSubmit(
  async (values) => {
    error.value = '';
    try {
      const entry = await submit({ ...values, guests: values.attendance === 'hadir' ? values.guests : 1 });
      if (guest.value) guest.value.rsvp = entry;
      resetForm({ values: initial() });
      sent.value = true;
      setTimeout(() => (sent.value = false), 4000);
    } catch (e) {
      error.value = e.message;
    }
  },
  shake,
);
</script>

<template>
  <h2 class="inv-title">{{ state.content.rsvp.title }}</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />
  <p class="inv-text">{{ state.content.rsvp.text }}</p>

  <form class="inv-form rsvp" :class="{ 'is-shaking': shaking }" novalidate @submit.prevent="onSubmit" @animationend.self="shaking = false">
    <div class="inv-field" :class="{ 'is-invalid': errors.name }">
      <label for="rsvp-name"><span>Nama</span></label>
      <div class="rsvp__control">
        <input
          id="rsvp-name"
          v-model="name"
          v-bind="nameAttrs"
          class="inv-input"
          type="text"
          maxlength="80"
          autocomplete="name"
          placeholder="Nama lengkap"
          :aria-invalid="!!errors.name"
          aria-describedby="rsvp-name-err"
        />
        <Icon v-if="errors.name" class="rsvp__alert" name="x" :size="14" />
      </div>
      <Transition name="rsvp-err">
        <p v-if="errors.name" id="rsvp-name-err" class="rsvp__err" role="alert">{{ errors.name }}</p>
      </Transition>
    </div>

    <div class="inv-field" role="radiogroup" aria-label="Kehadiran">
      <span>Kehadiran</span>
      <div class="inv-choice">
        <label><input v-model="attendance" type="radio" value="hadir" /><span><Icon name="check" :size="14" /> Hadir</span></label>
        <label><input v-model="attendance" type="radio" value="tidak" /><span><Icon name="x" :size="14" /> Tidak Hadir</span></label>
      </div>
    </div>

    <Transition name="rsvp-err">
      <div v-if="attendance === 'hadir'" class="inv-field">
        <span>Jumlah tamu</span>
        <div class="rsvp__stepper">
          <button type="button" class="rsvp__step" aria-label="Kurangi" :disabled="guests <= 1" @click="stepGuests(-1)">−</button>
          <output class="rsvp__count" aria-live="polite"><b>{{ guests }}</b> orang</output>
          <button type="button" class="rsvp__step" aria-label="Tambah" :disabled="guests >= MAX_GUESTS" @click="stepGuests(1)">+</button>
        </div>
      </div>
    </Transition>

    <div class="inv-field" :class="{ 'is-invalid': errors.message }">
      <label for="rsvp-msg" class="rsvp__label-row">
        <span>Ucapan &amp; doa</span>
        <small class="rsvp__counter" :class="{ 'is-over': messageLength > MAX_MESSAGE }">{{ messageLength }}/{{ MAX_MESSAGE }}</small>
      </label>
      <textarea id="rsvp-msg" v-model="message" v-bind="messageAttrs" class="inv-input" placeholder="Tulis ucapan untuk kami…" :aria-invalid="!!errors.message" />
      <Transition name="rsvp-err">
        <p v-if="errors.message" class="rsvp__err" role="alert">{{ errors.message }}</p>
      </Transition>
    </div>

    <p v-if="error" class="rsvp__msg rsvp__msg--error" role="alert"><Icon name="x" :size="15" /> {{ error }}</p>
    <Transition name="rsvp-err">
      <p v-if="sent" class="rsvp__msg rsvp__msg--ok" role="status"><Icon name="check" :size="15" /> Terima kasih, konfirmasi Anda sudah kami terima.</p>
    </Transition>

    <button class="inv-btn" type="submit" :disabled="isSubmitting">
      <span v-if="isSubmitting" class="rsvp__spinner" aria-hidden="true" />
      {{ isSubmitting ? 'Mengirim…' : guest?.rsvp ? 'Perbarui Konfirmasi' : 'Kirim Konfirmasi' }}
    </button>
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
.rsvp { --rsvp-danger: #c0392b; }
.rsvp.is-shaking { animation: rsvp-shake 0.42s ease; }
.rsvp .inv-field > label { display: block; }
.rsvp .inv-field > label > span,
.rsvp__label-row > span {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-muted);
}
.rsvp__label-row { display: flex !important; align-items: baseline; justify-content: space-between; gap: 8px; }
.rsvp__counter { font-size: 0.7rem; color: var(--c-muted); font-variant-numeric: tabular-nums; }
.rsvp__counter.is-over { color: var(--rsvp-danger); }

.rsvp__control { position: relative; }
.rsvp__alert { position: absolute; top: 50%; right: 12px; translate: 0 -50%; color: var(--rsvp-danger); }
.rsvp .is-invalid .inv-input { padding-right: 34px; border-color: var(--rsvp-danger); background: color-mix(in srgb, var(--rsvp-danger) 6%, var(--c-surface)); }
.rsvp .is-invalid .inv-input:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--rsvp-danger) 22%, transparent); }
.rsvp .is-invalid > label > span,
.rsvp .is-invalid .rsvp__label-row > span { color: var(--rsvp-danger); }
.rsvp__err {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--rsvp-danger);
}
.rsvp__err::before { content: ''; width: 5px; height: 5px; flex: none; border-radius: 50%; background: currentColor; }

.rsvp .inv-choice span { display: flex; align-items: center; justify-content: center; gap: 6px; }
.rsvp .inv-choice span .icon { opacity: 0; width: 0; transition: opacity 0.2s, width 0.2s; }
.rsvp .inv-choice input:checked + span .icon { opacity: 1; width: 14px; }

.rsvp__stepper {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--c-primary) 45%, transparent);
  border-radius: calc(var(--radius) * 0.55);
  background: color-mix(in srgb, var(--c-surface) 85%, transparent);
}
.rsvp__step {
  height: 44px;
  font: 400 1.2rem/1 var(--f-body);
  color: var(--c-heading);
  background: none;
  border: 0;
  cursor: pointer;
  transition: background 0.2s;
}
.rsvp__step:hover:not(:disabled) { background: color-mix(in srgb, var(--c-primary) 14%, transparent); }
.rsvp__step:disabled { opacity: 0.3; cursor: default; }
.rsvp__count { text-align: center; font-size: 0.88rem; color: var(--c-text); }
.rsvp__count b { font-size: 1.05rem; color: var(--c-heading); }

.rsvp__msg {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 0.84rem;
  border-radius: calc(var(--radius) * 0.5);
}
.rsvp__msg--ok { color: var(--c-secondary); background: color-mix(in srgb, var(--c-primary) 14%, transparent); }
.rsvp__msg--error { color: var(--rsvp-danger); background: color-mix(in srgb, var(--rsvp-danger) 9%, transparent); }
.rsvp__spinner { width: 13px; height: 13px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: rsvp-spin 0.7s linear infinite; }

.rsvp-err-enter-active, .rsvp-err-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.rsvp-err-enter-from, .rsvp-err-leave-to { opacity: 0; transform: translateY(-4px); }
@keyframes rsvp-shake {
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
@keyframes rsvp-spin { to { rotate: 1turn; } }

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
@media (prefers-reduced-motion: reduce) {
  .rsvp.is-shaking { animation: none; }
}
</style>
