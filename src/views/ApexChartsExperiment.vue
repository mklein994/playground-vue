<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
import { computed, inject } from "vue";
import ApexCharts from "vue3-apexcharts";

import { resolvedSchemeKey } from "@/injectionKeys";

const resolvedScheme = inject(resolvedSchemeKey)!;

const series = computed<ApexOptions["series"]>(() => [
  {
    data: Array.from({ length: 10 }, (_, i) => i),
  },
]);

const options = computed<ApexOptions>(() => ({
  chart: {
    type: "line",
    zoom: { enabled: false },
  },
  theme: {
    mode: resolvedScheme.value,
  },
}));
</script>

<template>
  <div class="apex-charts-experiment"></div>
  <div class="chart-wrapper">
    <ApexCharts
      height="100%"
      width="100%"
      :series="series"
      :options="options"
      class="chart"
    ></ApexCharts>
  </div>
</template>

<style scoped>
.chart-wrapper {
  --padding: 1rem;
  padding: var(--padding);
}

.chart {
  height: calc(100vh - 2 * var(--padding));

  & :deep(svg) {
    display: block;
  }
}
</style>
