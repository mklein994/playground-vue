<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import { clamp } from "@/helpers/clamp";
import { scale } from "@/helpers/scale";
import {
  OrientationKind,
  useDeviceOrientation,
} from "@/use/use-device-orientation";
import { useScreenOrientation } from "@/use/use-screen-orientation";

const levelEl = useTemplateRef<SVGSVGElement>("levelEl");
const { screenOrientation } = useScreenOrientation();

const selectedOrientationKind = window.matchMedia("(any-pointer: fine)").matches
  ? OrientationKind.Mouse
  : OrientationKind.Device;
const { listening, orientation, reset } = useDeviceOrientation(
  selectedOrientationKind,
  screenOrientation,
  levelEl,
);

const handleReset = (e: Event) => {
  e.preventDefault();
  reset();
};

const levelX = computed(() =>
  scale(clamp(-90, orientation.value?.horizontal ?? 0, 90), -90, 90, -1, 1),
);
const levelY = computed(() =>
  scale(clamp(-90, orientation.value?.vertical ?? 0, 90), -90, 90, -1, 1),
);

const isLevelOverride = ref(false);
const isLevel = computed(
  () =>
    isLevelOverride.value
    || (listening.value
      && Math.round(orientation.value?.vertical ?? 0) === 0
      && Math.round(orientation.value?.horizontal ?? 0) === 0),
);

const degreeFormatter = new Intl.NumberFormat([], {
  style: "unit",
  unit: "degree",
  unitDisplay: "narrow",
  maximumFractionDigits: 0,
  signDisplay: "negative",
});
const horizontalDisplay = computed(() =>
  degreeFormatter.format((orientation.value?.horizontal ?? 0) * -1),
);
const verticalDisplay = computed(() =>
  degreeFormatter.format(orientation.value?.vertical ?? 0),
);
</script>

<template>
  <div class="svg-level-experiment">
    <form class="settings" @submit.prevent>
      <div class="input-wrapper">
        <input
          id="is-level-override"
          v-model="isLevelOverride"
          type="checkbox"
          class="tw:form-checkbox"
        />
        <label for="is-level-override">Force "is level"</label>
      </div>

      <div class="input-wrapper">
        <input
          id="listening"
          v-model="listening"
          type="checkbox"
          class="tw:form-checkbox"
        />
        <label for="listening">Listening ({{ selectedOrientationKind }})</label>
      </div>

      <button type="reset" :disabled="listening" @click="handleReset">
        Reset
      </button>
    </form>

    <div class="angle-display vertical">
      <div class="angle">{{ verticalDisplay }}</div>
      <div class="label">Vertical</div>
    </div>

    <svg
      ref="levelEl"
      viewBox="0 0 80 80"
      width="80vmin"
      height="80vmin"
      class="level"
      :class="{ 'is-level': isLevel }"
    >
      <path d="M 40,0 v 80 M 0,40 h 80" class="ref-line" />
      <circle class="reference" />
      <circle v-for="r of 10" :key="r" class="ring" :style="`--r: ${r}`" />
      <circle class="live" />
    </svg>

    <div class="angle-display horizontal">
      <div class="angle">{{ horizontalDisplay }}</div>
      <div class="label">Horizontal</div>
    </div>
  </div>
</template>

<style>
.svg-level-experiment {
  display: grid;
  gap: 10vmin;
  place-content: center;
  place-items: center;

  height: 100svh;

  background: light-dark(
    var(--pv-b-color-neutral-50),
    var(--pv-b-color-neutral-950)
  );

  .settings {
    position: fixed;
    inset-block-start: 1rem;
    inset-inline-start: 1rem;

    .input-wrapper {
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }

    button {
      all: revert;
    }
  }

  .angle-display {
    text-align: center;

    .angle {
      font-family: sans-serif;
      font-size: 1.875rem;
      font-weight: bold;
      font-variant-numeric: tabular-nums;
      line-height: calc(2.25 / 1.875);
    }

    .label {
      font-family: sans-serif;
      font-size: 1.5rem;
      font-weight: bolder;
      line-height: calc(2 / 1.5);
      color: light-dark(
        var(--pv-b-color-neutral-400),
        var(--pv-b-color-neutral-500)
      );
    }
  }

  .level {
    --svg-level-shadow-color: rgb(from var(--border) r g b / 0.25);
    --border: light-dark(
      var(--pv-b-color-neutral-200),
      var(--pv-b-color-neutral-800)
    );
    --ref-radius: calc(100% / 2 / 3);
    --ring-count: 10;
    --default-fg: light-dark(
      var(--pv-b-color-neutral-200),
      var(--pv-b-color-neutral-700)
    );
    --fg: var(--default-fg);
    --accent: light-dark(
      var(--pv-b-color-orange-600),
      var(--pv-b-color-orange-500)
    );

    --exit-duration: 0.25s;
    --starting-duration: calc(3 * var(--exit-duration));
    --duration: var(--exit-duration);
    --highlight-ring-count: var(--ring-count);

    border: 1vmin solid var(--border);
    border-radius: 50%;

    box-shadow: var(--svg-level-shadow-color) 0px 25px 50px -12px;

    fill: none;
    stroke-width: 1px;

    transition-duration: var(--exit-duration);
    transition-property: box-shadow, border-color;

    .reference {
      cx: 50%;
      cy: 50%;
      r: var(--ref-radius);
      stroke-width: 2px;
    }

    .ring {
      --delta: calc(99% / 3 / var(--ring-count) - 0.5px / var(--ring-count));

      --delay: calc(
        var(--exit-duration) - var(--r) * var(--exit-duration) /
          var(--highlight-ring-count)
      );

      cx: 50%;
      cy: 50%;
      r: calc(var(--ref-radius) + var(--r) * var(--delta));

      transition-delay: var(--delay);
      transition-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
      transition-duration: var(--exit-duration);
      transition-property: stroke;
    }

    .ref-line,
    .ring {
      stroke: var(--fg);
      stroke-width: 0.5px;
    }

    .live {
      --max: max(abs(var(--x)), abs(var(--y)));

      --x: calc(-1 * v-bind("levelX"));
      --y: calc(-1 * v-bind("levelY"));
      --factor: calc(var(--ref-radius) * 2 - 5px);

      transform-origin: center;
      transform: translate(
        calc(var(--x) * var(--factor)),
        calc(var(--y) * var(--factor))
      );

      filter: drop-shadow(
        var(--accent) calc(var(--x) * 2px) calc(var(--y) * 2px)
          calc((1 - var(--max)) * 8px + 1px)
      );

      cx: 50%;
      cy: 50%;
      r: var(--ref-radius);
      stroke: var(--accent);
      stroke-width: 3px;

      transition-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
      transition-duration: var(--exit-duration);
      transition-property: stroke;
    }

    &.is-level {
      --accent: light-dark(
        var(--pv-b-color-lime-500),
        var(--pv-b-color-lime-700)
      );

      --border: light-dark(
        var(--pv-b-color-lime-600),
        var(--pv-b-color-lime-800)
      );
      --svg-level-shadow-color: oklab(
        from light-dark(var(--pv-b-color-lime-800), var(--pv-b-color-lime-500))
          l a b / 0.25
      );

      transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      transition-duration: var(--starting-duration);
      transition-property: box-shadow, border-color;

      .ring {
        stroke: color-mix(
          in oklab,
          var(--accent),
          var(--default-fg)
            calc(var(--r) * (100% / var(--highlight-ring-count)))
        );
        transition-delay: calc(
          pow(var(--r), 0.9) * var(--starting-duration) /
            var(--highlight-ring-count)
        );
        transition-timing-function: ease-in;
      }

      .live {
        stroke: light-dark(
          var(--pv-b-color-lime-700),
          var(--pv-b-color-lime-500)
        );
        transition-timing-function: ease-out;
        transition-duration: var(--starting-duration);
      }
    }
  }

  @media (orientation: landscape) {
    grid-auto-flow: column;
  }
}

@property --svg-level-shadow-color {
  inherits: false;
  initial-value: transparent;
  syntax: "<color>";
}
</style>
