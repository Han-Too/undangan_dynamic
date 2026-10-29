<script setup>
import { reactive, watchEffect } from 'vue';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

/** Konfirmasi aksi berbahaya (hapus). Terbuka selama `open` true; menutup lewat emit('cancel'). */
const props = defineProps({
  open: Boolean,
  title: { type: String, required: true },
  description: { type: String, default: '' },
  confirmText: { type: String, default: 'Hapus' },
});
const emit = defineEmits(['confirm', 'cancel']);

// Teks dibekukan selama dialog terbuka, agar tidak berubah saat animasi tutup (data induk sudah di-null-kan).
const shown = reactive({ title: '', description: '' });
watchEffect(() => {
  if (props.open) Object.assign(shown, { title: props.title, description: props.description });
});
</script>

<template>
  <AlertDialog :open="open" @update:open="(v) => !v && emit('cancel')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ shown.title }}</AlertDialogTitle>
        <AlertDialogDescription v-if="shown.description">{{ shown.description }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Batal</AlertDialogCancel>
        <!-- Bukan AlertDialogAction: komponen itu menutup dialog (emit cancel) sebelum @click, sehingga data induk keburu null. -->
        <Button variant="destructive" @click="emit('confirm')">{{ confirmText }}</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
