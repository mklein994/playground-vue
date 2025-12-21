<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

interface LogItem {
  dt: Date;
  dtIso: string;
  dtDisplay: string;
  state: DocumentVisibilityState;
}

const log = ref<LogItem[]>([]);

const handleVisibilityChange = (_e: Event) => {
  const dt = new Date();
  log.value.push({
    dt,
    dtIso: dt.toJSON(),
    dtDisplay: dt.toLocaleString(),
    state: document.visibilityState,
  });
};

onBeforeMount(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
  <div class="page-visibility-experiment">
    <h2>Page Visibility</h2>

    <ul class="log pv-list">
      <li v-for="item of log" :key="item.dtIso">
        <time :datetime="item.dtIso">{{ item.dtDisplay }}</time
        >: <span :class="item.state">{{ item.state }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
.page-visibility-experiment {
  padding: 1rem;

  .log {
    .visible,
    .hidden {
      color: var(--color);
    }

    .visible {
      --color: var(--pv-b-color-green-500);
    }

    .hidden {
      --color: var(--pv-b-color-red-500);
    }
  }
}
</style>
