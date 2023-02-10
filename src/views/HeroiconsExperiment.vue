<script setup lang="ts">
import * as Compact from "@heroicons/vue/20/solid";
import * as Outline from "@heroicons/vue/24/outline";
import * as Solid from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";

const solidIcons = Solid;
const outlineIcons = Object.values(Outline);
const compactIcons = Object.values(Compact);

const icons = Object.entries(solidIcons).map(([name, solid], i) => {
  const wordCase = name
    .slice(0, -"Icon".length)
    .replaceAll(/\B([A-Z]|[0-9]+)/g, " $1");
  const kebabCase = wordCase.replaceAll(" ", "-").toLowerCase();

  return {
    name: { wordCase, kebabCase },
    solid,
    outline: outlineIcons[i],
    compact: compactIcons[i],
  };
});

const iconQuery = ref("");

const filteredIcons = computed(() =>
  icons.filter((icon) =>
    new RegExp(iconQuery.value, "i").test(icon.name.wordCase)
  )
);

// If we used v-model instead of @input, it breaks on
// mobile when the keyboard is completing a word. This is
// because v-model will not change the value if
// "isComposing" is true.
//
// Usually, this is not a problem, because on a form, you
// only want the text when the user has finished typing.
// However, in this case we want the filter to change on
// every keypress, even if they are still composing a
// word.
const handleQuery = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  iconQuery.value = target.value;
};
</script>

<template>
  <div class="icon-query">
    <input
      id="icon-query"
      type="search"
      name="iconQuery"
      :value="iconQuery"
      @input="handleQuery"
    />
    <label for="icon-query">Search</label>
  </div>

  <div class="icon-grid">
    <template
      v-for="{ name, solid, outline, compact } of filteredIcons"
      :key="name"
    >
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
