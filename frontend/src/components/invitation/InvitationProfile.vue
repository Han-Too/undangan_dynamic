<script setup>
import { useInvitation } from '../../composables/useInvitation';
import InvPhoto from './InvPhoto.vue';
import OrnamentDivider from './ornaments/OrnamentDivider.vue';
import PhotoFrame from './PhotoFrame.vue';

const { state, theme } = useInvitation();
</script>

<template>
  <h2 class="inv-title">{{ state.content.profile.title }}</h2>
  <OrnamentDivider :type="theme.ornaments.divider" />

  <PhotoFrame :shape="theme.ornaments.frame" ratio="4 / 5">
    <InvPhoto :photo="state.photos.profile" label="Foto Profil" />
  </PhotoFrame>

  <div class="profile">
    <template v-for="(person, i) in state.content.profile.people" :key="i">
      <span v-if="i > 0" class="profile__amp" aria-hidden="true">&amp;</span>
      <article class="profile__person">
        <h3 class="profile__name">{{ person.name }}</h3>
        <p class="profile__full">{{ person.fullName }}</p>
        <p class="inv-text inv-text--sm">{{ person.parents }}</p>
      </article>
    </template>
  </div>
</template>

<style>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}
.profile__person { display: grid; gap: 4px; }
.profile__name {
  margin: 0;
  font-family: var(--f-heading);
  font-weight: 500;
  font-size: calc(2.4rem * var(--h-scale));
  line-height: 1.1;
  color: var(--c-heading);
  overflow-wrap: anywhere;
}
.profile__full {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c-primary);
}
.profile__amp {
  font-family: var(--f-heading);
  font-size: calc(1.8rem * var(--h-scale));
  color: var(--c-primary);
  line-height: 1.4;
}
</style>
