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
          <th v-for="name of headerNames" :key="name" class="cell">
            {{ name }}
          </th>
          <th class="cell">result</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="{ key, p, q, r, s, results, result } of map"
          :key="key.join('')"
          class="row"
        >
          <td class="cell">
            <span
              v-for="i of key"
              :key="i"
              :style="{ color: i ? 'green' : 'lightgray' }"
              >{{ i }}</span
            >
          </td>
          <td class="cell">{{ p }}</td>
          <td class="cell">{{ q }}</td>
          <td class="cell">{{ r }}</td>
          <td class="cell">{{ s }}</td>
          <td
            v-for="(res, i) of results"
            :key="i"
            class="cell"
            :class="res ? 'true' : 'false'"
          >
            {{ res }}
          </td>
          <td class="cell" :class="result ? 'true' : 'false'">{{ result }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <Highlightjs
    v-for="(code, i) of testCode"
    :key="i"
    language="ts"
    :code="code"
    class="code"
  />
</template>

<script lang="ts" setup>
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("ts", typescript);

const Highlightjs = hljsVuePlugin.component;

type Pqrs = Record<"p" | "q" | "r" | "s", string | null>;

const data: Pqrs[] = [
  { p: null, q: null, r: null, s: null },
  { p: null, q: null, r: null, s: "foo" },
  { p: null, q: null, r: "foo", s: null },
  { p: null, q: null, r: "foo", s: "foo" },
  { p: null, q: "foo", r: null, s: null },
  { p: null, q: "foo", r: null, s: "foo" },
  { p: null, q: "foo", r: "foo", s: null },
  { p: null, q: "foo", r: "foo", s: "foo" },
  { p: "foo", q: null, r: null, s: null },
  { p: "foo", q: null, r: null, s: "foo" },
  { p: "foo", q: null, r: "foo", s: null },
  { p: "foo", q: null, r: "foo", s: "foo" },
  { p: "foo", q: "foo", r: null, s: null },
  { p: "foo", q: "foo", r: null, s: "foo" },
  { p: "foo", q: "foo", r: "foo", s: null },
  { p: "foo", q: "foo", r: "foo", s: "foo" },
];

const tests: ((pqrs: Pqrs) => boolean)[] = [
  /**
   * Explicitly check P = Q XOR R = S
   */
  ({ p, q, r, s }) => (p === q && r === s) || (p !== q && r !== s),
  /**
   * Same as above, but shorter
   */
  ({ p, q, r, s }) => (p === q) === (r === s),
];

const map = data.map((row) => {
  const key = Object.values(row).map((cell) => (cell == null ? 0 : 1));

  const results = tests.map((test) => test(row));
  const result = results.every((x) => x === results[0]);

  return { key, ...row, results, result };
});

const headerNames = Array.from(map[0].results, (_, i) => `t${i}`);

// Convert functions to strings
const testCode = tests.map((test) => `${test}`);
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
