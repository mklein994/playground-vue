<script setup lang="ts">
import type { KeyItemWithNulls } from "@/types/TruthTable.d.ts";

const props = defineProps<{
  keyValue: KeyItemWithNulls[];
}>();
</script>

<template>
  <code
    ><span
      v-for="(keyItem, keyIndex) of props.keyValue"
      :key="keyIndex"
      class="key-cell-with-null"
      :class="keyItem.class"
      >{{ keyItem.display === " " ? "&nbsp;" : keyItem.display }}</span
    ></code
  >
</template>

<style>
.key-cell-with-null {
  &.true {
    color: var(--true-text-color);
  }

  &.false {
    color: var(--false-text-color);
  }
}
</style>
