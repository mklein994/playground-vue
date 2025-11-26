<script setup lang="ts">
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("ts", typescript);

const Highlightjs = hljsVuePlugin.component;

type Pqrs = Record<"p" | "q" | "r" | "s", string | null>;

// Generate all combinations and map to Pqrs[]
const choices = 4;
const data: Pqrs[] = Array.from(
  { length: 2 ** choices },
  (_, index) =>
    Object.fromEntries(
      index
        .toString(2) // convert to binary
        .padStart(choices, "0")
        .split("")
        .map((x) => (x === "1" ? "foo" : null))
        .map((x, i) => [String.fromCharCode("p".charCodeAt(0) + i), x]), // map to keys p..s
    ) as Pqrs,
);

const tests: ((pqrs: Pqrs) => boolean)[] = [
  /**
   * Explicitly check P = Q XOR R = S
   */
  ({ p, q, r, s }) => (p === q && r === s) || (p !== q && r !== s),
  /**
   * Same as above, but shorter
   */
  ({ p, q, r, s }) => (p === q) === (r === s),

  /**
   * Found in some PHP code (translated here as an experiment)
   */
  ({ p, q }) => !!(p && q !== null),
  // NOTE: these are _not_ the same
  ({ p, q }) => !!p || q === null,
];

const map = data.map((row) => {
  const key = Object.values(row).map((cell) => (cell == null ? 0 : 1));

  const results = tests.map((test) => test(row));
  const result = results.every((x) => x === results[0]);

  return { key, ...row, results, result };
});

const headerNames = Array.from(map[0].results, (_, i) => `t${i}`);

// Convert functions to strings
const testCode = tests.map((test) => test.toString());
</script>

<template>
  <div class="xor-operation-experiment">
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
                :style="{
                  color: i ? 'forestgreen' : 'light-dark(lightgray, gray)',
                }"
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
            <td class="cell" :class="result ? 'true' : 'false'">
              {{ result }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Highlightjs
      v-for="(code, i) of testCode"
      :key="i"
      language="ts"
      :code="`// t${i}\n${code}`"
      class="code"
    ></Highlightjs>
  </div>
</template>

<style>
.xor-operation-experiment {
  .table-wrapper {
    overflow: auto;
    margin: 1em;
  }

  .xor-operation {
    border-collapse: separate;
    border-spacing: 0;
  }

  .cell {
    border: 1px solid lightgray;
    font-family: monospace;
    font-size: 1rem;
    padding-inline: 0.5em;

    &.true {
      color: forestgreen;
    }

    &.false {
      color: tomato;
    }
  }

  .header .cell {
    position: sticky;
    background: Canvas;
    border-block-end: 2px solid ButtonBorder;
    inset-block-start: 0;
  }

  .cell:first-child {
    position: sticky;
    z-index: 1;
    background: Canvas;
    border-inline-end: 2px solid ButtonBorder;
    inset-inline-start: 0;
  }

  .header .cell:first-child {
    z-index: 2;
  }

  .code {
    white-space: pre;
  }
}
</style>
