<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Icon from '../components/Icon.vue';
import { useAuth } from '../composables/useAuth';

const { login } = useAuth();
const router = useRouter();
const route = useRoute();

const form = reactive({ email: '', password: '' });
const busy = ref(false);
const error = ref('');

async function onSubmit() {
  error.value = '';
  busy.value = true;
  try {
    await login(form.email, form.password);
    const target = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') ? route.query.redirect : '/admin';
    router.replace(target);
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="login">
    <form class="login__card" @submit.prevent="onSubmit">
      <div class="login__brand">
        <span class="adm__mark"><Icon name="heart" :size="16" /></span>
        <span class="adm__name">Undangan<em>.</em>studio</span>
      </div>
      <div>
        <h1>Masuk ke dashboard</h1>
        <p>Kelola desain undangan, daftar tamu, dan link undangan pribadi.</p>
      </div>

      <label class="field">
        <span class="field__label">Email</span>
        <input v-model.trim="form.email" class="input" type="email" required autocomplete="username" placeholder="admin@undangan.test" />
      </label>
      <label class="field">
        <span class="field__label">Password</span>
        <input v-model="form.password" class="input" type="password" required autocomplete="current-password" />
      </label>

      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      <button class="btn btn--primary btn--block" type="submit" :disabled="busy">{{ busy ? 'Memproses…' : 'Masuk' }}</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: 24px 16px;
  background:
    radial-gradient(circle, #d6d1c4 1px, transparent 1.2px) 0 0 / 22px 22px,
    var(--ui-bg);
}
.login__card {
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 380px;
  padding: 28px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 16px;
  box-shadow: var(--ui-shadow);
}
.login__brand { display: flex; align-items: center; gap: 10px; }
h1 { margin: 6px 0 4px; font-size: 20px; letter-spacing: -0.01em; }
p { margin: 0; color: var(--ui-muted); font-size: 13px; }
.btn--block { min-height: 42px; }
</style>
