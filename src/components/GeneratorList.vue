<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    initialMax?: number;
  }>(),
  {
    initialMax: 25,
  },
);

function* iteratorGenerator(max: number) {
  let i = 1;
  while (i <= max) {
    yield i++;
  }
}

const fizzBuzz = (max: number) => {
  const list = [];
  for (let i of iteratorGenerator(max)) {
    list.push(
      i % 15 === 0
        ? "FizzBuzz"
        : i % 3 === 0
          ? "Fizz"
          : i % 5 === 0
            ? "Buzz"
            : i,
    );
  }
  return list;
};

const max = ref(props.initialMax);

const list = ref<(string | number)[]>([]);

watchEffect(() => {
  list.value = fizzBuzz(max.value);
});
</script>

<template>
  <div class="generator-list">
    <label for="max">Max:</label>
    <input
      id="max"
      v-model="max"
      type="number"
      name="max"
      min="1"
      class="tw-form-input"
    />

    <ol>
      <li v-for="(value, index) of list" :key="`${value}${index}`">
        <span :class="{ 'is-number': Number.isInteger(value) }">{{
          value
        }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.is-number {
  color: dodgerblue;
}
</style>
