<template>
  <div class="grid-picker">
    <label>name</label>
    <select v-model="kindName">
      <option value=""></option>
      <option v-for="name of kindNames" :key="name">{{ name }}</option>
    </select>

    <label>value</label>
    <select
      v-model="kindValue"
      @change="$emit('updateStyle', kindName, kindValue)"
    >
      <option value=""></option>
      <option v-for="value of kindValues" :key="value">{{ value }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps<{
  kind: "item" | "content";
}>();

defineEmits<{
  (
    event: "updateStyle",
    name: string | undefined,
    value: string | undefined
  ): void;
}>();

const kindName = ref<string>();
const kindValue = ref<string>();

const gridContentNames = ["align-content", "justify-content", "place-content"];

const gridItemNames = [
  "align-items",
  "align-self",
  "justify-items",
  "justify-self",
  "place-items",
  "place-self",
];

const kindNames = computed(() =>
  props.kind === "content" ? gridContentNames : gridItemNames
);

// CSS Grid *-items:
//   - align-items
//   - align-self
//   - justify-items
//   - justify-self
//   - place-items
//   - place-self
const gridItemValues = [
  "auto",
  "normal",
  "start",
  "end",
  "center",
  "stretch",
  "baseline",
  "first baseline",
  "last baseline",
];

// CSS Grid *-content:
//   - align-content
//   - justify-content
//   - place-content
const gridContentValues = [
  "normal",
  "start",
  "end",
  "center",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
  "baseline",
  "first baseline",
  "last baseline",
];

const kindValues = computed(() =>
  props.kind === "content" ? gridContentValues : gridItemValues
);
</script>

<style scoped>
.grid-picker {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5em;
}
</style>
