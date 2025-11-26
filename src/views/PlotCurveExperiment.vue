<script setup lang="ts">
import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { computed, ref } from "vue";

import type { CurveOption } from "@/assets/plot-curve-options";
import { curves } from "@/assets/plot-curve-options";
import PlotGraph from "@/components/PlotGraph";

const curve = ref<CurveOption["id"]>("auto");
const tension = ref(1);

const hasTension = computed(
  () => !!curves.find((x) => x.id === curve.value)!.hasTension,
);

const getRandom = d3.randomInt(10);

const getData = () => Array.from({ length: 100 }, (_, i) => [i, getRandom()]);

const data = ref(getData());

const jiggle = () => {
  data.value = getData();
};

const options = computed<PlotOptions>(() => ({
  marks: [
    Plot.line(data.value, {
      curve: curve.value,
      tension: tension.value,
    }),
    Plot.dot(data.value),
  ],
}));
</script>

<template>
  <div class="plot-curve-experiment">
    <form class="form" @submit.prevent>
      <div class="input-group">
        <label for="curve">Curve:</label>
        <select id="curve" v-model="curve">
          <option
            v-for="curveItem of curves"
            :key="curveItem.id"
            :value="curveItem.id"
          >
            {{ curveItem.id }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label for="tension">Tension:</label>
        <input
          id="tension"
          v-model="tension"
          type="number"
          step="0.1"
          :disabled="!hasTension"
        />
      </div>

      <button type="button" @click="jiggle">Jiggle &#x1fae8;</button>
    </form>
    <PlotGraph :options="options"></PlotGraph>

    <details open>
      <summary>Curve Definitions</summary>

      <ul>
        <li
          v-for="curveItem of curves"
          :key="curveItem.id"
          class="curve-item"
          :class="{ active: curveItem.id === curve }"
          :data-version="curveItem.version"
        >
          <i class="curve-item-label" @click="curve = curveItem.id">{{
            curveItem.id
          }}</i>
          &ndash; {{ curveItem.description }}
        </li>
      </ul>
    </details>
  </div>
</template>

<style>
.plot-curve-experiment {
  padding: 1em;
  font-family: sans-serif;

  .form {
    display: grid;
    justify-content: start;
    gap: 1em 0.5em;
    justify-items: start;
  }

  .input-group {
    display: flex;
    gap: 0.5em;
  }

  .curve-item {
    .curve-item-label {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &.active .curve-item-label {
      --color: light-dark(
        var(--pv-base-color-blue-600),
        var(--pv-base-color-blue-400)
      );
      color: var(--color);

      &:hover {
        color: light-dark(
          var(--pv-base-color-blue-800),
          var(--pv-base-color-blue-300)
        );
      }
    }

    &[data-version]::after {
      display: inline-block;
      border-radius: 1em;
      background-color: light-dark(
        var(--pv-base-color-teal-100),
        var(--pv-base-color-teal-950)
      );
      color: light-dark(
        var(--pv-base-color-teal-700),
        var(--pv-base-color-teal-400)
      );
      content: attr(data-version);
      font-family: sans-serif;
      font-size: 0.75em;
      font-weight: 500;
      margin-inline-start: 1ch;
      padding-inline: calc(5 / 8 * 1em);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
}
</style>
