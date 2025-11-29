<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

import { scale } from "@/helpers/scale";

interface Orientation {
  alpha: number;
  beta: number;
  gamma: number;
  absolute: boolean;
}

const orientation = ref<Orientation | null>(null);

const listening = ref(false);

const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
  orientation.value = {
    alpha: e.alpha!,
    absolute: e.absolute,
    beta: e.beta!,
    gamma: e.gamma!,
  };
};

watch(listening, (listen) => {
  if (listen) {
    window.addEventListener(
      "deviceorientationabsolute",
      handleDeviceOrientation,
    );
  } else {
    window.removeEventListener(
      "deviceorientationabsolute",
      handleDeviceOrientation,
    );
    orientation.value = null;
  }
});

const rawRotation = computed(() => orientation.value?.alpha);
const rotation = computed(() => rawRotation.value ?? 0);

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(min, value), max);

const getLevelValue = (value: number) =>
  scale(clamp(-90, value, 90), -90, 90, 1, -1);

const levelX = computed(() => getLevelValue(orientation.value?.gamma ?? 0));
const levelY = computed(() => getLevelValue(orientation.value?.beta ?? 0));

const bearing = computed(() => {
  const angle = rawRotation.value;
  if (angle == null) {
    return "--°";
  }

  return (
    ((360 - angle) % 360).toLocaleString([], {
      style: "unit",
      unit: "degree",
      unitDisplay: "narrow",
      maximumFractionDigits: 0,
    }) ?? "--°"
  );
});

const points = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
const heading = computed(() => {
  if (rawRotation.value == null) {
    return "";
  }

  const len = points.length;
  for (let i = 0; i < len; i++) {
    if (rawRotation.value < (360 / len) * i + 360 / len / 2) {
      return points[i];
    }
  }

  return points[0];
});

const isCardinal = computed(
  () => rawRotation.value != null && Math.round(rawRotation.value) % 90 === 0,
);

const toFixed = (n: number, places: number) => {
  const factor = 10 ** places;
  return Math.round(n * factor) / factor;
};

const isLevel = computed(
  () =>
    orientation.value?.beta != null
    && orientation.value?.gamma != null
    && toFixed(levelX.value, 2) === 0
    && toFixed(levelY.value, 2) === 0,
);

onBeforeUnmount(() => {
  listening.value = false;
});
</script>

<template>
  <div class="device-orientation-experiment">
    <div class="settings">
      <input id="listening" v-model="listening" type="checkbox" />
      <label for="listening">Listening</label>

      <pre>{{ orientation }}</pre>
    </div>

    <div class="static-container">
      <output class="coord" :class="{ 'is-cardinal': isCardinal }"
        >{{ bearing }} {{ heading }}</output
      >

      <div class="svg-compass-container">
        <svg viewBox="0 0 200 200" class="svg-compass">
          <circle cx="100" cy="100" r="65" class="circle"></circle>

          <path
            d="M 100,0 l 10,33 l -10,-5 l -10,5 z"
            class="point north"
          ></path>
          <text x="100" y="50" class="cardinal north">N</text>

          <path
            d="M 100,10 l 10,23 l -10,-5 l -10,5 z"
            class="point east"
          ></path>
          <text x="150" y="100" class="cardinal east">E</text>

          <path
            d="M 100,10 l 10,23 l -10,-5 l -10,5 z"
            class="point south"
          ></path>
          <text x="100" y="150" class="cardinal south">S</text>

          <path
            d="M 100,10 l 10,23 l -10,-5 l -10,5 z"
            class="point west"
          ></path>
          <text x="50" y="100" class="cardinal west">W</text>

          <svg
            viewBox="0 0 100 100"
            x="63"
            y="63"
            width="75"
            height="75"
            class="level"
            :class="{ 'is-level': isLevel }"
          >
            <circle cx="50" cy="50" r="49"></circle>

            <g id="line">
              <path d="M 50,40 v 20"></path>
              <path d="M 40,50 h 20"></path>
            </g>

            <use href="#line" class="line"></use>
            <use href="#line" class="line live"></use>
          </svg>
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
.device-orientation-experiment {
  position: relative;
  overflow: hidden;
  width: 100svw;
  height: 100svh;
  align-content: center;
  --rotation: calc(v-bind("rotation") * 1deg);

  .settings {
    position: absolute;
    inset-block-start: 1rem;
    inset-inline-start: 1rem;
  }

  .static-container {
    display: grid;
    justify-content: center;
    gap: 1rem;
  }

  .coord {
    font-size: 3rem;
    font-variant-numeric: tabular-nums;
    text-align: center;

    &.is-cardinal {
      color: var(--pv-base-color-orange-500);
    }
  }

  .svg-compass-container {
    width: 75vmin;
    height: 75vmin;
    rotate: var(--rotation);

    .svg-compass {
      fill: none;
      stroke: none;

      .circle {
        stroke: light-dark(
          var(--pv-base-color-neutral-950),
          var(--pv-base-color-neutral-200)
        );
      }

      .point {
        fill: light-dark(
          var(--pv-base-color-neutral-100),
          var(--pv-base-color-neutral-600)
        );

        rotate: var(--angle);
        stroke: light-dark(
          var(--pv-base-color-neutral-950),
          var(--pv-base-color-neutral-200)
        );
        transform-origin: center;

        &.north {
          fill: light-dark(
            var(--pv-base-color-orange-300),
            var(--pv-base-color-orange-600)
          );
        }

        &.east {
          --angle: 90deg;
        }

        &.south {
          --angle: 180deg;
        }

        &.west {
          --angle: 270deg;
        }
      }
    }

    .cardinal {
      dominant-baseline: central;
      fill: light-dark(
        var(--pv-base-color-neutral-950),
        var(--pv-base-color-neutral-50)
      );
      font-family: serif;
      rotate: calc(-1 * var(--rotation));
      text-anchor: middle;
      transform-box: fill-box;
      transform-origin: center;
    }

    .cardinal,
    .level {
      rotate: calc(-1 * var(--rotation));
      transform-origin: center;
    }

    .level {
      stroke: var(--pv-base-color-neutral-100);
      stroke-width: 1px;

      &.is-level {
        --color: var(--pv-base-color-orange-500);
      }

      .line {
        &.live {
          stroke: var(--color, var(--pv-base-color-neutral-300));

          --factor: 50px;
          --x: calc(v-bind("levelX") * var(--factor));
          --y: calc(v-bind("levelY") * var(--factor));
          transform: translate(var(--x), var(--y));
          transform-box: view-box;
          transform-origin: center;
        }
      }
    }
  }
}
</style>
