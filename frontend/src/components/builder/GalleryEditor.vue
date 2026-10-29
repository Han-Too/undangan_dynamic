<script setup>
import { useBuilderUi } from '../../composables/useBuilderUi';
import { useInvitation } from '../../composables/useInvitation';
import Icon from '../Icon.vue';
import FieldText from './ui/FieldText.vue';
import PanelHeader from './ui/PanelHeader.vue';

const { state } = useInvitation();
const { openPanel } = useBuilderUi();
const g = state.content.gallery;
</script>

<template>
  <div class="panel">
    <PanelHeader title="Galeri" desc="Judul dan keterangan galeri." />
    <FieldText v-model="g.title" label="Judul" />
    <FieldText v-model="g.caption" label="Caption" multiline :rows="3" />
    <button type="button" class="btn btn--block" @click="openPanel('photos')">
      <Icon name="image" :size="15" /> Kelola foto galeri
    </button>
  </div>
</template>
