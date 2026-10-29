<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HeartIcon, Loader2Icon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/composables/useAuth';

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
  <div class="ui-admin bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <div class="flex items-center gap-2 self-center font-medium">
        <span class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"><HeartIcon class="size-3.5" /></span>
        Undangan Studio
      </div>

      <Card>
        <CardHeader class="text-center">
          <CardTitle class="text-xl">Masuk ke dashboard</CardTitle>
          <CardDescription>Kelola desain undangan, daftar tamu, dan link pribadi.</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-5" @submit.prevent="onSubmit">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model.trim="form.email" type="email" required autocomplete="username" placeholder="nama@email.com" />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" v-model="form.password" type="password" required autocomplete="current-password" />
            </div>
            <p v-if="error" class="border-destructive/30 bg-destructive/5 text-destructive rounded-md border px-3 py-2 text-sm" role="alert">{{ error }}</p>
            <Button type="submit" class="w-full" :disabled="busy">
              <Loader2Icon v-if="busy" class="animate-spin" /> {{ busy ? 'Memproses…' : 'Masuk' }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p class="text-muted-foreground text-center text-xs">Akun dibuat oleh admin. Lupa password? Hubungi admin Anda.</p>
    </div>
  </div>
</template>
