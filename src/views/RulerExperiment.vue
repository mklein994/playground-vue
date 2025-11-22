<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  ref,
  useTemplateRef,
  watchEffect,
} from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";
import { useMetaViewport } from "@/use/use-meta-viewport";
import { useResetCss } from "@/use/use-reset-css";
import { useRuler } from "@/use/use-ruler";
import { useRulerOptions } from "@/use/use-ruler-options";

useMetaViewport(["viewport-fit", "cover"]);

useResetCss();

const tailwindEnabled = inject(tailwindEnabledKey)!;

const rulerExperiment = useTemplateRef<HTMLDivElement>("rulerExperiment");
const ruler = useTemplateRef<HTMLOListElement>("ruler");

const toImperial = (cm: number) => cm / 2.54;
const toMetric = (inches: number) => inches * 2.54;

const width = window.screen.width;
const height = window.screen.height;

const { rulerOptions, resetOptions } = useRulerOptions();

const { majorTickCount, isLarge } = useRuler(rulerOptions);

const handleTopResetClick = (e: Event) => {
  e.preventDefault();
  resetOptions(["rulerOrientation", "rulerUnit"]);
};

const handleBottomResetClick = (e: Event) => {
  e.preventDefault();
  resetOptions(["usePadding"]);
};

const scrollLock = ref(true);
onMounted(() => {
  watchEffect(() => {
    if (scrollLock.value) {
      ruler.value!.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  });
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
    return toImperial(size);
  } else {
    return size;
  }
});

const screenDimensionsDisplay = computed(() => {
  const screenSize =
    rulerOptions.value.rulerUnit === "metric"
      ? toMetric(rulerOptions.value.screenSizeInches)
      : rulerOptions.value.screenSizeInches;
  const diagonalPixels = Math.sqrt(width ** 2 + height ** 2);
  const screenWidth = (screenSize / diagonalPixels) * width;
  const screenHeight = (screenSize / diagonalPixels) * height;

  const formatter = new Intl.NumberFormat([], {
    style: "unit",
    unit: rulerOptions.value.rulerUnit === "imperial" ? "inch" : "centimeter",
    unitDisplay: "narrow",
  });

  const screenWidthDisplay = formatter.format(screenWidth);
  const screenHeightDisplay = formatter.format(screenHeight);

  return `W: ${screenWidthDisplay} H: ${screenHeightDisplay}`;
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

const isLargeOverrideInput = ref<"yes" | "no" | "auto">("auto");
const isLargeOverride = computed(
  () =>
    ({
      yes: true,
      no: false,
      auto: null,
    })[isLargeOverrideInput.value],
);

const handleToggleFullscreenClick = async () => {
  const el = rulerExperiment.value!;
  if (document.fullscreenElement == null) {
    await el.requestFullscreen();
  } else {
    await document.exitFullscreen();
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
        'is-large': isLargeOverride ?? isLarge,
        'is-large-resolved': isLarge,
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
            max="100"
            class="tw:form-input"
          />
          <output>{{ screenSizeDisplay }}</output>
          <output> ({{ screenSizeDisplayMetric }})</output>
        </div>

        <output>{{ screenDimensionsDisplay }}</output>

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

      <fieldset class="options-is-large-group">
        <legend>Major Tick Count: {{ majorTickCount }}</legend>
        <input
          id="is-large-auto"
          v-model="isLargeOverrideInput"
          type="radio"
          name="isLargeOverride"
          value="auto"
          class="tw:form-radio"
        />
        <label for="is-large-auto">Auto</label>

        <input
          id="is-large-yes"
          v-model="isLargeOverrideInput"
          type="radio"
          name="isLargeOverride"
          value="yes"
          class="tw:form-radio"
          :class="{ default: isLarge }"
        />
        <label for="is-large-yes">Yes</label>

        <input
          id="is-large-no"
          v-model="isLargeOverrideInput"
          type="radio"
          name="isLargeOverride"
          value="no"
          class="tw:form-radio"
          :class="{ default: !isLarge }"
        />
        <label for="is-large-no">No</label>
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
          class="tw:form-checkbox"
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
  --default-tick-color: light-dark(
    var(--pv-base-color-slate-400),
    var(--pv-base-color-slate-600)
  );
  --medium-tick-color: light-dark(
    var(--pv-base-color-slate-600),
    var(--pv-base-color-slate-400)
  );
  --heavy-tick-color: light-dark(
    var(--pv-base-color-slate-950),
    var(--pv-base-color-slate-50)
  );
  --tick-color: var(--default-tick-color);

  position: relative;
  width: 100dvw;
  height: 100dvh;

  .fullscreen-button {
    max-width: max-content;
  }

  .options-is-large-group {
    input.default + label::after {
      color: var(--pv-base-color-neutral-500);
      content: " (auto default)";
      font-size: 0.8em;
    }
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

    .options-is-large-group {
      display: grid;
      align-items: baseline;
      margin: 0.5rem;
      gap: 0.5rem;
      grid-template-columns: auto auto;
    }

    .reset-button {
      margin-top: 1rem;
    }
  }

  &.portrait .options {
    top: env(safe-area-inset-top, 0px);
    right: env(safe-area-inset-right, 0px);
    max-height: calc(100dvh - 4rem);
    align-content: start;
  }

  &.landscape .options {
    --top-offset: calc(
      var(--ruler-block-size) * 2 + env(safe-area-inset-top, 0px)
    );
    top: var(--top-offset);
    left: env(safe-area-inset-left, 0px);
    max-height: calc(100dvh - var(--top-offset));
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
    text-wrap: nowrap;

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
      width: calc(
        var(--tick-length) + sign(abs(var(--tick-length))) *
          env(safe-area-inset-left, 0px)
      );
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
      height: calc(
        var(--tick-length) + sign(abs(var(--tick-length))) *
          env(safe-area-inset-top, 0px)
      );
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
      --tick-color: var(--heavy-tick-color);

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
        --tick-color: var(--heavy-tick-color);
        counter-increment: var(--inc, ticks);

        &::after {
          content: var(--tick-content);
        }
      }
    }
  }

  &.metric:where(.is-large) .tick {
    &:nth-child(n + 1 of .major-ticks) {
      --tick-color: var(--medium-tick-color);
      &::after {
        content: none;
      }
    }

    &:nth-child(5n + 1 of .major-ticks) {
      --len: 1.25;
    }

    &:nth-child(10n + 1 of .major-ticks) {
      --len: 1.5;
      --tick-color: var(--heavy-tick-color);
      &::after {
        content: var(--tick-content);
      }

      &:where(:nth-child(101))::after {
        content: var(--tick-content) " cm";
      }
    }

    &:nth-child(100n + 1 of .major-ticks) {
      --len: 1.75;
    }
  }

  &.imperial:where(.is-large) .tick {
    &:nth-child(n + 1 of .major-ticks) {
      --tick-color: var(--medium-tick-color);
    }

    &:nth-child(12n + 1 of .major-ticks) {
      --len: 2;
      --tick-color: var(--heavy-tick-color);
    }
  }

  &.no-padding .tick:nth-child(1 of .major-ticks)::after {
    content: none;
  }
}
</style>
