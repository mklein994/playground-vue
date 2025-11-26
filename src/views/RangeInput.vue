<script setup lang="ts">
import { computed, ref } from "vue";

const ratingList = [
  "terrible",
  "bad",
  "meh",
  "ok",
  "good",
  "great",
  "excellent",
];

const rating = ref(Math.floor(ratingList.length / 2));

const ratingName = computed(() => ratingList[rating.value]);
</script>

<template>
  <div class="range-input">
    <input
      id="rating"
      v-model.number="rating"
      type="range"
      min="0"
      :max="ratingList.length - 1"
      list="rating-list"
      class="rating"
    />
    <datalist id="rating-list" class="rating-list">
      <option
        v-for="option in ratingList"
        :key="option"
        :value="option"
        class="rating-list-option"
      >
        {{ option }}
      </option>
    </datalist>

    <output>{{ ratingName }}</output>
  </div>
</template>

<style>
.range-input {
  padding: 1em;

  .rating {
    width: 15rem;
    border: 1px solid black;
  }

  .rating-list {
    display: flex;
    width: 15em;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.5em;
    writing-mode: vertical-lr;
  }

  .rating-list-option {
    rotate: -60deg;
    transform-origin: top center;
  }
}
</style>
