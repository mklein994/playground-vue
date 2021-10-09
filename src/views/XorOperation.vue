<template>
  <div class="table-wrapper">
    <table class="xor-operation">
      <thead class="header">
        <tr class="row">
          <th class="cell">key</th>
          <th class="cell">P</th>
          <th class="cell">Q</th>
          <th class="cell">R</th>
          <th class="cell">S</th>
          <th class="cell">t1</th>
          <th class="cell">t2</th>
          <th class="cell">result</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="{ key, p, q, r, s, t1, t2, result } of map"
          :key="key"
          class="row"
        >
          <td class="cell">{{ key }}</td>
          <td class="cell">{{ p }}</td>
          <td class="cell">{{ q }}</td>
          <td class="cell">{{ r }}</td>
          <td class="cell">{{ s }}</td>
          <td class="cell" :class="t1 ? 'true' : 'false'">{{ t1 }}</td>
          <td class="cell" :class="t2 ? 'true' : 'false'">{{ t2 }}</td>
          <td class="cell" :class="result ? 'true' : 'false'">{{ result }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <Highlightjs language="ts" :code="test1Code" class="code" />

  <Highlightjs language="ts" :code="test2Code" class="code" />
</template>

<script lang="ts" setup>
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("ts", typescript);

const Highlightjs = hljsVuePlugin.component;

interface Pqrs {
  p: string | null;
  q: string | null;
  r: string | null;
  s: string | null;
}

const data: Pqrs[] = [
  { p: "foo", q: "foo", r: "foo", s: "foo" },
  { p: "foo", q: "foo", r: "foo", s: null },
  { p: "foo", q: "foo", r: null, s: "foo" },
  { p: "foo", q: "foo", r: null, s: null },
  { p: "foo", q: null, r: "foo", s: "foo" },
  { p: "foo", q: null, r: "foo", s: null },
  { p: "foo", q: null, r: null, s: "foo" },
  { p: "foo", q: null, r: null, s: null },
  { p: null, q: "foo", r: "foo", s: "foo" },
  { p: null, q: "foo", r: "foo", s: null },
  { p: null, q: "foo", r: null, s: "foo" },
  { p: null, q: "foo", r: null, s: null },
  { p: null, q: null, r: "foo", s: "foo" },
  { p: null, q: null, r: "foo", s: null },
  { p: null, q: null, r: null, s: "foo" },
  { p: null, q: null, r: null, s: null },
];

function test1({ p, q, r, s }: Pqrs) {
  return (p === q && r === s) || (p !== q && r !== s);
}

function test2({ p, q, r, s }: Pqrs) {
  return (p === q) === (r === s);
}

const map = data.map((row) => {
  const key = Object.values(row)
    .map((cell) => (cell == null ? 0 : 1))
    .join("");

  const t1 = test1(row);
  const t2 = test2(row);
  const result = t1 === t2;

  return { key, ...row, t1, t2, result };
});

const test1Code = `${test1}`.replaceAll(/\n {4}/g, "\n");
const test2Code = `${test2}`.replaceAll(/\n {4}/g, "\n");
</script>

<style scoped>
.table-wrapper {
  margin: 1em;
  overflow: auto;
}

.xor-operation {
  border-collapse: separate;
  border-spacing: 0;
}

.cell {
  font-family: monospace;
  font-size: 1rem;
  padding-inline: 0.5em;
  border: 1px solid lightgray;
}

.header .cell {
  position: sticky;
  inset-block-start: 0;
  border-block-end: 2px solid black;
  background: white;
}

.cell:first-child {
  position: sticky;
  inset-inline-start: 0;
  background: white;
  border-inline-end: 2px solid black;
  z-index: 1;
}

.header .cell:first-child {
  z-index: 2;
}

.cell.true {
  color: green;
}

.cell.false {
  color: red;
}

.code {
  white-space: pre;
}
</style>

<style>
@import "highlight.js/styles/github-dark-dimmed.css";
</style>
