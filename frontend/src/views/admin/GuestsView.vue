<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { toast } from 'vue-sonner';
import {
  ArrowLeftIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  LinkIcon,
  MessageSquareTextIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  Trash2Icon,
  TriangleAlertIcon,
  UsersIcon,
} from '@lucide/vue';
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue';
import GuestStatus from '@/components/admin/GuestStatus.vue';
import PageHeader from '@/components/admin/PageHeader.vue';
import StatCards from '@/components/admin/StatCards.vue';
import { pageCrumb } from '@/components/admin/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/services/api';
import { copyText } from '@/utils/clipboard';
import { DEFAULT_SHARE_TEMPLATE, fillTemplate, invitationUrl, whatsappUrl } from '@/utils/links';

const route = useRoute();
const id = computed(() => route.params.id);

const invitation = ref(null);
const guests = ref([]);
const loading = ref(true);
const query = ref('');

// ── tambah tamu ─────────────────────────────────────────────
const addMode = ref('single'); // 'single' | 'bulk'
const single = reactive({ name: '', phone: '' });
const bulk = ref('');
const adding = ref(false);

// ── template pesan (disimpan per browser, per undangan) ─────
const templateKey = computed(() => `undangan-online:share-template:${id.value}`);
const template = ref(DEFAULT_SHARE_TEMPLATE);
const templateOpen = ref(false);
watch(template, (v) => {
  try {
    localStorage.setItem(templateKey.value, v);
  } catch {
    /* diabaikan */
  }
});

// ── edit / hapus ────────────────────────────────────────────
const editing = ref(null);
const editForm = reactive({ name: '', phone: '', slug: '' });
const deleting = ref(null);

const linkOf = (g) => invitationUrl(invitation.value.slug, g.slug);
const messageOf = (g) => fillTemplate(template.value, { name: g.name, link: linkOf(g) });

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return guests.value;
  return guests.value.filter((g) => g.name.toLowerCase().includes(q) || g.slug.includes(q) || g.phone?.includes(q));
});

const stats = computed(() => {
  const list = guests.value;
  const rsvp = list.filter((g) => g.rsvp);
  const opened = list.filter((g) => g.open_count > 0).length;
  const attending = rsvp.filter((g) => g.rsvp.attendance === 'hadir');
  return [
    { label: 'Tamu', value: list.length },
    { label: 'Sudah membuka', value: opened, hint: list.length ? `${Math.round((opened / list.length) * 100)}% dari semua tamu` : '' },
    { label: 'Hadir', value: attending.length, hint: `${attending.reduce((s, g) => s + g.rsvp.guests, 0)} orang` },
    { label: 'Tidak hadir', value: rsvp.length - attending.length },
  ];
});

async function load() {
  loading.value = true;
  try {
    const [inv, list] = await Promise.all([api.get(`/invitations/${id.value}`), api.get(`/invitations/${id.value}/guests`)]);
    invitation.value = inv;
    guests.value = list;
    pageCrumb.value = inv.title;
    document.title = `Tamu ${inv.title} · Undangan Studio`;
    try {
      template.value = localStorage.getItem(templateKey.value) || DEFAULT_SHARE_TEMPLATE;
    } catch {
      template.value = DEFAULT_SHARE_TEMPLATE;
    }
  } catch (e) {
    toast.error(e.message);
  } finally {
    loading.value = false;
  }
}
onMounted(load);
onBeforeUnmount(() => (pageCrumb.value = ''));

const bulkCount = computed(() => bulk.value.split('\n').filter((l) => l.trim()).length);

async function onAdd() {
  adding.value = true;
  try {
    const body = addMode.value === 'bulk' ? { names: bulk.value } : { name: single.name, phone: single.phone || null };
    const created = await api.post(`/invitations/${id.value}/guests`, body);
    guests.value = [...created.reverse(), ...guests.value];
    single.name = '';
    single.phone = '';
    bulk.value = '';
    toast.success(created.length > 1 ? `${created.length} tamu ditambahkan` : `Link untuk ${created[0].name} siap dibagikan`);
  } catch (e) {
    toast.error(e.message);
  } finally {
    adding.value = false;
  }
}

async function copy(text, label) {
  const ok = await copyText(text);
  ok ? toast.success(`${label} disalin`) : toast.error('Gagal menyalin');
}

const copyAll = () => copy(filtered.value.map((g) => `${g.name}: ${linkOf(g)}`).join('\n'), `${filtered.value.length} link`);

function openEdit(g) {
  editing.value = g;
  Object.assign(editForm, { name: g.name, phone: g.phone ?? '', slug: g.slug });
}

async function onEdit() {
  try {
    const updated = await api.put(`/invitations/${id.value}/guests/${editing.value.id}`, {
      name: editForm.name,
      phone: editForm.phone || null,
      slug: editForm.slug || null,
    });
    guests.value = guests.value.map((g) => (g.id === updated.id ? updated : g));
    editing.value = null;
    toast.success('Tamu diperbarui');
  } catch (e) {
    toast.error(e.message);
  }
}

async function onDelete() {
  const g = deleting.value;
  deleting.value = null;
  try {
    await api.delete(`/invitations/${id.value}/guests/${g.id}`);
    guests.value = guests.value.filter((x) => x.id !== g.id);
    toast.success('Tamu dihapus');
  } catch (e) {
    toast.error(e.message);
  }
}
</script>

<template>
  <div v-if="loading" class="space-y-6">
    <Skeleton class="h-12 w-72" />
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4"><Skeleton v-for="n in 4" :key="n" class="h-24" /></div>
    <Skeleton class="h-80 w-full" />
  </div>

  <div v-else-if="invitation">
    <PageHeader :title="invitation.title" description="Setiap tamu mendapat link pribadi, dan namanya tampil di cover undangan.">
      <template #before>
        <Button variant="link" size="sm" as-child class="text-muted-foreground mb-1 h-auto p-0">
          <RouterLink to="/admin"><ArrowLeftIcon /> Semua undangan</RouterLink>
        </Button>
      </template>
      <template #actions>
        <Button variant="outline" as-child>
          <RouterLink :to="`/admin/invitations/${invitation.id}/edit`"><PaletteIcon /> Edit desain</RouterLink>
        </Button>
        <Button variant="outline" as-child>
          <a :href="`/${invitation.slug}`" target="_blank" rel="noopener"><ExternalLinkIcon /> Lihat</a>
        </Button>
      </template>
    </PageHeader>

    <div v-if="!invitation.is_published" class="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
      <TriangleAlertIcon class="mt-0.5 size-4 shrink-0" />
      <p>Undangan ini masih <b>Draft</b>, jadi link belum bisa dibuka tamu. Terbitkan lewat menu <b>Pengaturan</b> di daftar undangan.</p>
    </div>

    <StatCards :items="stats" />

    <div class="grid items-start gap-4 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <Card class="gap-5 lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle>Tambah tamu</CardTitle>
          <CardDescription>Link pribadi langsung dibuat dari nama tamu.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs v-model="addMode" class="mb-4">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="single">Satu tamu</TabsTrigger>
              <TabsTrigger value="bulk">Banyak sekaligus</TabsTrigger>
            </TabsList>
          </Tabs>

          <form class="grid gap-4" @submit.prevent="onAdd">
            <template v-if="addMode === 'single'">
              <div class="grid gap-2">
                <Label for="g-name">Nama tamu</Label>
                <Input id="g-name" v-model="single.name" required maxlength="150" placeholder="mis. Adit & Istri" />
              </div>
              <div class="grid gap-2">
                <Label for="g-phone">No. WhatsApp <span class="text-muted-foreground font-normal">(opsional)</span></Label>
                <Input id="g-phone" v-model="single.phone" inputmode="tel" maxlength="30" placeholder="08123456789" />
              </div>
            </template>
            <div v-else class="grid gap-2">
              <Label for="g-bulk">Satu tamu per baris</Label>
              <Textarea id="g-bulk" v-model="bulk" rows="7" required class="font-mono text-xs" placeholder="Adit & Istri | 08123456789&#10;Joko & Istri&#10;Keluarga Bpk. Slamet" />
              <p class="text-muted-foreground text-xs">Format <code>Nama</code> atau <code>Nama | No. WA</code> · {{ bulkCount }} tamu</p>
            </div>
            <Button type="submit" :disabled="adding">
              <PlusIcon /> {{ adding ? 'Menambahkan…' : addMode === 'bulk' ? `Tambah ${bulkCount || ''} tamu` : 'Tambah & buat link' }}
            </Button>
          </form>
        </CardContent>
        <Separator />
        <CardFooter class="flex-col items-stretch gap-3">
          <div class="grid min-w-0 gap-1.5">
            <span class="text-sm font-medium">Link umum</span>
            <div class="bg-muted/60 flex items-center gap-2 rounded-md border py-1 pr-1 pl-2.5">
              <LinkIcon class="text-muted-foreground size-3.5 shrink-0" />
              <span class="text-muted-foreground min-w-0 flex-1 truncate font-mono text-xs">{{ invitationUrl(invitation.slug) }}</span>
              <Button variant="ghost" size="icon-xs" aria-label="Salin link umum" @click="copy(invitationUrl(invitation.slug), 'Link umum')"><CopyIcon /></Button>
            </div>
          </div>
          <Button variant="outline" size="sm" @click="templateOpen = true"><MessageSquareTextIcon /> Template pesan WhatsApp</Button>
        </CardFooter>
      </Card>

      <Card class="min-w-0 gap-0 overflow-hidden py-0">
        <div class="flex flex-wrap items-center gap-2 border-b p-3">
          <div class="relative w-full max-w-xs flex-1">
            <SearchIcon class="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input v-model="query" type="search" placeholder="Cari tamu…" aria-label="Cari tamu" class="h-8 pl-8" />
          </div>
          <Button v-if="filtered.length" variant="outline" size="sm" class="ml-auto" @click="copyAll"><CopyIcon /> Salin semua link</Button>
        </div>

        <div v-if="!guests.length" class="flex flex-col items-center gap-3 px-6 py-16 text-center">
          <div class="bg-muted flex size-12 items-center justify-center rounded-full"><UsersIcon class="text-muted-foreground size-5" /></div>
          <div class="space-y-1">
            <p class="font-medium">Belum ada tamu</p>
            <p class="text-muted-foreground max-w-sm text-sm">Contoh: “Adit &amp; Istri” akan mendapat link</p>
            <code class="text-muted-foreground text-xs break-all">{{ invitationUrl(invitation.slug, 'adit-dan-istri') }}</code>
          </div>
        </div>

        <Table v-else class="table-fixed">
          <TableHeader class="bg-muted/50">
            <TableRow>
              <TableHead class="pl-4">Tamu</TableHead>
              <TableHead class="hidden w-[11rem] md:table-cell">Status</TableHead>
              <TableHead class="w-[8rem] pr-4 sm:w-[11.5rem]"><span class="sr-only">Aksi</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="g in filtered" :key="g.id">
              <TableCell class="pl-4 whitespace-normal">
                <div class="truncate font-medium">
                  {{ g.name }}<span v-if="g.phone" class="text-muted-foreground font-normal"> · {{ g.phone }}</span>
                </div>
                <div class="text-muted-foreground truncate font-mono text-xs">{{ linkOf(g) }}</div>
                <div class="mt-1.5 md:hidden"><GuestStatus :guest="g" /></div>
                <p v-if="g.rsvp?.message" class="text-muted-foreground mt-1 truncate text-xs italic">“{{ g.rsvp.message }}”</p>
              </TableCell>
              <TableCell class="hidden md:table-cell"><GuestStatus :guest="g" /></TableCell>
              <TableCell class="pr-4">
                <div class="flex items-center justify-end gap-1">
                  <Button variant="outline" size="sm" :aria-label="`Salin link ${g.name}`" @click="copy(linkOf(g), `Link ${g.name}`)"><CopyIcon /><span class="hidden sm:inline">Salin</span></Button>
                  <Button variant="outline" size="icon-sm" as-child>
                    <a :href="whatsappUrl(g.phone, messageOf(g))" target="_blank" rel="noopener" title="Kirim lewat WhatsApp" aria-label="Kirim lewat WhatsApp"><SendIcon /></a>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="icon-sm" class="text-muted-foreground" aria-label="Aksi lainnya"><EllipsisVerticalIcon /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-48">
                      <DropdownMenuItem @select="copy(messageOf(g), 'Pesan')"><MessageSquareTextIcon /> Salin pesan undangan</DropdownMenuItem>
                      <DropdownMenuItem as-child>
                        <a :href="linkOf(g)" target="_blank" rel="noopener"><ExternalLinkIcon /> Buka link</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem @select="openEdit(g)"><PencilIcon /> Edit tamu</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive" @select="deleting = g"><Trash2Icon /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="!filtered.length">
              <TableCell colspan="3" class="text-muted-foreground h-24 text-center">Tidak ada tamu yang cocok dengan “{{ query }}”.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>

    <Dialog :open="templateOpen" @update:open="templateOpen = $event">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Template pesan WhatsApp</DialogTitle>
          <DialogDescription>
            <code>{nama}</code> diganti nama tamu dan <code>{link}</code> diganti link pribadinya. Template disimpan di browser ini.
          </DialogDescription>
        </DialogHeader>
        <Textarea v-model="template" rows="12" class="text-sm" />
        <DialogFooter>
          <Button variant="outline" @click="template = DEFAULT_SHARE_TEMPLATE">Kembalikan default</Button>
          <Button @click="templateOpen = false">Selesai</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog :open="!!editing" @update:open="(v) => !v && (editing = null)">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit tamu</DialogTitle>
          <DialogDescription>Ubah nama, nomor WhatsApp, atau akhiran link tamu.</DialogDescription>
        </DialogHeader>
        <form id="guest-form" class="grid gap-4" @submit.prevent="onEdit">
          <div class="grid gap-2">
            <Label for="e-name">Nama tamu</Label>
            <Input id="e-name" v-model="editForm.name" required maxlength="150" />
          </div>
          <div class="grid gap-2">
            <Label for="e-phone">No. WhatsApp</Label>
            <Input id="e-phone" v-model="editForm.phone" inputmode="tel" maxlength="30" />
          </div>
          <div class="grid gap-2">
            <Label for="e-slug">Akhiran link</Label>
            <Input id="e-slug" v-model="editForm.slug" maxlength="160" class="font-mono" />
            <p class="text-muted-foreground text-xs">Kalau diubah, link lama tamu ini tidak berlaku lagi.</p>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" @click="editing = null">Batal</Button>
          <Button type="submit" form="guest-form">Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <ConfirmDialog
      :open="!!deleting"
      title="Hapus tamu?"
      :description="`Link pribadi ${deleting?.name} tidak akan berlaku lagi. RSVP-nya tetap tersimpan.`"
      @confirm="onDelete"
      @cancel="deleting = null"
    />
  </div>
</template>
