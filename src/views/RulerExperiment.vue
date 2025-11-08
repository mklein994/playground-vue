<script setup lang="ts">
import { computed, inject, ref } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";
import { useResetCss } from "@/use/use-reset-css";
import { useRulerOptions } from "@/use/use-ruler-options";

useResetCss();

const toMetric = (inches: number) => inches / 2.54;

const tailwindEnabled = inject(tailwindEnabledKey)!;

const width = window.screen.width;
const height = window.screen.height;

const { rulerOptions, resetAllExceptScreenSize } = useRulerOptions();

const handleResetButtonClick = (e: Event) => {
  e.preventDefault();
  resetAllExceptScreenSize();
};

const scrollLock = ref(false);

const baseSize = computed(() => {
  const size =
    Math.sqrt(width ** 2 + height ** 2) / rulerOptions.value.screenSizeInches;
  if (rulerOptions.value.rulerUnit === "metric") {
    return toMetric(size);
  } else {
    return size;
  }
});

const majorTickCount = computed(() => {
  const opts = rulerOptions.value;
  if (opts.fullLength) {
    const maxLength = opts.rulerOrientation === "portrait" ? height : width;
    return Math.floor((maxLength - 1) / baseSize.value);
  } else {
    return opts.rulerUnit === "metric" ? 30 : 12;
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
</script>

<template>
  <div
    class="ruler-experiment"
    :class="[
      rulerOptions.rulerOrientation,
      rulerOptions.rulerUnit,
      {
        'scroll-lock': scrollLock,
        'tailwind-disabled': !tailwindEnabled,
        'no-padding': !rulerOptions.usePadding,
        'full-length': rulerOptions.fullLength,
      },
    ]"
  >
    <form class="options" @submit.prevent>
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

      <fieldset>
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

        <div class="input-wrapper">
          <input
            id="full-length"
            v-model="rulerOptions.fullLength"
            type="checkbox"
            class="tw:form-checkbox"
          />
          <label for="full-length">Full Length</label>
        </div>

        <button
          type="reset"
          class="reset-button"
          @click="handleResetButtonClick"
        >
          Reset to Defaults
        </button>
      </fieldset>
    </form>

    <ol class="ruler">
      <ol
        v-for="majorTick of majorTickCount + 1"
        :key="majorTick - 1"
        class="major-ticks"
        :style="`--major-tick: ${majorTick - 1}`"
      >
        <li
          v-for="minorTick of majorTick === majorTickCount + 1
            ? 1
            : minorTickCount"
          :key="minorTick - 1"
          class="tick"
          :style="`--minor-tick: ${minorTick - 1}`"
        ></li>
      </ol>
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
  --ruler-block-size: 3rem;
  --tick-marker-padding: 0.5rem;
  --ruler-transform: initial;

  &.no-padding {
    --tick-marker-padding: 0px;
  }

  .options {
    position: fixed;
    z-index: 1;
    max-width: max-content;
    margin: 2rem;
  }

  &.tailwind-disabled .options {
    input,
    select,
    button {
      all: revert;
    }
  }

  .ruler {
    position: absolute;
    overflow: auto;
    max-width: 100dvw;
    max-height: 100dvh;

    counter-reset: var(--reset, ticks -1);
    inset: 0;
    transform: var(--ruler-transform);
  }

  .tick {
    position: absolute;
    border: none;
    background: AccentColor;

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

  &.imperial .tick {
    --default-tick-len: 0;

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
        content: var(--tick-content) "″";
      }
    }
  }

  &.metric .tick {
    &:nth-child(5n + 1) {
      --len: 0.65;
    }

    &:nth-child(10n + 1) {
      --len: 1;
      counter-increment: var(--inc, ticks);

      &::after {
        content: var(--tick-content);
      }
    }
  }

  &.scroll-lock .ruler {
    overflow: hidden;
  }

  &.portrait {
    &.no-padding {
      --ruler-transform: translateY(-1px);
    }

    .options {
      inset-inline-end: 0;
    }

    .ruler {
      width: 100dvw;
      height: calc(
        2 * var(--tick-marker-padding) + (v-bind("majorTickCount") + 1) *
          var(--base)
      );

      .tick {
        width: var(--tick-length);
        height: 1px;
        inset-block-start: var(--offset);
        margin-block: var(--tick-marker-padding);

        &::after {
          inset-block-start: 0;
          inset-inline-end: 0;
          transform: translate(100%, -50%);
        }
      }
    }
  }

  &.landscape {
    &.no-padding {
      --ruler-transform: translateX(-1px);
    }

    .options {
      inset-block-start: var(--ruler-block-size);
      inset-inline-start: 0;
    }

    .ruler {
      width: calc(
        2 * var(--tick-marker-padding) + (v-bind("majorTickCount") + 1) *
          var(--base)
      );
      height: 100dvh;

      .tick {
        width: 1px;
        height: var(--tick-length);
        inset-inline-start: var(--offset);
        margin-inline: var(--tick-marker-padding);

        &::after {
          inset-block-end: 0;
          inset-inline-start: 0;
          transform: translate(-50%, 100%);
        }
      }
    }
  }

  &.imperial .ruler .major-ticks:where(:first-child, :nth-last-child(2)) .tick {
    --default-tick-len: 0.25;

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
    }
  }

  &.no-padding .major-ticks:first-child .tick:first-child::after {
    content: none;
  }
}
</style>
