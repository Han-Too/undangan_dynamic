<script setup>
import { useInvitation } from '../../composables/useInvitation';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state } = useInvitation();
const g = state.content.gift;
</script>

<template>
  <div class="panel">
    <PanelHeader title="Hadiah" desc="Informasi rekening untuk tamu yang ingin memberi tanda kasih." />
    <FieldText v-model="g.title" label="Judul" />
    <FieldText v-model="g.text" label="Deskripsi" multiline :rows="3" />
    <hr class="divider-line" />
    <FieldText v-model="g.bank" label="Bank / e-wallet" placeholder="BCA" />
    <FieldText v-model="g.accountNumber" label="Nomor rekening" placeholder="1234567890" />
    <FieldText v-model="g.accountName" label="Nama pemilik" />
  </div>
</template>
