<script setup lang="ts">
import { computed, ref } from "vue";

import GridPicker from "@/components/grid-borders/GridPicker.vue";

interface Item {
  id: number;
  class: (string | Record<string, unknown>)[];
  text: string;
  special: boolean;
}

type ItemRow = { items: Item[]; specialRow: boolean };

const columnCount = ref(3);
const itemCount = ref(15);

const items = computed<Item[]>(() =>
  Array.from({ length: itemCount.value }, (_, index) => {
    const i = index + 1;
    const special = i % 5 === 0;
    return {
      id: i,
      class: ["item", `item-${i}`, { special }],
      text: `item ${i}`,
      special,
    };
  }),
);

const list = computed(() =>
  items.value.reduce((all, current, i) => {
    const chunk = Math.floor(i / columnCount.value);
    const old = all.get(chunk);

    const specialRow = old?.specialRow || current.special;
    const items = (old?.items || []).concat(current);

    all.set(chunk, {
      items,
      specialRow,
    });
    return all;
  }, new Map<number, ItemRow>()),
);

const contentStyleList = ref();
const itemStyleList = ref();

function handleContentStyleUpdate(
  name: string | undefined,
  value: string | undefined,
) {
  contentStyleList.value = `${name}: ${value};`;
}

function handleItemStyleUpdate(
  name: string | undefined,
  value: string | undefined,
) {
  itemStyleList.value = `${name}: ${value};`;
}
</script>

<template>
  <div class="input-group">
    <div style="grid-column: 1 / -1">
      <label for="column-count">column count</label>
      <input
        id="column-count"
        v-model="columnCount"
        type="range"
        min="1"
        :max="itemCount"
        step="1"
        class="column-count"
      />
      {{ columnCount }}
    </div>

    <label for="item-count">item count</label>
    <input
      id="item-count"
      v-model="itemCount"
      type="number"
      style="grid-column-end: span 2"
    />

    <fieldset style="grid-column: 1 / -1">
      <legend>content</legend>
      <GridPicker kind="content" @update-style="handleContentStyleUpdate" />
    </fieldset>

    <fieldset style="grid-column: 1 / -1">
      <legend>item</legend>
      <GridPicker kind="item" @update-style="handleItemStyleUpdate" />
    </fieldset>
  </div>

  <div class="wrapper">
    <strong>Grid</strong>
    <div class="grid" :style="contentStyleList">
      <div
        v-for="item of items"
        :key="item.id"
        class="grid-row"
        :style="itemStyleList"
      >
        <div :class="item.class">
          {{ item.text }}
        </div>
      </div>
    </div>

    <strong>Subgrid</strong>
    <div class="subgrid" :style="contentStyleList">
      <div
        v-for="[i, { specialRow, items: listItems }] of list"
        :key="i"
        class="row"
        :class="{ 'special-row': specialRow }"
        :style="itemStyleList"
      >
        <div v-for="item of listItems" :key="item.id" :class="item.class">
          {{ item.text }}
        </div>
      </div>
    </div>

    <strong>Display Contents</strong>
    <div class="contents" :style="[contentStyleList, itemStyleList]">
      <div
        v-for="[i, { specialRow, items: listItems }] of list"
        :key="i"
        class="row"
      >
        <div
          v-for="item of listItems"
          :key="item.id"
          :class="[item.class, { 'special-row': specialRow }]"
        >
          {{ item.text }}
        </div>
      </div>
    </div>

    <strong>List</strong>
    <ul class="list">
      <li
        v-for="[i, { specialRow, items: listItems }] of list"
        :key="i"
        class="row"
        :class="{ 'special-row': specialRow }"
        :style="contentStyleList"
      >
        <span
          v-for="item of listItems"
          :key="item.id"
          :class="item.class"
          :style="itemStyleList"
          >{{ item.text }}</span
        >
      </li>
    </ul>

    <strong>Table-Grid</strong>
    <table class="table-grid">
      <tbody>
        <tr
          v-for="[i, { specialRow, items: listItems }] of list"
          :key="i"
          class="row"
          :class="{ 'special-row': specialRow }"
          :style="contentStyleList"
        >
          <td
            v-for="item of listItems"
            :key="item.id"
            :class="item.class"
            :style="itemStyleList"
          >
            {{ item.text }}
          </td>
        </tr>
      </tbody>
    </table>

    <strong>Table</strong>
    <table class="table">
      <tbody>
        <tr
          v-for="[i, { specialRow, items: listItems }] of list"
          :key="i"
          class="row"
          :class="{ 'special-row': specialRow }"
        >
          <td v-for="item of listItems" :key="item.id" :class="item.class">
            {{ item.text }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.input-group {
  display: grid;
  padding: 1em;
  grid-template-columns: repeat(3, minmax(0, auto));
}

.wrapper {
  --border-color: blue;
  --border-width: 1px;

  --column-count: v-bind("columnCount");

  display: grid;
  row-gap: 1em;
}

.column-count {
  margin: 1em;
}

.special {
  color: red;
  font-size: 1.5em;
  font-style: italic;
  font-weight: bold;

  &::before {
    content: "*";
  }
}

.grid {
  display: grid;
  background-color: var(--border-color);
  grid-template-columns: repeat(var(--column-count), auto);
  row-gap: var(--border-width);

  .grid-row {
    display: grid;
    background-color: white;
  }
}

.subgrid {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);

  .row {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }
}

.contents {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);

  .row {
    display: contents;
  }
}

.list .row {
  display: grid;
  grid-auto-flow: column;
}

.table-grid .row {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);
}

:where(.subgrid, .contents, .list, .table-grid, .table)
  .special-row:nth-child(n + 2) {
  border-top: 1px solid green;
}
</style>
