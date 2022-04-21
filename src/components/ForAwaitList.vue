<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    max?: number;
  }>(),
  {
    max: 25,
  }
);

async function* iteratorGenerator(max: number) {
  let i = 1;
  while (i <= max) {
    yield i++;
  }
}

async function fizzBuzz(max: number) {
  const list = [];
  for await (let i of iteratorGenerator(max)) {
    list.push(
      i % 15 === 0
        ? "FizzBuzz"
        : i % 3 === 0
        ? "Fizz"
        : i % 5 === 0
        ? "Buzz"
        : i
    );
  }
  return list;
}

const max = ref(props.max);

const list = ref<(string | number)[]>([]);

watchEffect(async () => {
  list.value = await fizzBuzz(max.value);
});
</script>

<template>
  <div class="for-await-list">
    <label for="max">Max:</label>
    <input id="max" v-model="max" type="number" name="max" min="1" />

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
