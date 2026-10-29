<script setup>
import { computed } from 'vue';
import { useBuilderUi } from '../../composables/useBuilderUi';
import { editorGroups, getPanel } from '../../data/editorPanels';
import Icon from '../Icon.vue';

const { ui } = useBuilderUi();
const active = computed(() => getPanel(ui.panel));

const select = (id) => {
  ui.panel = id;
  ui.focus = null;
};
</script>

<template>
  <div class="editor">
    <nav class="editor__nav" aria-label="Menu editor">
      <div v-for="g in editorGroups" :key="g.id" class="group">
        <span class="group__label">{{ g.label }}</span>
        <button
          v-for="item in g.items"
          :key="item.id"
          type="button"
          class="navitem"
          :class="{ 'is-active': ui.panel === item.id }"
          :aria-current="ui.panel === item.id ? 'page' : undefined"
          @click="select(item.id)"
        >
          <Icon :name="item.icon" :size="19" />
          <span>{{ item.label }}</span>
        </button>
      </div>
    </nav>

    <div class="editor__body">
      <Transition name="panel" mode="out-in">
        <component :is="active.component" :key="active.id" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.editor { display: grid; grid-template-columns: 84px minmax(0, 1fr); height: 100%; min-height: 0; background: var(--ui-bg); }

.editor__nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 8px;
  overflow-y: auto;
  background: var(--ui-surface);
  border-right: 1px solid var(--ui-border);
  scrollbar-width: none;
}
.group { display: grid; gap: 2px; }
.group__label {
  padding: 0 6px 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ui-faint);
}
.navitem {
  display: grid;
  justify-items: center;
  gap: 3px;
  padding: 9px 4px 7px;
  font-size: 11px;
  font-weight: 600;
  color: var(--ui-muted);
  background: none;
  border: 0;
  border-radius: 10px;
  transition: background 0.15s, color 0.15s;
}
.navitem:hover { background: var(--ui-sunken); color: var(--ui-ink); }
.navitem.is-active { color: #fff; background: var(--ui-ink); }

.editor__body { min-height: 0; overflow-y: auto; padding: 20px 18px 32px; overscroll-behavior: contain; }

.panel-enter-active, .panel-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.panel-enter-from { opacity: 0; transform: translateY(6px); }
.panel-leave-to { opacity: 0; }

/* Tablet & mobile: menu jadi baris horizontal di atas */
@media (max-width: 1099px) {
  .editor { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); }
  .editor__nav {
    flex-direction: row;
    align-items: stretch;
    gap: 0;
    padding: 8px 10px;
    overflow-x: auto;
    overflow-y: hidden;
    border-right: 0;
    border-bottom: 1px solid var(--ui-border);
  }
  .group { grid-auto-flow: column; grid-auto-columns: max-content; gap: 2px; padding: 0 6px; border-right: 1px solid var(--ui-border); }
  .group:last-child { border-right: 0; }
  .group__label { display: none; }
  .navitem { min-width: 58px; padding: 7px 8px 6px; }
  .editor__body > :deep(*) { max-width: 760px; margin-inline: auto; }
}
</style>
