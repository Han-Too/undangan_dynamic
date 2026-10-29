<script setup>
/**
 * Bingkai smartphone untuk preview. `bare` = tanpa bezel (mode Preview / layar mobile).
 * Ukuran dihitung dari container (cq units) sehingga selalu pas di area yang tersedia.
 */
defineProps({ bare: Boolean });
</script>

<template>
  <div class="phone-wrap">
    <div class="phone" :class="{ 'phone--bare': bare }">
      <span v-if="!bare" class="phone__notch" aria-hidden="true" />
      <div class="phone__screen"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.phone-wrap {
  container-type: size;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-height: 0;
}
.phone {
  --h: min(100cqh, 860px);
  position: relative;
  width: min(100cqw, calc(var(--h) * 0.4875));
  height: var(--h);
  padding: 11px;
  background: #1b1a18;
  border-radius: 46px;
  box-shadow: 0 0 0 2px #3a3733, 0 40px 80px -30px rgba(28, 26, 23, 0.55), 0 12px 30px -12px rgba(28, 26, 23, 0.35);
}
.phone__screen { width: 100%; height: 100%; overflow: hidden; border-radius: 36px; background: #fff; isolation: isolate; }
.phone__notch {
  position: absolute;
  top: 19px;
  left: 50%;
  z-index: 20;
  width: 84px;
  height: 22px;
  background: #1b1a18;
  border-radius: 999px;
  transform: translateX(-50%);
  pointer-events: none;
}

/* Tanpa bezel: preview mode & ponsel */
.phone--bare { width: min(100cqw, 480px); height: 100cqh; padding: 0; background: none; border-radius: 0; box-shadow: none; }
.phone--bare .phone__screen { border-radius: 0; }
@media (min-width: 720px) {
  .phone--bare { box-shadow: 0 0 0 1px var(--ui-border), 0 30px 70px -30px rgba(28, 26, 23, 0.4); }
}
</style>
