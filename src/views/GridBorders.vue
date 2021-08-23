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
      <GridPicker kind="content" @updateStyle="handleContentStyleUpdate" />
    </fieldset>

    <fieldset style="grid-column: 1 / -1">
      <legend>item</legend>
      <GridPicker kind="item" @updateStyle="handleItemStyleUpdate" />
    </fieldset>

    <!-- <GridInput id="align-items" v-model="alignItems" :items="gridItemsValues" -->
    <!--   >align-items</GridInput -->
    <!-- > -->
    <!-- <GridInput v-model="justifyItems" :items="gridItemsValues" -->
    <!--   >justify-items</GridInput -->
    <!-- > -->
    <!-- <GridInput v-model="placeItems" :items="gridItemsValues" -->
    <!--   >place-items</GridInput -->
    <!-- > -->

    <!-- <GridInput v-model="alignContent" :items="gridContentValues" -->
    <!--   >align-content</GridInput -->
    <!-- > -->
    <!-- <GridInput v-model="justifyContent" :items="gridContentValues" -->
    <!--   >justify-content</GridInput -->
    <!-- > -->
    <!-- <GridInput v-model="placeContent" :items="gridContentValues" -->
    <!--   >place-content</GridInput -->
    <!-- > -->
  </div>

  <div class="wrapper">
    <strong>Grid</strong>
    <div class="grid" :class="classes" :style="contentStyleList">
      <div
        v-for="item of items"
        :key="item.id"
        class="grid-row"
        :class="classes"
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

<script lang="ts" setup>
import { computed, ref } from "vue";

import GridInput from "../components/grid-borders/GridInput.vue";
import GridPicker from "../components/grid-borders/GridPicker.vue";

interface Item {
  id: number;
  class: (string | Record<string, unknown>)[];
  text: string;
  special: boolean;
}

type ItemRow = { items: Item[]; specialRow: boolean };

// CSS Grid *-items:
//   - align-items
//   - align-self
//   - justify-items
//   - justify-self
//   - place-items
//   - place-self
const gridItemsValues = [
  "auto",
  "normal",
  "start",
  "end",
  "center",
  "stretch",
  "baseline",
  "first baseline",
  "last baseline",
];

// CSS Grid *-content:
//   - align-content
//   - justify-content
//   - place-content
const gridContentValues = [
  "normal",
  "start",
  "end",
  "center",
  "stretch",
  "space-around",
  "space-between",
  "space-evenly",
  "baseline",
  "first baseline",
  "last baseline",
];

const columnCount = ref(3);
const itemCount = ref(15);

const alignItems = ref();
const alignSelf = ref();
const justifyItems = ref();
const justifySelf = ref();
const placeItems = ref();
const placeSelf = ref();
const alignContent = ref();
const justifyContent = ref();
const placeContent = ref();

const classes = {
  "grid-align-items": alignItems.value,
  "grid-justify-items": justifyItems.value,
  "grid-place-items": placeItems.value,
  "grid-align-content": alignContent.value,
  "grid-justify-content": justifyContent.value,
  "grid-place-content": placeContent.value,
};

const selfClasses = {
  "grid-align-self": alignSelf.value,
  "grid-justify-self": justifySelf.value,
  "grid-place-self": placeSelf.value,
};

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
  })
);

const list = computed<Map<number, ItemRow>>(() =>
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
  }, new Map())
);

// const contentStyleList = ref<string[]>([]);
// const itemStyleList = ref<string[]>([]);

const contentStyleList = ref();
const itemStyleList = ref();

function handleContentStyleUpdate({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  contentStyleList.value = `${name}: ${value};`;
}

function handleItemStyleUpdate({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  itemStyleList.value = `${name}: ${value};`;
}
</script>

<style scoped>
.input-group {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, auto));
  padding: 1em;
}

.grid-align-items {
  align-items: v-bind("alignItems");
}

.grid-align-self {
  align-self: v-bind("alignSelf");
}

.grid-justify-items {
  justify-items: v-bind("justifyItems");
}

.grid-justify-self {
  justify-self: v-bind("justifySelf");
}

.grid-place-items {
  place-items: v-bind("placeItems");
}

.grid-place-self {
  place-self: v-bind("placeSelf");
}

.grid-align-content {
  align-content: v-bind("alignContent");
}

.grid-justify-content {
  justify-content: v-bind("justifyContent");
}

.grid-place-content {
  place-content: v-bind("placeContent");
}

.wrapper {
  --border-color: blue;
  --border-width: 1px;

  --column-count: v-bind("columnCount");

  /* --align-items: v-bind("alignItems"); */
  /* --justify-items: v-bind("justifyItems"); */
  /* --place-items: v-bind("placeItems"); */

  /* --align-content: v-bind("alignContent"); */
  /* --justify-content: v-bind("justifyContent"); */
  /* --place-content: v-bind("placeContent"); */

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
}

.special::before {
  /* .special::after { */
  content: "*";
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);
  /* justify-content: var(--justify-content); */
  /* justify-items: var(--justify-items); */
  row-gap: var(--border-width);
  background-color: var(--border-color);
}

.grid .grid-row {
  display: grid;
  background-color: white;
}

.grid .grid-row {
}

.subgrid {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);
  /* justify-content: var(--justify-content); */
}

.subgrid .row {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  /* justify-content: var(--justify-content); */
}

.contents {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);
}

.contents .row {
  /* grid-column: 1 / -1; */
  display: contents;
}

.contents .item {
  /* border-top: 1px solid purple; */
}

.list .row {
  display: grid;
  grid-auto-flow: column;
  /* justify-content: var(--justify-content); */
}

.list .row:nth-child(n + 2) {
  /* border-top: var(--border-width) solid var(--border-color); */
}

.table .row:nth-child(n + 2) {
  /* border-top: var(--border-width) solid var(--border-color); */
}

.table-grid .row {
  display: grid;
  grid-template-columns: repeat(var(--column-count), auto);
  /* justify-content: var(--justify-content); */
}

:where(.subgrid, .contents, .list, .table-grid, .table)
  .special-row:nth-child(n + 2) {
  /* :where(.subgrid, .list, .table-grid, .table) .special-row:not(:first-child) { */
  border-top: 1px solid green;
}
</style>
