<template>
  <ol class="fruit-list">
    <li v-for="fruit of fruits" :key="fruit">{{ fruit }}</li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const fruits = [
      "apple",
      "banana",
      "cherry",
      "placebit",
      "latine",
      "quid",
      "si",
      "nos",
      "non",
      "interpretum",
      "fungimur",
      "munere",
      "sed",
      "tuemur",
      "ea",
      "quae",
      "sint",
      "coniuncta",
      "explicabo",
      "brevi",
      "nullus",
      "in",
      "ipsis",
      "error",
      "est",
      "finibus",
      "bonorum",
      "et",
      "malorum",
      "fere",
      "a",
      "nobis",
      "philosophia",
    ];
    return {
      fruits,
    };
  },
});
</script>

<style scoped>
.fruit-list {
  margin-left: 1rem;
  padding-left: 1rem;
}
@counter-style fruit-digits {
  system: fixed;
  symbols: 🥇 🥈 🥉;
  suffix: " ";
}

:root {
  counter-reset: fruit-digits;
}

.fruit-list {
  list-style: fruit-digits;
}

/* .fruit-list > * { */
/*   counter-increment: fruit-digits; */
/* } */

/* .fruit-list > *::after { */
/*   content: " " counter(fruit, lower-roman); */
/* } */

</style>
