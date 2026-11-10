<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { id as localeId } from 'date-fns/locale';
import { computed } from 'vue';

/**
 * Pemilih tanggal (opsional + jam) dengan kalender. Nilai tetap string agar format data tidak berubah:
 *   withTime = false -> "2026-12-12"        withTime = true -> "2026-12-12T10:00"
 */
const props = defineProps({
  label: { type: String, required: true },
  hint: String,
  withTime: Boolean,
  placeholder: { type: String, default: 'Pilih tanggal' },
});
const model = defineModel({ type: String, default: '' });

const value = computed({
  get: () => model.value || null,
  set: (v) => (model.value = v || ''),
});
const modelType = computed(() => (props.withTime ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd'));
const formats = computed(() => ({ input: props.withTime ? 'EEEE, d MMMM yyyy · HH.mm' : 'EEEE, d MMMM yyyy' }));
const timeConfig = computed(() => ({ enableTimePicker: props.withTime, is24: true, minutesIncrement: 5 }));
const actionRow = { selectBtnLabel: 'Pilih', cancelBtnLabel: 'Batal', nowBtnLabel: 'Hari ini' };
</script>

<template>
  <div class="field field-date">
    <span class="field__label">{{ label }}</span>
    <VueDatePicker
      v-model="value"
      :model-type="modelType"
      :formats="formats"
      :time-config="timeConfig"
      :locale="localeId"
      :action-row="actionRow"
      :auto-apply="!withTime"
      :placeholder="placeholder"
      :input-attrs="{ clearable: false }"
      week-start="1"
      teleport
    />
    <small v-if="hint" class="field__hint">{{ hint }}</small>
  </div>
</template>

<style>
/* Samakan dengan tema builder (warna, radius, font). Menu di-teleport ke body, jadi tidak scoped. */
.dp__theme_light {
  --dp-font-family: inherit;
  --dp-font-size: 13px;
  --dp-border-radius: var(--ui-radius-sm, 8px);
  --dp-cell-border-radius: 999px;
  --dp-primary-color: var(--ui-ink, #2a2622);
  --dp-primary-text-color: #fff;
  --dp-border-color: var(--ui-border-strong, #d9d3ca);
  --dp-border-color-hover: var(--ui-ink, #2a2622);
  --dp-border-color-focus: var(--ui-accent, #2a2622);
  --dp-menu-border-color: var(--ui-border, #e8e3db);
  --dp-hover-color: var(--ui-sunken, #f3f0eb);
  --dp-background-color: var(--ui-surface, #fff);
  --dp-text-color: var(--ui-ink, #2a2622);
  --dp-icon-color: var(--ui-muted, #8a8377);
}
.field-date .dp__input { min-height: 38px; font-weight: 500; }
.dp__menu { box-shadow: 0 18px 40px -18px rgba(30, 25, 20, 0.35); }
.dp__today { border-color: var(--ui-accent, currentColor); }
</style>
