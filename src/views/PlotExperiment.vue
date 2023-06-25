<script setup lang="ts">
import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { ref } from "vue";

import PlotGraph from "@/components/PlotGraph";

const options = ref<PlotOptions>({
  marks: [
    Plot.rectY(
      { length: 1_000 },
      Plot.binX({ y: "count" }, { x: d3.randomNormal() })
    ),
  ],
});
</script>

<template>
  <PlotGraph :options="options" />
</template>
