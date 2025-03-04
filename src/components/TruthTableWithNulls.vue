<script setup lang="ts">
import { computed } from "vue";

import KeyCellWithNull from "@/components/truth-table/KeyCellWithNull.vue";

import type { KeyItemWithNulls } from "@/types/TruthTable.d.ts";

export type TestWithNulls = (args: (boolean | null)[]) => boolean | null;

const props = defineProps<{
  headers: string[];
  tests: TestWithNulls | TestWithNulls[];
}>();

const headers = computed(() =>
  props.headers.map((x: string | { name: string }) =>
    typeof x === "string" ? x : x.name,
  ),
);

const tests = computed(() =>
  Array.isArray(props.tests) ? props.tests : [props.tests],
);

const keys = computed(() => {
  const length = headers.value.length;
  const keys = [];
  for (let i = 0; i < 3 ** length; i++) {
    const id = i.toString(3).padStart(length, "0");
    const keyItem: KeyItemWithNulls[] = id.split("").map((x) => {
      switch (x) {
        case "0":
          return { display: " ", class: "null", value: null };
        case "1":
          return { display: "0", class: "false", value: false };
        case "2":
          return { display: "1", class: "true", value: true };
        default:
          throw new Error("Invalid key index");
      }
    });
    keys.push({
      id,
      keyItem,
    });
  }
  return keys;
});

const rows = computed(() => {
  const rows = [];
  for (const key of keys.value) {
    const results = [];
    for (const test of tests.value) {
      const rawValue = test(key.keyItem.map((x) => x.value));
      const value =
        rawValue === null || typeof rawValue === "boolean"
          ? rawValue
          : "(invalid)";
      results.push({
        class: rawValue === value ? JSON.stringify(value) : "invalid",
        value,
      });
    }
    rows.push({ key, results });
  }
  return rows;
});
</script>

<template>
  <table class="truth-table">
    <thead class="head">
      <tr class="row header">
        <th class="cell">key</th>
        <th v-for="header of headers" :key="header" class="cell">
          {{ header }}
        </th>
        <th v-for="i in rows[0].results.length" :key="i" class="cell">
          Result {{ i }}
        </th>
      </tr>
    </thead>

    <tbody class="body">
      <tr v-for="row of rows" :key="row.key.id" class="row">
        <td class="cell">
          <KeyCellWithNull :key-value="row.key.keyItem"></KeyCellWithNull>
        </td>
        <td
          v-for="keyItem of row.key.keyItem"
          :key="keyItem.display"
          class="cell"
          :class="keyItem.class"
        >
          {{ keyItem.value }}
        </td>
        <td
          v-for="result of row.results"
          :key="result.class"
          class="cell"
          :class="result.class"
        >
          {{ result.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.truth-table {
  border: 1px solid ButtonBorder;
  border-collapse: collapse;

  /* TODO: figure out if these are used anywhere */
  --true-color: green;
  --false-color: gray;
}

.cell {
  padding: 0 0.5em;
  border: 1px solid ButtonBorder;
}

.body .cell {
  font-family: monospace;
  font-size: 1rem;
}

.cell .code {
  font-size: 1rem;
}

.cell.key {
  text-align: center;
}

.cell.true {
  background-color: var(--true-background-color);
}

.cell.true::before {
  content: "• ";
}

.cell.true::after {
  content: "\a0";
}

.cell.false {
  background-color: var(--false-background-color);
}

.cell.false::before {
  content: "\a0\a0";
}

.cell.invalid {
  background-color: lightpink;
}
</style>
