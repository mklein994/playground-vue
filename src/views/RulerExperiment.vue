<script setup lang="ts">
import { computed, inject, ref, useTemplateRef, watchEffect } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";
import { useMetaViewport } from "@/use/use-meta-viewport";
import { useResetCss } from "@/use/use-reset-css";
import { useRulerOptions } from "@/use/use-ruler-options";

useMetaViewport(["viewport-fit", "cover"]);

useResetCss();

const tailwindEnabled = inject(tailwindEnabledKey)!;

const rulerExperiment = useTemplateRef<HTMLDivElement>("rulerExperiment");
const ruler = useTemplateRef<HTMLOListElement>("ruler");

const toMetric = (inches: number) => inches / 2.54;

const width = window.screen.width;
const height = window.screen.height;

const { rulerOptions, resetOptions } = useRulerOptions();
const majorTickCount = computed(() => {
  const opts = rulerOptions.value;
  return opts.rulerUnit === "metric"
    ? opts.metricMajorTickCount
    : opts.imperialMajorTickCount;
});

const handleTopResetClick = (e: Event) => {
  e.preventDefault();
  resetOptions(["rulerOrientation", "rulerUnit"]);
};

const handleBottomResetClick = (e: Event) => {
  e.preventDefault();
  resetOptions([
    "metricMajorTickCount",
    "imperialMajorTickCount",
    "usePadding",
  ]);
};

const scrollLock = ref(false);
watchEffect(() => {
  if (scrollLock.value) {
    ruler.value!.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
});

const orientationLock = ref(false);
const orientationLockSupported = ref("lock" in window.screen.orientation);
const handleOrientationLockToggle = async () => {
  if (!document.fullscreenElement || !orientationLockSupported.value) {
    return;
  }

  if (orientationLock.value) {
    window.screen.orientation.unlock();
  } else {
    const currentOrientation = window.screen.orientation.type;
    try {
      await window.screen.orientation.lock(currentOrientation);
    } catch {
      orientationLockSupported.value = false;
      return;
    }
  }

  orientationLock.value = !orientationLock.value;
};

const baseSize = computed(() => {
  const size =
    Math.sqrt(width ** 2 + height ** 2) / rulerOptions.value.screenSizeInches;
  if (rulerOptions.value.rulerUnit === "metric") {
    return toMetric(size);
  } else {
    return size;
  }
});

const minorTickCount = computed(() =>
  rulerOptions.value.rulerUnit === "metric" ? 10 : 32,
);

const screenSizeDisplay = computed(() =>
  rulerOptions.value.screenSizeInches.toLocaleString([], {
    style: "unit",
    unit: "inch",
    unitDisplay: "narrow",
  }),
);
const screenSizeDisplayMetric = computed(() =>
  toMetric(rulerOptions.value.screenSizeInches).toLocaleString([], {
    style: "unit",
    unit: "centimeter",
    maximumFractionDigits: 2,
  }),
);

const isLarge = computed(
  () =>
    majorTickCount.value
    > (rulerOptions.value.rulerUnit === "metric" ? 50 : 12 * 3),
);

const handleToggleFullscreenClick = async () => {
  const el = rulerExperiment.value!;
  if (document.fullscreenElement == null) {
    await el.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
};

const handleTickKeydown = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;

  const isArrowKey = ["ArrowUp", "ArrowDown"].includes(e.key);
  if (e.altKey || e.ctrlKey || e.metaKey || !(e.shiftKey && isArrowKey)) {
    return;
  }

  e.preventDefault();

  const getClosest = (from: number, to: number): number =>
    Math.round(from / to) * to;

  const up = e.key === "ArrowUp";
  if (target.id === "metric-major-tick-count") {
    const newAmount = Math.max(
      10,
      getClosest(rulerOptions.value.metricMajorTickCount, 10)
        + 10 * (up ? 1 : -1),
    );
    rulerOptions.value.metricMajorTickCount = newAmount;
  } else if (target.id === "imperial-major-tick-count") {
    const newAmount = Math.max(
      12,
      getClosest(rulerOptions.value.imperialMajorTickCount, 12)
        + 12 * (up ? 1 : -1),
    );
    rulerOptions.value.imperialMajorTickCount = newAmount;
  }
};
</script>

<template>
  <div
    ref="rulerExperiment"
    class="ruler-experiment"
    :class="[
      rulerOptions.rulerOrientation,
      rulerOptions.rulerUnit,
      {
        'scroll-lock': scrollLock,
        'tailwind-disabled': !tailwindEnabled,
        'no-padding': !rulerOptions.usePadding,
        'is-large': isLarge,
      },
    ]"
  >
    <form class="options" @submit.prevent>
      <fieldset class="options-fieldset">
        <div class="input-wrapper">
          <label for="screen-size">Screen Size</label>
          <input
            id="screen-size"
            v-model="rulerOptions.screenSizeInches"
            type="number"
            min="0"
            step="0.01"
            size="5"
            class="tw:form-input"
          />
          <output>{{ screenSizeDisplay }}</output>
          <output> ({{ screenSizeDisplayMetric }})</output>
        </div>

        <div class="input-wrapper">
          <label for="ruler-orientation">Ruler Orientation</label>
          <select
            id="ruler-orientation"
            v-model="rulerOptions.rulerOrientation"
            class="tw:form-select"
          >
            <option value="portrait">Vertical</option>
            <option value="landscape">Horizontal</option>
          </select>
        </div>

        <div class="input-wrapper">
          <label for="ruler-unit">Ruler Unit</label>
          <select
            id="ruler-unit"
            v-model="rulerOptions.rulerUnit"
            class="tw:form-select"
          >
            <option value="imperial">Imperial</option>
            <option value="metric">Metric</option>
          </select>
        </div>

        <button type="reset" class="reset-button" @click="handleTopResetClick">
          Reset to Defaults
        </button>
      </fieldset>

      <fieldset class="options-fieldset">
        <div class="input-wrapper">
          <label for="imperial-major-tick-count">Ticks (Imperial)</label>
          <input
            id="imperial-major-tick-count"
            v-model="rulerOptions.imperialMajorTickCount"
            type="number"
            min="2"
            size="5"
            :disabled="rulerOptions.rulerUnit === 'metric'"
            class="tw:form-input"
            @keydown="handleTickKeydown"
          />
        </div>

        <div class="input-wrapper">
          <label for="metric-major-tick-count">Ticks (Metric)</label>
          <input
            id="metric-major-tick-count"
            v-model="rulerOptions.metricMajorTickCount"
            type="number"
            min="2"
            size="5"
            :disabled="rulerOptions.rulerUnit === 'imperial'"
            class="tw:form-input"
            @keydown="handleTickKeydown"
          />
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

        <div class="input-wrapper">
          <input
            id="use-padding"
            v-model="rulerOptions.usePadding"
            type="checkbox"
            class="tw:form-checkbox"
          />
          <label for="use-padding">Use Padding</label>
        </div>

        <button
          type="reset"
          class="reset-button"
          @click="handleBottomResetClick"
        >
          Reset to Defaults
        </button>
      </fieldset>

      <button type="button" @click="handleToggleFullscreenClick">
        Toggle Fullscreen
      </button>

      <div class="input-wrapper orientation-lock-wrapper">
        <input
          id="orientation-lock"
          type="checkbox"
          :checked="orientationLock"
          :disabled="!orientationLockSupported"
          @input="handleOrientationLockToggle"
        />
        <label for="orientation-lock">Lock Orientation</label>
      </div>
    </form>

    <ol ref="ruler" class="ruler">
      <template v-for="majorTick of majorTickCount + 1" :key="majorTick - 1">
        <li
          v-for="minorTick of majorTick === majorTickCount + 1
            ? 1
            : minorTickCount"
          :key="minorTick - 1"
          class="tick"
          :class="{ 'major-ticks': minorTick === 1 }"
          :style="{
            '--major-tick': majorTick - 1,
            '--minor-tick': minorTick - 1,
          }"
        ></li>
      </template>
    </ol>
  </div>
</template>

<style>
@counter-style ticks {
  system: extends decimal;
}

.ruler-experiment {
  --base: calc(v-bind("baseSize") * 1px);
  --minor-base: calc(var(--base) / v-bind("minorTickCount"));
  --ruler-block-size: 1rem;
  --tick-marker-padding: 0.5rem;
  --ruler-transform: initial;
  --tick-color: light-dark(
    var(--pv-base-color-slate-700),
    var(--pv-base-color-slate-600)
  );

  position: relative;
  width: 100dvw;
  height: 100dvh;

  .fullscreen-button {
    max-width: max-content;
  }

  #orientation-lock:disabled + label::after {
    content: " (Tried; not supported)";
  }

  &::backdrop {
    background: Canvas;
  }

  .orientation-lock-wrapper {
    display: none;
  }

  &:fullscreen .orientation-lock-wrapper {
    display: block;
  }

  &.no-padding {
    --tick-marker-padding: 0px;
  }

  &.tailwind-disabled .options :where(input, select, button) {
    all: revert;
  }

  .options {
    position: fixed;
    z-index: 1;

    display: grid;
    overflow: auto;
    max-width: max-content;
    padding: 1rem;
    gap: 1rem;
    justify-items: start;

    #screen-size {
      max-width: 7rem;
    }

    .options-fieldset {
      display: grid;
      margin: 0.5rem;
      gap: 0.5rem;
      place-items: start;

      .input-wrapper {
        display: flex;
        gap: 0.25rem;
      }
    }

    .reset-button {
      margin-top: 1rem;
    }
  }

  &.portrait .options {
    right: 0;
    max-height: calc(100dvh - 4rem);
  }

  &.landscape .options {
    top: calc(var(--ruler-block-size) * 2);
    left: 0;
    max-height: calc(100dvh - var(--ruler-block-size) * 2);
  }

  .ruler {
    position: absolute;
    display: flex;
    overflow: auto;
    max-width: 100dvw;
    max-height: 100dvh;

    counter-reset: var(--reset, ticks -1);
    transform: var(--ruler-transform);
  }

  .tick {
    position: absolute;
    border: none;
    background: var(--tick-color);

    --offset: calc(
      var(--major-tick) * var(--base) + var(--minor-tick) * var(--minor-base)
    );
    --tick-length: calc(
      var(--len, var(--default-tick-len, 0.25)) * var(--ruler-block-size)
    );

    --tick-content: counter(ticks);

    &::after {
      position: absolute;
      content: "";
      font-family: monospace;
      font-size: 0.8rem;
    }
  }

  &.scroll-lock .ruler {
    overflow: hidden;
  }

  &.portrait {
    overflow-y: hidden;

    &.no-padding {
      --ruler-transform: translateY(1px);
    }

    .ruler {
      bottom: 0;
      width: 100dvw;
      height: calc(
        2 * var(--tick-marker-padding) + (v-bind("majorTickCount") + 1) *
          var(--base)
      );
      flex-direction: column-reverse;
    }

    .tick {
      bottom: var(--offset);
      width: var(--tick-length);
      height: 1px;
      margin-block: var(--tick-marker-padding);

      &::after {
        top: 0;
        right: 0;
        transform: translate(100%, -50%);
      }
    }
  }

  &.landscape {
    &.no-padding {
      --ruler-transform: translateX(-1px);
    }

    .ruler {
      width: calc(
        2 * var(--tick-marker-padding) + (v-bind("majorTickCount") + 1) *
          var(--base)
      );
      height: 100dvh;
      grid-auto-flow: column;
    }

    .tick {
      left: var(--offset);
      width: 1px;
      height: var(--tick-length);
      margin-inline: var(--tick-marker-padding);

      &::after {
        bottom: 0;
        left: 0;
        transform: translate(-50%, 100%);
      }
    }
  }

  &.imperial .tick {
    --default-tick-len: 0;

    &:where(:nth-child(-n + 32), :nth-last-child(-n + 32)) {
      --default-tick-len: 0.25;
    }

    &:nth-child(2n + 1) {
      --len: 0.35;
    }

    &:nth-child(4n + 1) {
      --len: 0.5;
    }

    &:nth-child(16n + 1) {
      --len: 0.75;
    }

    &:nth-child(32n + 1) {
      --len: 1;
      counter-increment: var(--inc, ticks);

      &::after {
        content: var(--tick-content) "\2033";
      }
    }
  }

  &.metric {
    .tick {
      &:nth-child(5n + 1) {
        --len: 0.65;
      }

      &:nth-child(10n + 1) {
        --len: 1;
        background: light-dark(
          var(--pv-base-color-slate-500),
          var(--pv-base-color-slate-400)
        );
        counter-increment: var(--inc, ticks);

        &::after {
          content: var(--tick-content);
        }
      }
    }
  }

  &.metric:where(.is-large) .tick {
    &:nth-child(n + 1 of .major-ticks) {
      &::after {
        content: none;
      }
    }

    &:nth-child(5n + 1 of .major-ticks) {
      --len: 1.25;
    }

    &:nth-child(10n + 1 of .major-ticks) {
      --len: 1.5;
      &::after {
        content: var(--tick-content);
      }
    }

    &:nth-child(100n + 1 of .major-ticks) {
      --len: 1.75;
    }
  }

  &.imperial:where(.is-large) .tick {
    &:nth-child(12n + 1 of .major-ticks) {
      --len: 2;
    }
  }

  &.no-padding .tick:nth-child(1 of .major-ticks)::after {
    content: none;
  }
}
</style>
