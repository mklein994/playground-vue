<script setup lang="ts">
import { computed, ref } from "vue";

const foodItems = computed(() => [
  { id: "apple", kind: "fruit", name: "Apple" },
  { id: "banana", kind: "fruit", name: "Banana" },
  { id: "cherry", kind: "fruit", name: "Cherry" },
  { id: "almond", kind: "nut", name: "Almond" },
  { id: "hazelnut", kind: "nut", name: "Hazelnut" },
  { id: "peanut", kind: "nut", name: "Peanut" },
  { id: "walnut", kind: "nut", name: "Walnut" },
  { id: "blueberry", kind: "berry", name: "Blueberry" },
  { id: "strawberry", kind: "berry", name: "Strawberry" },
]);

const selectedFoodItemIds = ref<string[]>([]);

const showLine = ref(true);
const isGrouped = ref(false);

const groupedFoodItems = computed(() =>
  Object.groupBy(foodItems.value, (x) => x.kind),
);

const shouldShowLine = (id: string) => showLine.value && id === "peanut";

const getGroupLabel = (kind: string) =>
  ({
    fruit: "Fruit",
    nut: "Nut",
    berry: "Berry",
  })[kind];
</script>

<template>
  <div class="select-element-experiment">
    <div class="input-wrapper">
      <input id="show-line" v-model="showLine" type="checkbox" />
      <label for="show-line">Show Line</label>
    </div>

    <div class="input-wrapper">
      <input id="is-grouped" v-model="isGrouped" type="checkbox" />
      <label for="is-grouped">Is Grouped</label>
    </div>

    <select
      v-if="isGrouped"
      id="food-item"
      v-model="selectedFoodItemIds"
      multiple
    >
      <optgroup
        v-for="[kind, items] of Object.entries(groupedFoodItems)"
        :key="kind"
        :label="getGroupLabel(kind)"
      >
        <template v-for="item of items" :key="item.id">
          <hr v-if="shouldShowLine(item.id)" class="select-line" />
          <option :value="item.id">
            {{ item.name }}
          </option>
        </template>
      </optgroup>
    </select>

    <select v-else id="food-item" v-model="selectedFoodItemIds" multiple>
      <template v-for="item of foodItems" :key="item.id">
        <hr v-if="shouldShowLine(item.id)" class="select-line" />
        <option :value="item.id">{{ item.name }}</option>
      </template>
    </select>

    <pre>{{ selectedFoodItemIds }}</pre>
  </div>
</template>

<style>
.select-element-experiment {
  padding: 1rem;
}
</style>
