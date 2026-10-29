<script setup>
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';
import { EllipsisVerticalIcon, PencilIcon, PlusIcon, Trash2Icon } from '@lucide/vue';
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue';
import PageHeader from '@/components/admin/PageHeader.vue';
import { fmtDate, initialsOf } from '@/components/admin/format';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/composables/useAuth';
import { api } from '@/services/api';

/** Manajemen akun (khusus admin): tambah user, ubah role, nonaktifkan, hapus. */
const { user: me } = useAuth();

const users = ref([]);
const loading = ref(true);
const editing = ref(null); // {} = baru, objek user = edit
const form = reactive({ name: '', email: '', password: '', role: 'user', is_active: true });
const error = ref('');
const busy = ref(false);
const deleting = ref(null);

async function load() {
  loading.value = true;
  try {
    users.value = await api.get('/users');
  } catch (e) {
    toast.error(e.message);
  } finally {
    loading.value = false;
  }
}
onMounted(load);

function open(u = {}) {
  editing.value = u;
  error.value = '';
  Object.assign(form, { name: u.name ?? '', email: u.email ?? '', password: '', role: u.role ?? 'user', is_active: u.is_active ?? true });
}

async function onSubmit() {
  busy.value = true;
  error.value = '';
  try {
    const body = { ...form, password: form.password || undefined };
    if (editing.value.id) {
      const updated = await api.put(`/users/${editing.value.id}`, body);
      users.value = users.value.map((u) => (u.id === updated.id ? updated : u));
    } else {
      users.value = [...users.value, await api.post('/users', body)];
    }
    toast.success('Pengguna disimpan');
    editing.value = null;
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}

async function onDelete() {
  const u = deleting.value;
  deleting.value = null;
  try {
    await api.delete(`/users/${u.id}`);
    users.value = users.value.filter((x) => x.id !== u.id);
    toast.success('Pengguna dihapus');
  } catch (e) {
    toast.error(e.message);
  }
}
</script>

<template>
  <div>
    <PageHeader title="Pengguna" description="Admin mengelola semua undangan. User biasa hanya melihat dan mengatur undangan miliknya.">
      <template #actions>
        <Button @click="open()"><PlusIcon /> Pengguna baru</Button>
      </template>
    </PageHeader>

    <Card class="gap-0 overflow-hidden py-0">
      <div v-if="loading" class="space-y-3 p-4">
        <Skeleton v-for="n in 3" :key="n" class="h-10 w-full" />
      </div>
      <Table v-else>
        <TableHeader class="bg-muted/50">
          <TableRow>
            <TableHead class="pl-4">Nama</TableHead>
            <TableHead>Role</TableHead>
            <TableHead class="hidden sm:table-cell">Status</TableHead>
            <TableHead class="hidden text-right sm:table-cell">Undangan</TableHead>
            <TableHead class="hidden lg:table-cell">Dibuat</TableHead>
            <TableHead class="pr-4"><span class="sr-only">Aksi</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="u in users" :key="u.id">
            <TableCell class="pl-4">
              <div class="flex items-center gap-3">
                <Avatar class="size-8"><AvatarFallback class="text-xs">{{ initialsOf(u.name) }}</AvatarFallback></Avatar>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 font-medium">
                    {{ u.name }}<Badge v-if="u.id === me?.id" variant="secondary" class="px-1.5 py-0 text-[10px]">Anda</Badge>
                  </div>
                  <div class="text-muted-foreground text-xs">{{ u.email }}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge :variant="u.role === 'admin' ? 'default' : 'outline'">{{ u.role === 'admin' ? 'Admin' : 'User' }}</Badge>
            </TableCell>
            <TableCell class="hidden sm:table-cell">
              <Badge variant="outline" class="text-muted-foreground gap-1.5 px-1.5">
                <span class="size-1.5 rounded-full" :class="u.is_active ? 'bg-emerald-500' : 'bg-zinc-400'" />
                {{ u.is_active ? 'Aktif' : 'Nonaktif' }}
              </Badge>
            </TableCell>
            <TableCell class="hidden text-right tabular-nums sm:table-cell">{{ u.invitations_count }}</TableCell>
            <TableCell class="text-muted-foreground hidden lg:table-cell">{{ fmtDate(u.created_at) }}</TableCell>
            <TableCell class="pr-4 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon-sm" class="text-muted-foreground" aria-label="Aksi"><EllipsisVerticalIcon /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-40">
                  <DropdownMenuItem @select="open(u)"><PencilIcon /> Edit</DropdownMenuItem>
                  <template v-if="u.id !== me?.id">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" @select="deleting = u"><Trash2Icon /> Hapus</DropdownMenuItem>
                  </template>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <Dialog :open="!!editing" @update:open="(v) => !v && (editing = null)">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ editing?.id ? 'Edit pengguna' : 'Pengguna baru' }}</DialogTitle>
          <DialogDescription>{{ editing?.id ? 'Kosongkan password bila tidak ingin menggantinya.' : 'Akun baru bisa langsung login dengan email dan password ini.' }}</DialogDescription>
        </DialogHeader>
        <form id="user-form" class="grid gap-4" @submit.prevent="onSubmit">
          <div class="grid gap-2">
            <Label for="u-name">Nama</Label>
            <Input id="u-name" v-model="form.name" required maxlength="255" />
          </div>
          <div class="grid gap-2">
            <Label for="u-email">Email</Label>
            <Input id="u-email" v-model.trim="form.email" type="email" required autocomplete="off" />
          </div>
          <div class="grid gap-2">
            <Label for="u-password">Password</Label>
            <Input
              id="u-password"
              v-model="form.password"
              type="password"
              :required="!editing?.id"
              minlength="6"
              autocomplete="new-password"
              :placeholder="editing?.id ? 'Tidak diganti' : 'Minimal 6 karakter'"
            />
          </div>
          <template v-if="editing?.id !== me?.id">
            <div class="grid gap-2">
              <Label>Role</Label>
              <Select v-model="form.role">
                <SelectTrigger class="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User · kelola undangan sendiri</SelectItem>
                  <SelectItem value="admin">Admin · kelola semua undangan & pengguna</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex items-start justify-between gap-4 rounded-lg border p-3">
              <div class="space-y-0.5">
                <Label for="u-active">Akun aktif</Label>
                <p class="text-muted-foreground text-xs">Akun nonaktif tidak bisa login dan sesinya langsung diputus.</p>
              </div>
              <Switch id="u-active" v-model="form.is_active" />
            </div>
          </template>
          <p v-if="error" class="text-destructive text-sm" role="alert">{{ error }}</p>
        </form>
        <DialogFooter>
          <Button variant="outline" @click="editing = null">Batal</Button>
          <Button type="submit" form="user-form" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan' }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <ConfirmDialog
      :open="!!deleting"
      title="Hapus pengguna?"
      :description="`${deleting?.name} beserta ${deleting?.invitations_count ?? 0} undangan miliknya akan dihapus permanen.`"
      @confirm="onDelete"
      @cancel="deleting = null"
    />
  </div>
</template>
