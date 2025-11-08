<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, watch } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";
import { useResetCss } from "@/use/use-reset-css";

useResetCss();

const tailwindEnabled = inject(tailwindEnabledKey)!;

const width = window.screen.width;
const height = window.screen.height;
const dpr = window.devicePixelRatio;

const useRulerOptions = () => {
  type UnitSystem = "metric" | "imperial";
  type RulerOrientation = "portrait" | "landscape";

  interface RulerOptions {
    screenSize: number;
    screenSizeUnit: UnitSystem;
    rulerUnit: UnitSystem;
    rulerOrientation: RulerOrientation;
  }

  const defaults: RulerOptions = {
    screenSize: 25,
    screenSizeUnit: "imperial",
    rulerUnit: "metric",
    rulerOrientation: window.screen.orientation.type.startsWith("portrait")
      ? "portrait"
      : "landscape",
  };

  const screenSize = ref(defaults.screenSize);
  const screenSizeUnit = ref<UnitSystem>(defaults.screenSizeUnit);
  const rulerUnit = ref<UnitSystem>(defaults.rulerUnit);
  const rulerOrientation = ref<RulerOrientation>(defaults.rulerOrientation);

  onBeforeMount(() => {
    const rulerOptionsText = localStorage.getItem("pvRulerOptions");
    const rulerOptions =
      rulerOptionsText == null
        ? defaults
        : {
            ...defaults,
            ...(JSON.parse(rulerOptionsText) as Partial<RulerOptions>),
          };

    screenSize.value = rulerOptions.screenSize;
    screenSizeUnit.value = rulerOptions.screenSizeUnit;
    rulerUnit.value = rulerOptions.rulerUnit;
    rulerOrientation.value = rulerOptions.rulerOrientation;
  });

  watch(
    [screenSize, screenSizeUnit, rulerUnit, rulerOrientation],
    (
      [newSize, newUnit, newRulerUnit, newRulerOrientstion],
      [oldSize, oldUnit, _oldRulerUnit, _oldRulerOrientation],
    ) => {
      let size = newSize;
      if (newUnit !== oldUnit && oldSize === newSize) {
        const conversionFactor = newUnit === "imperial" ? 1 / 2.54 : 2.54;
        const scaleFactor = 100;

        size = newSize * conversionFactor;
        size = Math.round(size * scaleFactor) / scaleFactor;

        screenSize.value = size;
      }
      const newOptions: RulerOptions = {
        screenSize: size,
        screenSizeUnit: newUnit,
        rulerUnit: newRulerUnit,
        rulerOrientation: newRulerOrientstion,
      };
      localStorage.setItem("pvRulerOptions", JSON.stringify(newOptions));
    },
  );

  return {
    screenSize,
    screenSizeUnit,
    rulerUnit,
    rulerOrientation,
  };
};

const { screenSize, screenSizeUnit, rulerUnit, rulerOrientation } =
  useRulerOptions();
const scrollLock = ref(false);

const baseSize = computed(
  () =>
    Math.sqrt(width ** 2 + height ** 2)
    / screenSize.value
    / (rulerUnit.value === "imperial" ? 1 : 2.54),
);
const majorTickCount = computed(() => (rulerUnit.value === "metric" ? 30 : 12));
</script>

<template>
  <div
    class="ruler-experiment"
    :class="[
      rulerOrientation,
      { 'scroll-lock': scrollLock, 'tailwind-disabled': !tailwindEnabled },
    ]"
  >
    <form class="options" @submit.prevent>
      <div class="input-wrapper">
        <label for="screen-size">Screen Size</label>
        <input
          id="screen-size"
          v-model="screenSize"
          type="number"
          min="0"
          step="0.01"
          size="5"
          class="tw:form-input"
        />

        <select
          id="screen-size-unit"
          v-model="screenSizeUnit"
          class="tw:form-select"
        >
          <option value="metric">cm</option>
          <option value="imperial">in</option>
        </select>
      </div>

      <div class="input-wrapper">
        <label for="ruler-unit">Ruler Unit</label>
        <select id="ruler-unit" v-model="rulerUnit" class="tw:form-select">
          <option value="imperial">Imperial</option>
          <option value="metric">Metric</option>
        </select>
      </div>

      <div class="input-wrapper">
        <label for="ruler-orientation">Ruler Orientation</label>
        <select
          id="ruler-orientation"
          v-model="rulerOrientation"
          class="tw:form-select"
        >
          <option value="portrait">Vertical</option>
          <option value="landscape">Horizontal</option>
        </select>
      </div>

      <div class="input-wrapper">
        <input
          id="scroll-lock"
          v-model="scrollLock"
          type="checkbox"
          class="tw:form-checkbox"
        />
        <label for="scroll-lock">Scroll Lock</label>
      </div>
    </form>

    <ol class="ruler" :data-orientation="rulerOrientation">
      <li
        v-for="tick of majorTickCount + 1"
        :key="tick - 1"
        class="tick"
        :style="`--tick: ${tick - 1}`"
      ></li>
    </ol>

    <pre class="dev">
width: {{ width }}
height: {{ height }}
dpr: {{ dpr }}
baseSize: {{ baseSize }}</pre
    >
  </div>
</template>

<style>
.ruler-experiment {
  --base: calc(v-bind("baseSize") * 1px);
  --ruler-block-size: 5rem;

  .options {
    position: fixed;
    z-index: 1;
    max-width: max-content;
    margin: 2rem;
  }

  &.tailwind-disabled .options {
    input,
    select {
      all: revert;
    }
  }

  .ruler {
    position: absolute;
    overflow: auto;
    max-width: 100dvw;
    max-height: 100dvh;

    counter-reset: ticks -1;
    inset: 0;
  }

  .tick {
    position: absolute;
    border: none;
    background: AccentColor;
    --offset: calc(var(--tick) * var(--base));
    --tick-length: calc(var(--len, 1) * var(--ruler-block-size));

    counter-increment: ticks;

    &::after {
      position: absolute;
      content: counter(ticks);
    }
  }

  &.scroll-lock .ruler {
    overflow: hidden;
  }

  &.portrait {
    .options {
      inset-inline-end: 0;
    }

    .ruler {
      width: 100dvw;
      height: calc(v-bind("majorTickCount") * var(--base));

      .tick {
        width: var(--tick-length);
        height: 1px;
        inset-block-start: var(--offset);

        &::after {
          inset-block-start: 0;
          inset-inline-end: 0;
          transform: translate(100%, -50%);
        }
      }
    }
  }

  &.landscape {
    .options {
      inset-block-start: var(--ruler-block-size);
      inset-inline-start: 0;
    }

    .ruler {
      width: calc(v-bind("majorTickCount") * var(--base));
      height: 100dvh;

      .tick {
        width: 1px;
        height: var(--tick-length);
        inset-inline-start: var(--offset);

        &::after {
          inset-block-end: 0;
          text-align: center;
          transform: translate(-50%, 100%);
        }
      }
    }
  }

  .dev {
    position: fixed;
    inset-block-end: 0;
    inset-inline-start: 0;
  }
}
</style>
