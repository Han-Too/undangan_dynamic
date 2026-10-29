<script setup>
import { useInvitation } from '../../composables/useInvitation';
import { formatDateLong, formatWeekday } from '../../utils/format';
import Icon from '../Icon.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';

const { state, theme } = useInvitation();
</script>

<template>
  <p class="inv-eyebrow">Save the date</p>
  <h2 class="inv-title">Acara</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />

  <article v-for="ev in state.content.events" :key="ev.id" class="inv-card event">
    <h3 class="event__title">{{ ev.title }}</h3>
    <p v-if="ev.date" class="event__row">
      <Icon name="calendar" :size="15" />
      <span>{{ formatWeekday(ev.date) }}, {{ formatDateLong(ev.date) }}</span>
    </p>
    <p v-if="ev.time" class="event__row"><Icon name="clock" :size="15" /><span>{{ ev.time }}</span></p>
    <p v-if="ev.place" class="event__row"><Icon name="pin" :size="15" /><span>{{ ev.place }}</span></p>
  </article>
</template>

<style>
.event { display: grid; gap: 8px; }
.event__title {
  margin: 0 0 4px;
  font-family: var(--f-heading);
  font-weight: 500;
  font-size: calc(1.6rem * var(--h-scale));
  line-height: 1.2;
  color: var(--c-heading);
}
.event__row {
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 9px;
  font-size: 0.9rem;
  color: var(--c-text);
  text-align: left;
}
.event__row .icon { margin-top: 5px; color: var(--c-primary); }
</style>
