<script setup>
import { Badge } from '@/components/ui/badge';
import { fmtDateTime } from './format';

/** Status satu tamu: RSVP (hadir / tidak) > sudah dibuka > belum dibuka. */
defineProps({ guest: { type: Object, required: true } });
</script>

<template>
  <Badge v-if="guest.rsvp" variant="outline" class="text-muted-foreground gap-1.5 px-1.5">
    <span class="size-1.5 rounded-full" :class="guest.rsvp.attendance === 'hadir' ? 'bg-emerald-500' : 'bg-red-500'" />
    {{ guest.rsvp.attendance === 'hadir' ? `Hadir · ${guest.rsvp.guests} org` : 'Tidak hadir' }}
  </Badge>
  <Badge v-else-if="guest.open_count" variant="secondary" :title="`Pertama dibuka ${fmtDateTime(guest.opened_at)}`">Dibuka {{ guest.open_count }}×</Badge>
  <Badge v-else variant="outline" class="text-muted-foreground">Belum dibuka</Badge>
</template>
