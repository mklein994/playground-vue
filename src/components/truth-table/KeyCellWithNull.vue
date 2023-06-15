<script setup lang="ts">
import { type KeyItem } from "@/types/TruthTable";

const props = defineProps<{
  keyValue: KeyItem[];
}>();
</script>

<template>
  <code
    ><span
      v-for="(keyItem, keyIndex) of props.keyValue"
      :key="keyIndex"
      class="key-item"
      :class="keyItem.class"
      >{{ keyItem.display === " " ? "&nbsp;" : keyItem.display }}</span
    ></code
  >
</template>

<style scoped>
.key-item.true {
  color: var(--true-text-color);
}

.key-item.false {
  color: var(--false-text-color);
}
</style>
