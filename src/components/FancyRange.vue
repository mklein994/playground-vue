<script setup lang="ts">
import { computed, useId } from "vue";

const { options } = defineProps<{
  options: { value: number; label?: string }[];
}>();
const listId = useId();

const hasLabels = computed(() => options.some((x) => x.label != null));
</script>

<template>
  <div class="fancy-range">
    <slot :list="listId"></slot>
    <datalist
      :id="listId"
      class="fancy-range-list"
      :class="{ ['has-labels']: hasLabels }"
    >
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
        class="fancy-range-option"
      ></option>
    </datalist>
  </div>
</template>

<style scoped>
.fancy-range-list.has-labels {
  display: flex;
  justify-content: space-between;
}
</style>
