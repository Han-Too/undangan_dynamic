<script setup>
import { reactive, ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';
import { api } from '../../services/api';

const { user } = useAuth();
const { push } = useToast();

const form = reactive({
  name: user.value?.name ?? '',
  email: user.value?.email ?? '',
  current_password: '',
  password: '',
  password_confirmation: '',
});
const busy = ref(false);
const error = ref('');

async function onSubmit() {
  busy.value = true;
  error.value = '';
  try {
    const body = { name: form.name, email: form.email };
    if (form.password) Object.assign(body, { current_password: form.current_password, password: form.password, password_confirmation: form.password_confirmation });
    user.value = await api.put('/auth/profile', body);
    Object.assign(form, { current_password: '', password: '', password_confirmation: '' });
    push('Profil disimpan', 'success');
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>Profil</h1>
        <p>Ubah nama, email, atau password akun Anda.</p>
      </div>
    </div>

    <form class="card card--pad form-grid profile" @submit.prevent="onSubmit">
      <label class="field">
        <span class="field__label">Nama</span>
        <input v-model="form.name" class="input" required maxlength="255" />
      </label>
      <label class="field">
        <span class="field__label">Email</span>
        <input v-model.trim="form.email" class="input" type="email" required />
      </label>

      <hr class="divider-line" />
      <strong>Ganti password <small class="field__hint">(opsional)</small></strong>
      <label class="field">
        <span class="field__label">Password sekarang</span>
        <input v-model="form.current_password" class="input" type="password" :required="!!form.password" autocomplete="current-password" />
      </label>
      <div class="row">
        <label class="field">
          <span class="field__label">Password baru</span>
          <input v-model="form.password" class="input" type="password" minlength="6" autocomplete="new-password" />
        </label>
        <label class="field">
          <span class="field__label">Ulangi password baru</span>
          <input v-model="form.password_confirmation" class="input" type="password" :required="!!form.password" autocomplete="new-password" />
        </label>
      </div>

      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan profil' }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.profile { max-width: 560px; }
@media (max-width: 560px) {
  .row { grid-template-columns: 1fr; }
}
</style>
