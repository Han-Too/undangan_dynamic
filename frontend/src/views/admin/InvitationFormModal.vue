<script setup>
import { computed, reactive, ref, watch } from 'vue';
import BaseModal from '../../components/builder/ui/BaseModal.vue';
import { useAuth } from '../../composables/useAuth';
import { api } from '../../services/api';

/** Buat undangan baru, atau ubah pengaturan dasarnya (judul, slug link, status, pemilik). */
const props = defineProps({
  open: Boolean,
  invitation: { type: Object, default: null }, // null = buat baru
});
const emit = defineEmits(['close', 'saved']);

const { isAdmin } = useAuth();
const form = reactive({ title: '', slug: '', is_published: true, user_id: null });
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
      user_id: inv?.user_id ?? null,
    });
    if (isAdmin.value && !owners.value.length) {
      owners.value = await api.get('/owners').catch(() => []);
    }
  },
);

const slugify = (v) => v.toLowerCase().replace(/&/g, ' dan ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const onSlugInput = (e) => (form.slug = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'));

async function onSubmit() {
  error.value = '';
  busy.value = true;
  try {
    const body = { title: form.title, slug: form.slug || undefined };
    if (isAdmin.value && form.user_id) body.user_id = form.user_id;
    let saved;
    if (editing.value) {
      saved = await api.put(`/invitations/${props.invitation.id}`, { ...body, slug: form.slug || slugify(form.title), is_published: form.is_published });
    } else {
      saved = await api.post('/invitations', body);
    }
    emit('saved', saved);
  } catch (e) {
    error.value = e.message;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <BaseModal :open="open" :title="editing ? 'Pengaturan undangan' : 'Undangan baru'" width="460px" @close="emit('close')">
    <form class="form-grid" @submit.prevent="onSubmit">
      <label class="field">
        <span class="field__label">Judul</span>
        <input v-model="form.title" class="input" required maxlength="255" placeholder="mis. Raka & Dinda" />
        <small class="field__hint">Hanya untuk dashboard & judul tab browser. Isi undangan diatur di editor.</small>
      </label>

      <label class="field">
        <span class="field__label">Link undangan</span>
        <input :value="form.slug" class="input" maxlength="100" :placeholder="slugify(form.title) || 'raka-dinda'" @input="onSlugInput" />
        <small class="field__hint">{{ origin }}/<b>{{ form.slug || slugify(form.title) || 'raka-dinda' }}</b>{{ editing ? '' : ' — kosongkan agar dibuat otomatis dari judul' }}</small>
      </label>

      <label v-if="isAdmin" class="field">
        <span class="field__label">Pemilik</span>
        <select v-model="form.user_id" class="input">
          <option :value="null">{{ editing ? '(tidak diubah)' : 'Saya sendiri' }}</option>
          <option v-for="o in owners" :key="o.id" :value="o.id">{{ o.name }} — {{ o.email }}</option>
        </select>
      </label>

      <label v-if="editing" class="check">
        <input v-model="form.is_published" type="checkbox" />
        Terbitkan (tamu bisa membuka undangan)
      </label>
      <p v-if="editing" class="note">Mengubah link membuat link lama yang sudah disebar tidak berlaku lagi.</p>

      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      <div class="form-actions">
        <button type="button" class="btn" @click="emit('close')">Batal</button>
        <button type="submit" class="btn btn--primary" :disabled="busy">{{ busy ? 'Menyimpan…' : editing ? 'Simpan' : 'Buat undangan' }}</button>
      </div>
    </form>
  </BaseModal>
</template>
