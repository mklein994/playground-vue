<script setup lang="ts">
import * as Compact from "@heroicons/vue/20/solid/esm";
import * as Outline from "@heroicons/vue/24/outline/esm";
import * as Solid from "@heroicons/vue/24/outline/esm";
import { ref } from "vue";

const solidIcons = Solid;
const outlineIcons = Object.values(Outline);
const compactIcons = Object.values(Compact);

const icons = Object.entries(solidIcons).map(([name, solid], i) => ({
  name,
  solid,
  outline: outlineIcons[i],
  compact: compactIcons[i],
}));

const scale = ref();
</script>

<template>
  {{ scale }}
  <div class="icon-grid">
    <template v-for="{ name, solid, outline, compact } of icons" :key="name">
      <div class="name">{{ name }}</div>
      <Component :is="solid" class="icon solid" />
      <Component :is="outline" class="icon outline" />
      <Component :is="compact" class="icon compact" />
    </template>
  </div>
</template>

<style scoped>
.icon-grid {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  align-items: center;
  gap: 0.125em;
}

.name {
  text-align: end;
}

.icon {
  --width: 20px;
  width: var(--width);
  height: var(--width);
}

.solid {
  color: red;
}

.outline {
  color: blue;
}

.compact {
  color: green;
}
</style>
