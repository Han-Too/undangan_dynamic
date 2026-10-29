<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/composables/useAuth';
import { api } from '@/services/api';

/** Buat undangan baru, atau ubah pengaturan dasarnya (judul, slug link, status, pemilik). */
const props = defineProps({
  open: Boolean,
  invitation: { type: Object, default: null }, // null = buat baru
});
const emit = defineEmits(['close', 'saved']);

const KEEP_OWNER = 'keep'; // Select reka-ui tidak menerima nilai kosong/null
const { isAdmin } = useAuth();
const form = reactive({ title: '', slug: '', is_published: true, owner: KEEP_OWNER });
const owners = ref([]);
const busy = ref(false);
const error = ref('');
const editing = computed(() => !!props.invitation);
const origin = location.origin;

watch(
  () => props.open,
  async (open) => {
    if (!open) return;
    error.value = '';
    const inv = props.invitation;
    Object.assign(form, {
      title: inv?.title ?? '',
      slug: inv?.slug ?? '',
      is_published: inv?.is_published ?? true,
      owner: inv?.user_id ? String(inv.user_id) : KEEP_OWNER,
    });
    if (isAdmin.value && !owners.value.length) {
      owners.value = await api.get('/owners').catch(() => []);
    }
  },
);

const slugify = (v) => v.toLowerCase().replace(/&/g, ' dan ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const onSlugInput = (v) => (form.slug = String(v).toLowerCase().replace(/[^a-z0-9-_]/g, '-'));
const previewSlug = computed(() => form.slug || slugify(form.title) || 'raka-dinda');

async function onSubmit() {
  error.value = '';
  busy.value = true;
  try {
    const body = { title: form.title, slug: form.slug || undefined };
    if (isAdmin.value && form.owner !== KEEP_OWNER) body.user_id = Number(form.owner);
    const saved = editing.value
      ? await api.put(`/invitations/${props.invitation.id}`, { ...body, slug: form.slug || slugify(form.title), is_published: form.is_published })
      : await api.post('/invitations', body);
    emit('saved', saved);
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="(v) => !v && emit('close')">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ editing ? 'Pengaturan undangan' : 'Undangan baru' }}</DialogTitle>
        <DialogDescription>
          {{ editing ? 'Ubah judul, link, status, atau pemilik undangan.' : 'Isi judul dulu. Desain, acara, dan foto diatur di editor setelah ini.' }}
        </DialogDescription>
      </DialogHeader>

      <form id="invitation-form" class="grid gap-5" @submit.prevent="onSubmit">
        <div class="grid gap-2">
          <Label for="inv-title">Judul</Label>
          <Input id="inv-title" v-model="form.title" required maxlength="255" placeholder="mis. Raka & Dinda" />
          <p class="text-muted-foreground text-xs">Hanya untuk dashboard & judul tab browser.</p>
        </div>

        <div class="grid gap-2">
          <Label for="inv-slug">Link undangan</Label>
          <Input id="inv-slug" :model-value="form.slug" maxlength="100" class="font-mono" :placeholder="slugify(form.title) || 'raka-dinda'" @update:model-value="onSlugInput" />
          <p class="text-muted-foreground text-xs break-all">
            {{ origin }}/<span class="text-foreground font-medium">{{ previewSlug }}</span>
            <template v-if="!editing"> · kosongkan agar dibuat dari judul</template>
          </p>
        </div>

        <div v-if="isAdmin" class="grid gap-2">
          <Label>Pemilik</Label>
          <Select v-model="form.owner">
            <SelectTrigger class="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem v-if="!editing" :value="KEEP_OWNER">Saya sendiri</SelectItem>
              <SelectItem v-for="o in owners" :key="o.id" :value="String(o.id)">{{ o.name }} <span class="text-muted-foreground">· {{ o.email }}</span></SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div v-if="editing" class="flex items-start justify-between gap-4 rounded-lg border p-3">
          <div class="space-y-0.5">
            <Label for="inv-published">Terbitkan</Label>
            <p class="text-muted-foreground text-xs">Kalau dimatikan (Draft), link tidak bisa dibuka tamu.</p>
          </div>
          <Switch id="inv-published" v-model="form.is_published" />
        </div>
        <p v-if="editing && form.slug !== invitation.slug" class="text-xs text-amber-700">
          Link diubah: link lama yang sudah disebar tidak akan berlaku lagi.
        </p>

        <p v-if="error" class="text-destructive text-sm" role="alert">{{ error }}</p>
      </form>

      <DialogFooter>
        <Button variant="outline" @click="emit('close')">Batal</Button>
        <Button type="submit" form="invitation-form" :disabled="busy">{{ busy ? 'Menyimpan…' : editing ? 'Simpan' : 'Buat undangan' }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
