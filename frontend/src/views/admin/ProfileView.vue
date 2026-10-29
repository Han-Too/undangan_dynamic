<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from '@lucide/vue';
import PageHeader from '@/components/admin/PageHeader.vue';
import { fmtDate, initialsOf } from '@/components/admin/format';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/composables/useAuth';
import { api } from '@/services/api';

const { user, isAdmin } = useAuth();

/* Ringkasan undangan milik akun ini (admin menerima semua undangan, jadi difilter per pemilik). */
const stats = ref(null);
onMounted(async () => {
  try {
    const list = (await api.get('/invitations')).filter((i) => i.user_id === user.value?.id);
    stats.value = [
      { label: 'Undangan', value: list.length },
      { label: 'Tamu', value: list.reduce((n, i) => n + (i.guests_count ?? 0), 0) },
      { label: 'Hadir', value: list.reduce((n, i) => n + (i.attending_count ?? 0), 0) },
    ];
  } catch {
    stats.value = null;
  }
});

/* ── Informasi akun ─────────────────────────────────────────── */
const info = reactive({ name: user.value?.name ?? '', email: user.value?.email ?? '' });
const infoBusy = ref(false);
const infoError = ref('');
const infoDirty = computed(() => info.name !== user.value?.name || info.email !== user.value?.email);

function resetInfo() {
  Object.assign(info, { name: user.value?.name ?? '', email: user.value?.email ?? '' });
  infoError.value = '';
}

async function saveInfo() {
  infoBusy.value = true;
  infoError.value = '';
  try {
    user.value = await api.put('/auth/profile', { name: info.name, email: info.email });
    resetInfo();
    toast.success('Informasi akun disimpan');
  } catch (e) {
    infoError.value = e.message;
  } finally {
    infoBusy.value = false;
  }
}

/* ── Ganti password ─────────────────────────────────────────── */
const pw = reactive({ current_password: '', password: '', password_confirmation: '' });
const pwBusy = ref(false);
const pwError = ref('');
const showPw = ref(false);
const rules = computed(() => [
  { ok: pw.password.length >= 6, label: 'Minimal 6 karakter' },
  { ok: pw.password !== '' && pw.password === pw.password_confirmation, label: 'Kedua password baru sama' },
]);
const pwReady = computed(() => pw.current_password && rules.value.every((r) => r.ok));

async function savePassword() {
  pwBusy.value = true;
  pwError.value = '';
  try {
    user.value = await api.put('/auth/profile', { name: user.value.name, email: user.value.email, ...pw });
    Object.assign(pw, { current_password: '', password: '', password_confirmation: '' });
    showPw.value = false;
    toast.success('Password diganti');
  } catch (e) {
    pwError.value = e.message;
  } finally {
    pwBusy.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <PageHeader title="Profil" description="Kelola informasi akun dan password login Anda." />

    <div class="grid gap-6">
      <Card class="py-5">
        <CardContent class="flex flex-wrap items-center gap-4 px-5">
          <Avatar class="size-14">
            <AvatarFallback class="text-lg font-medium">{{ initialsOf(user?.name) }}</AvatarFallback>
          </Avatar>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <p class="truncate text-base font-semibold">{{ user?.name }}</p>
              <Badge :variant="isAdmin ? 'default' : 'outline'">{{ isAdmin ? 'Admin' : 'User' }}</Badge>
            </div>
            <p class="text-muted-foreground truncate text-sm">{{ user?.email }}</p>
            <p class="text-muted-foreground mt-0.5 text-xs">Bergabung {{ fmtDate(user?.created_at, { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
          </div>
          <dl v-if="stats" class="flex divide-x rounded-lg border">
            <div v-for="s in stats" :key="s.label" class="px-4 py-2 text-center">
              <dt class="text-muted-foreground text-xs">{{ s.label }}</dt>
              <dd class="text-lg font-semibold tabular-nums">{{ s.value }}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card class="pb-4">
        <form class="contents" @submit.prevent="saveInfo">
          <CardHeader>
            <CardTitle>Informasi akun</CardTitle>
            <CardDescription>Nama tampil di dashboard. Email dipakai untuk login.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-2">
              <Label for="p-name">Nama lengkap</Label>
              <Input id="p-name" v-model="info.name" required maxlength="255" autocomplete="name" />
            </div>
            <div class="grid gap-2">
              <Label for="p-email">Email</Label>
              <Input id="p-email" v-model.trim="info.email" type="email" required autocomplete="email" />
            </div>
            <p v-if="infoError" class="text-destructive text-sm sm:col-span-2" role="alert">{{ infoError }}</p>
          </CardContent>
          <CardFooter class="justify-end gap-2 border-t [.border-t]:pt-4">
            <Button v-if="infoDirty" type="button" variant="ghost" @click="resetInfo">Batalkan</Button>
            <Button type="submit" :disabled="!infoDirty || infoBusy">{{ infoBusy ? 'Menyimpan…' : 'Simpan perubahan' }}</Button>
          </CardFooter>
        </form>
      </Card>

      <Card class="pb-4">
        <form class="contents" @submit.prevent="savePassword">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Ganti password secara berkala, terutama untuk akun awal bawaan.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <div class="flex items-center justify-between">
                <Label for="p-current">Password sekarang</Label>
                <Button type="button" variant="ghost" size="xs" class="text-muted-foreground" :aria-pressed="showPw" @click="showPw = !showPw">
                  <component :is="showPw ? EyeOffIcon : EyeIcon" /> {{ showPw ? 'Sembunyikan' : 'Tampilkan' }}
                </Button>
              </div>
              <Input id="p-current" v-model="pw.current_password" :type="showPw ? 'text' : 'password'" required autocomplete="current-password" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="grid gap-2">
                <Label for="p-new">Password baru</Label>
                <Input id="p-new" v-model="pw.password" :type="showPw ? 'text' : 'password'" required minlength="6" autocomplete="new-password" />
              </div>
              <div class="grid gap-2">
                <Label for="p-confirm">Ulangi password baru</Label>
                <Input id="p-confirm" v-model="pw.password_confirmation" :type="showPw ? 'text' : 'password'" required autocomplete="new-password" />
              </div>
            </div>
            <ul class="flex flex-wrap gap-x-5 gap-y-1 text-xs" aria-live="polite">
              <li v-for="r in rules" :key="r.label" class="flex items-center gap-1.5" :class="r.ok ? 'text-emerald-600' : 'text-muted-foreground'">
                <component :is="r.ok ? CheckIcon : XIcon" class="size-3.5" /> {{ r.label }}
              </li>
            </ul>
            <p v-if="pwError" class="text-destructive text-sm" role="alert">{{ pwError }}</p>
          </CardContent>
          <CardFooter class="justify-end border-t [.border-t]:pt-4">
            <Button type="submit" :disabled="!pwReady || pwBusy">{{ pwBusy ? 'Mengganti…' : 'Ganti password' }}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
</template>
