<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import {
  CopyIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  MailIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
  UsersIcon,
} from '@lucide/vue';
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue';
import PageHeader from '@/components/admin/PageHeader.vue';
import StatCards from '@/components/admin/StatCards.vue';
import { fmtDate } from '@/components/admin/format';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/composables/useAuth';
import { api } from '@/services/api';
import { copyText } from '@/utils/clipboard';
import { invitationUrl } from '@/utils/links';
import InvitationFormModal from './InvitationFormModal.vue';

const { isAdmin } = useAuth();
const router = useRouter();

const items = ref([]);
const loading = ref(true);
const query = ref('');
const formOpen = ref(false);
const editingItem = ref(null);
const deleting = ref(null);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items.value;
  return items.value.filter((i) => [i.title, i.slug, i.user?.name].some((v) => v?.toLowerCase().includes(q)));
});

const stats = computed(() => {
  const sum = (key) => items.value.reduce((s, i) => s + (i[key] ?? 0), 0);
  return [
    { label: 'Undangan', value: items.value.length, hint: `${items.value.filter((i) => i.is_published).length} sudah terbit` },
    { label: 'Tamu terdaftar', value: sum('guests_count') },
    { label: 'RSVP masuk', value: sum('rsvps_count') },
    { label: 'Konfirmasi hadir', value: sum('attending_count') },
  ];
});

async function load() {
  loading.value = true;
  try {
    items.value = await api.get('/invitations');
  } catch (e) {
    toast.error(e.message);
  } finally {
    loading.value = false;
  }
}
onMounted(load);

function openCreate() {
  editingItem.value = null;
  formOpen.value = true;
}
function openEdit(item) {
  editingItem.value = item;
  formOpen.value = true;
}

function onSaved(saved) {
  const isNew = !editingItem.value;
  formOpen.value = false;
  if (isNew) {
    toast.success('Undangan dibuat', { description: 'Silakan atur desainnya.' });
    router.push(`/admin/invitations/${saved.id}/edit`);
    return;
  }
  toast.success('Pengaturan disimpan');
  load();
}

async function confirmDelete() {
  const item = deleting.value;
  deleting.value = null;
  try {
    await api.delete(`/invitations/${item.id}`);
    items.value = items.value.filter((i) => i.id !== item.id);
    toast.success('Undangan dihapus');
  } catch (e) {
    toast.error(e.message);
  }
}

async function copyLink(item) {
  const ok = await copyText(invitationUrl(item.slug));
  ok ? toast.success('Link umum disalin') : toast.error('Gagal menyalin link');
}
</script>

<template>
  <div>
    <PageHeader title="Undangan" :description="isAdmin ? 'Semua undangan dari seluruh pengguna.' : 'Undangan milik Anda.'">
      <template #actions>
        <Button @click="openCreate"><PlusIcon /> Undangan baru</Button>
      </template>
    </PageHeader>

    <StatCards :items="stats" />

    <Card class="gap-0 overflow-hidden py-0">
      <div class="flex items-center gap-2 border-b p-3">
        <div class="relative w-full max-w-xs">
          <SearchIcon class="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input v-model="query" type="search" placeholder="Cari undangan…" aria-label="Cari undangan" class="h-8 pl-8" />
        </div>
      </div>

      <div v-if="loading" class="space-y-3 p-4">
        <Skeleton v-for="n in 3" :key="n" class="h-10 w-full" />
      </div>

      <div v-else-if="!items.length" class="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <div class="bg-muted flex size-12 items-center justify-center rounded-full"><MailIcon class="text-muted-foreground size-5" /></div>
        <div class="space-y-1">
          <p class="font-medium">Belum ada undangan</p>
          <p class="text-muted-foreground max-w-sm text-sm">Buat undangan pertama, atur desainnya, lalu tambahkan tamu untuk mendapat link pribadi.</p>
        </div>
        <Button size="sm" @click="openCreate"><PlusIcon /> Undangan baru</Button>
      </div>

      <Table v-else>
        <TableHeader class="bg-muted/50">
          <TableRow>
            <TableHead class="pl-4">Undangan</TableHead>
            <TableHead v-if="isAdmin" class="hidden md:table-cell">Pemilik</TableHead>
            <TableHead class="hidden sm:table-cell">Status</TableHead>
            <TableHead class="text-right">Tamu</TableHead>
            <TableHead class="hidden text-right sm:table-cell">RSVP</TableHead>
            <TableHead class="hidden lg:table-cell">Diubah</TableHead>
            <TableHead class="pr-4"><span class="sr-only">Aksi</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in filtered" :key="item.id">
            <TableCell class="pl-4">
              <RouterLink :to="`/admin/invitations/${item.id}/guests`" class="font-medium hover:underline">{{ item.title }}</RouterLink>
              <div class="text-muted-foreground font-mono text-xs">/{{ item.slug }}</div>
            </TableCell>
            <TableCell v-if="isAdmin" class="text-muted-foreground hidden md:table-cell">{{ item.user?.name }}</TableCell>
            <TableCell class="hidden sm:table-cell">
              <Badge variant="outline" class="text-muted-foreground gap-1.5 px-1.5">
                <span class="size-1.5 rounded-full" :class="item.is_published ? 'bg-emerald-500' : 'bg-amber-500'" />
                {{ item.is_published ? 'Terbit' : 'Draft' }}
              </Badge>
            </TableCell>
            <TableCell class="text-right tabular-nums">{{ item.guests_count }}</TableCell>
            <TableCell class="hidden text-right tabular-nums sm:table-cell">
              {{ item.rsvps_count }} <span class="text-muted-foreground">· {{ item.attending_count }} hadir</span>
            </TableCell>
            <TableCell class="text-muted-foreground hidden lg:table-cell">{{ fmtDate(item.updated_at) }}</TableCell>
            <TableCell class="pr-4">
              <div class="flex items-center justify-end gap-1">
                <Button variant="outline" size="sm" as-child class="hidden md:inline-flex">
                  <RouterLink :to="`/admin/invitations/${item.id}/edit`"><PaletteIcon /> Desain</RouterLink>
                </Button>
                <Button variant="outline" size="sm" as-child>
                  <RouterLink :to="`/admin/invitations/${item.id}/guests`"><UsersIcon /> Tamu</RouterLink>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon-sm" class="text-muted-foreground" aria-label="Aksi lainnya"><EllipsisVerticalIcon /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuItem as-child class="md:hidden">
                      <RouterLink :to="`/admin/invitations/${item.id}/edit`"><PaletteIcon /> Edit desain</RouterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem @select="copyLink(item)"><CopyIcon /> Salin link umum</DropdownMenuItem>
                    <DropdownMenuItem as-child>
                      <a :href="`/${item.slug}`" target="_blank" rel="noopener"><ExternalLinkIcon /> Lihat undangan</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem @select="openEdit(item)"><SettingsIcon /> Pengaturan</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" @select="deleting = item"><Trash2Icon /> Hapus</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="!filtered.length">
            <TableCell :colspan="7" class="text-muted-foreground h-24 text-center">Tidak ada undangan yang cocok dengan “{{ query }}”.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <InvitationFormModal :open="formOpen" :invitation="editingItem" @close="formOpen = false" @saved="onSaved" />
    <ConfirmDialog
      :open="!!deleting"
      title="Hapus undangan?"
      :description="`“${deleting?.title}” beserta semua tamu, RSVP, foto, dan musiknya akan dihapus permanen.`"
      @confirm="confirmDelete"
      @cancel="deleting = null"
    />
  </div>
</template>
