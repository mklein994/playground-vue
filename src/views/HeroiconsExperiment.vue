<script setup lang="ts">
import * as Compact from "@heroicons/vue/20/solid";
import * as Outline from "@heroicons/vue/24/outline";
import * as Solid from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";

import { extractNameAndPath } from "@/helpers/componentName";

const solidIcons = Solid;
const outlineIcons = Object.values(Outline);
const compactIcons = Object.values(Compact);

const icons = Object.entries(solidIcons).map(([name, solid], i) => ({
  name: extractNameAndPath(name, { splitNumbers: true }),
  solid,
  outline: outlineIcons[i],
  compact: compactIcons[i],
}));

const iconQuery = ref("");

const filteredIcons = computed(() =>
  icons.filter((icon) =>
    new RegExp(iconQuery.value, "i").test(icon.name.wordCase)
  )
);
</script>

<template>
  <div class="icon-query">
    <input id="icon-query" v-model="iconQuery" type="search" name="iconQuery" />
    <label for="icon-query">Search</label>
  </div>

  <div class="icon-grid">
    <template v-for="{ name, solid, outline, compact } of filteredIcons" :key="name">
      <div class="name">{{ name.wordCase }}</div>
      <Component :is="solid" class="icon solid" :class="name.kebabCase" />
      <Component :is="outline" class="icon outline" :class="name.kebabCase" />
      <Component :is="compact" class="icon compact" :class="name.kebabCase" />
    </template>
  </div>
</template>

<style scoped>
.icon-query {
  display: flex;
  gap: 0.5em;
  justify-content: center;
}

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
  --length: 24px;
  width: var(--length);
  height: var(--length);
}

.solid {
  color: red;
}

.outline {
  color: blue;
}

.compact {
  --length: 20px;
  color: green;
}
</style>
