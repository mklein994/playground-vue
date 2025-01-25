<script setup lang="ts">
import * as d3 from "d3";
import { computed, ref, watch, watchEffect } from "vue";

import SwatchSample from "@/components/SwatchSample.vue";

const getInitialValues = () => ({
  petals: 250,
  petalLimit: 1000,
  selectedPaletteId: "YlGn" as BaseColor,
  paletteReverse: true,
  scaleId: "radial",
});

const form = ref(getInitialValues());

const currentPetals = ref(form.value.petals);

const GOLDEN_ANGLE = 180 * (3 - Math.sqrt(5));

const values = computed(() =>
  Array.from({ length: form.value.petals }, (_, i) => i),
);

const angles = computed(() => values.value.map((x) => x * GOLDEN_ANGLE));

const scales = computed(() => [
  { id: "linear", scale: d3.scaleLinear },
  { id: "pow", scale: d3.scalePow },
  { id: "sqrt", scale: d3.scaleSqrt },
  { id: "radial", scale: d3.scaleRadial },
]);

const scale = computed(
  () => scales.value.find((x) => x.id === form.value.scaleId)!.scale,
);

interface PaletteEntry {
  id: string;
  palette: (i: number) => string;
  swatch: readonly string[];
}

const scaleTo = (from: number, to: number) =>
  scale.value([0, currentPetals.value - 1], [from, to]);

const interpolateSwatch = (fn: (i: number) => string): readonly string[] =>
  d3.ticks(0, 1, 9).map((i) => fn(i));

const divergingPalettes = computed<PaletteEntry[]>(() => [
  { id: "BrBG", palette: d3.interpolateBrBG, swatch: d3.schemeBrBG[9] },
  { id: "PRGn", palette: d3.interpolatePRGn, swatch: d3.schemePRGn[9] },
  { id: "PiYG", palette: d3.interpolatePiYG, swatch: d3.schemePiYG[9] },
  { id: "PuOr", palette: d3.interpolatePuOr, swatch: d3.schemePuOr[9] },
  { id: "RdBu", palette: d3.interpolateRdBu, swatch: d3.schemeRdBu[9] },
  { id: "RdGy", palette: d3.interpolateRdGy, swatch: d3.schemeRdGy[9] },
  { id: "RdYlBu", palette: d3.interpolateRdYlBu, swatch: d3.schemeRdYlBu[9] },
  { id: "RdYlGn", palette: d3.interpolateRdYlGn, swatch: d3.schemeRdYlGn[9] },
  {
    id: "Spectral",
    palette: d3.interpolateSpectral,
    swatch: d3.schemeSpectral[9],
  },
]);

const sequentialPalettes = computed<PaletteEntry[]>(() => [
  { id: "Blues", palette: d3.interpolateBlues, swatch: d3.schemeBlues[9] },
  { id: "Greens", palette: d3.interpolateGreens, swatch: d3.schemeGreens[9] },
  { id: "Greys", palette: d3.interpolateGreys, swatch: d3.schemeGreys[9] },
  {
    id: "Oranges",
    palette: d3.interpolateOranges,
    swatch: d3.schemeOranges[9],
  },
  {
    id: "Purples",
    palette: d3.interpolatePurples,
    swatch: d3.schemePurples[9],
  },
  { id: "Reds", palette: d3.interpolateReds, swatch: d3.schemeReds[9] },
  {
    id: "Turbo",
    palette: d3.interpolateTurbo,
    swatch: interpolateSwatch(d3.interpolateTurbo),
  },
  {
    id: "Viridis",
    palette: d3.interpolateViridis,
    swatch: interpolateSwatch(d3.interpolateViridis),
  },
  {
    id: "Inferno",
    palette: d3.interpolateInferno,
    swatch: interpolateSwatch(d3.interpolateInferno),
  },
  {
    id: "Magma",
    palette: d3.interpolateMagma,
    swatch: interpolateSwatch(d3.interpolateMagma),
  },
  {
    id: "Plasma",
    palette: d3.interpolatePlasma,
    swatch: interpolateSwatch(d3.interpolatePlasma),
  },
  {
    id: "Cividis",
    palette: d3.interpolateCividis,
    swatch: interpolateSwatch(d3.interpolateCividis),
  },
  {
    id: "Warm",
    palette: d3.interpolateWarm,
    swatch: interpolateSwatch(d3.interpolateWarm),
  },
  {
    id: "Cool",
    palette: d3.interpolateCool,
    swatch: interpolateSwatch(d3.interpolateCool),
  },
  {
    id: "CubehelixDefault",
    palette: d3.interpolateCubehelixDefault,
    swatch: interpolateSwatch(d3.interpolateCubehelixDefault),
  },
  { id: "BuGn", palette: d3.interpolateBuGn, swatch: d3.schemeBuGn[9] },
  { id: "BuPu", palette: d3.interpolateBuPu, swatch: d3.schemeBuPu[9] },
  { id: "GnBu", palette: d3.interpolateGnBu, swatch: d3.schemeGnBu[9] },
  { id: "OrRd", palette: d3.interpolateOrRd, swatch: d3.schemeOrRd[9] },
  { id: "PuBuGn", palette: d3.interpolatePuBuGn, swatch: d3.schemePuBuGn[9] },
  { id: "PuBu", palette: d3.interpolatePuBu, swatch: d3.schemePuBu[9] },
  { id: "PuRd", palette: d3.interpolatePuRd, swatch: d3.schemePuRd[9] },
  { id: "RdPu", palette: d3.interpolateRdPu, swatch: d3.schemeRdPu[9] },
  { id: "YlGnBu", palette: d3.interpolateYlGnBu, swatch: d3.schemeYlGnBu[9] },
  { id: "YlGn", palette: d3.interpolateYlGn, swatch: d3.schemeYlGn[9] },
  { id: "YlOrBr", palette: d3.interpolateYlOrBr, swatch: d3.schemeYlOrBr[9] },
  { id: "YlOrRd", palette: d3.interpolateYlOrRd, swatch: d3.schemeYlOrRd[9] },
]);

const palettesGrouped = computed(() => [
  ["Diverging", divergingPalettes.value] as const,
  ["Sequential", sequentialPalettes.value] as const,
]);

const palettesFlat = computed(() =>
  palettesGrouped.value.flatMap(([kind, palettes]) =>
    palettes.map((colors) => ({ ...colors, kind })),
  ),
);

type BaseColor<T = typeof d3> = keyof {
  [K in keyof T as K extends `scheme${infer P}` ? P : never]: T[K];
};

// type SchemeColor<T = typeof d3> = keyof {
//   [K in keyof T as K extends `scheme${string}` ? K : never]: T[K];
// };

// type InterpolateFooColor<T = typeof d3> = keyof {
//   [K in keyof T as K extends `interpolate${string}` ? K : never]: T[K];
// };

// type InterpolateColor<T = typeof d3> = keyof {
//   [K in keyof T as K extends `scheme${infer P}`
//     ? `interpolate${P}`
//     : never]: T[K];
// };

const swatch = computed(() => {
  const id = form.value.selectedPaletteId;
  const selected = palettesFlat.value.find((x) => x.id === id)!;
  return selected.swatch as string[];
  // const schemeId = `scheme${id}`;
  // if (schemeId in d3) {
  //   return d3[schemeId as SchemeColor][9];
  // } else {
  //   const interpolateId = `interpolate${id}`;
  //   if (interpolateId in d3) {
  //     return d3.ticks(0, 1, 9).map((i) => d3[interpolateId as InterpolateFooColor](i)) as string[];
  //   } else {
  //     return [];
  //   }
  // }
});

const palette = computed(
  () =>
    palettesFlat.value.find((x) => x.id === form.value.selectedPaletteId)!
      .palette,
);
const colorScale = computed(() =>
  form.value.paletteReverse ? scaleTo(1, 0) : scaleTo(0, 1),
);

const items = computed(() =>
  angles.value.map((angle, i) => {
    const norm = colorScale.value(i);

    const color = d3.color(palette.value(norm))!;
    const stroke = color.copy().darker();
    stroke.opacity = 0.25;
    const fill = color.copy();

    const height = scaleTo(25, 0)(i);
    const start = 50 - height;
    const width = scaleTo(5, 0)(i);

    return {
      value: angle,
      stroke: stroke.formatRgb(),
      fill: fill.formatRgb(),
      start,
      height,
      width,
    };
  }),
);

const handleResetClick = (event: Event) => {
  if (event.defaultPrevented) {
    return;
  }

  event.preventDefault();

  stopAnimation();
  form.value = getInitialValues();
};

const animationHandle = ref<number | NodeJS.Timeout | null>(null);
const animate = () => {
  currentPetals.value = 1;
  animationHandle.value = setInterval(() => {
    if (currentPetals.value < form.value.petals) {
      currentPetals.value++;
    } else {
      stopAnimation();
    }
  }, 50);
};

const pauseAnimation = () => {
  if (!animationHandle.value) {
    return;
  }

  clearTimeout(animationHandle.value);
  animationHandle.value = null;
};

const stopAnimation = () => {
  pauseAnimation();
  currentPetals.value = form.value.petals;
};

watchEffect(() => {
  currentPetals.value = form.value.petals;
});
</script>

<template>
  <div class="golden-ratio-experiment">
    <form class="form" @submit.prevent>
      <button type="reset" @click="handleResetClick">Reset</button>
      <button v-if="!animationHandle" type="button" @click="animate">
        Animate
      </button>
      <button v-else type="button" @click="pauseAnimation">Pause</button>
      <button v-if="animationHandle" @click="stopAnimation">Stop</button>
      <output v-if="animationHandle" class="current-petal-count"
        >{{ currentPetals }} / {{ form.petals }}</output
      >

      <select id="palette" v-model="form.selectedPaletteId">
        <optgroup
          v-for="[kind, paletteItems] of palettesGrouped"
          :key="kind"
          :label="kind"
        >
          <option
            v-for="paletteItem of paletteItems"
            :key="paletteItem.id"
            :value="paletteItem.id"
          >
            {{ paletteItem.id }}
          </option>
        </optgroup>
      </select>

      <SwatchSample v-if="swatch" :colors="swatch"></SwatchSample>

      <input
        id="palette-reverse"
        v-model="form.paletteReverse"
        type="checkbox"
      />
      <label for="palette-reverse">Reverse Palette</label>

      <label for="petals">Petals</label>
      <input
        id="petals"
        v-model="form.petals"
        type="range"
        min="1"
        :max="form.petalLimit"
        list="list"
      />
      <output>{{ form.petals }}</output>

      <datalist id="list">
        <option value="250"></option>
      </datalist>

      <label for="petal-limit">Limit</label>
      <input id="petal-limit" v-model="form.petalLimit" type="number" min="1" />
    </form>

    <TransitionGroup
      name="list"
      tag="svg"
      viewBox="0 0 100 100"
      class="golden-ratio"
    >
      <ellipse
        v-for="(item, i) of items"
        :key="i"
        cx="50"
        :cy="item.start"
        :rx="item.width"
        :ry="item.height"
        :stroke="item.stroke"
        stroke-width="0.125"
        :fill="item.fill"
        :transform="`rotate(${item.value})`"
        transform-origin="center"
      ></ellipse>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.golden-ratio {
  display: block;
  width: 80vmin;
}

.form {
  display: grid;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  gap: 0.5rem 1rem;
  grid-auto-columns: auto;
  grid-auto-flow: column;
}

.current-petal-count {
  display: flex;
  width: 100%;
  text-wrap: nowrap;
}
</style>
