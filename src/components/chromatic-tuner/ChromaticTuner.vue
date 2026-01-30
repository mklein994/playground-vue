<script setup lang="ts">
import { computed } from "vue";

import LedLight from "@/components/chromatic-tuner/LedLight.vue";

import type { NoteName } from "@/use/use-pitch";
import { useResetCss } from "@/use/use-reset-css";

const { pitchCents, pitchName } = defineProps<{
  pitchCents: number | undefined;
  pitchName: NoteName | undefined;
}>();

const isOn = defineModel<boolean>("isOn", { default: true });
const referenceHz = defineModel<number>("referenceHz", { default: 440 });

useResetCss();

const referenceHzDisplay = computed(() => referenceHz.value);
const cents = computed(() => {
  if (!isOn.value || pitchCents == null || Number.isNaN(pitchCents)) {
    return null;
  }

  return pitchCents;
});

const formatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: "always",
});

const pitchCentsDisplay = computed(() => formatter.format(cents.value ?? 0));

const handleCalibrationUpClick = () => {
  if (referenceHz.value < 480) {
    referenceHz.value += 1;
  }
};

const handleCalibrationDownClick = () => {
  if (referenceHz.value > 410) {
    referenceHz.value -= 1;
  }
};

const handlePowerClick = () => {
  isOn.value = !isOn.value;
};

const flatPower = computed<number>(() =>
  Math.abs(Math.min(0, cents.value ?? 0)),
);
const tunePower = computed<number>(() => 1 - Math.abs(cents.value ?? 1));
const sharpPower = computed<number>(() => Math.max(0, cents.value ?? 0));

const flatPowerDisplay = computed(() => formatter.format(flatPower.value));
const tunePowerDisplay = computed(() => formatter.format(tunePower.value));
const sharpPowerDisplay = computed(() => formatter.format(sharpPower.value));
</script>

<template>
  <div class="chromatic-tuner">
    <div class="lights">
      <div class="light-group flat">
        <div class="light-label">♭</div>
        <LedLight
          light-color="red"
          :power-percentage="flatPower"
          class="light"
        ></LedLight>
        <pre>{{ flatPowerDisplay }}</pre>
      </div>
      <div class="light-group tuned">
        <div class="light-label">▽</div>
        <LedLight
          light-color="green"
          :power-percentage="tunePower"
          class="light"
        ></LedLight>
        <pre>{{ tunePowerDisplay }}</pre>
      </div>
      <div class="light-group sharp">
        <div class="light-label">♯</div>
        <LedLight
          light-color="red"
          :power-percentage="sharpPower"
          class="light"
        ></LedLight>
        <pre>{{ sharpPowerDisplay }}</pre>
      </div>
    </div>

    <div class="screen" :class="{ off: !isOn }">
      <div class="reference-hz">
        {{ referenceHzDisplay }}<span class="hz-unit">Hz</span>
      </div>

      <div class="note">{{ pitchName }}</div>

      <div class="cents">{{ pitchCentsDisplay }}</div>
    </div>

    <div class="speaker-grill">
      <span v-for="i of 8 * 4" :key="i" class="speaker-hole"></span>
    </div>

    <div class="controls">
      <button type="button" :disabled="!isOn" class="control sound-button">
        SOUND
      </button>
      <button
        type="button"
        :disabled="!isOn"
        class="control calib-down-button"
        @click="handleCalibrationDownClick"
      >
        ▼
      </button>
      <button
        type="button"
        :disabled="!isOn"
        class="control calib-up-button"
        @click="handleCalibrationUpClick"
      >
        ▲
      </button>
      <button
        type="button"
        class="power-button"
        @click="handlePowerClick"
      ></button>
    </div>

    <div class="product-label">
      <span class="model-top">CA-1</span>
      <span class="model-bottom">CHROMATIC</span>
      <span class="logo">KORG</span>
    </div>
  </div>
</template>

<style>
.chromatic-tuner {
  container: tuner / inline-size;
  display: grid;
  grid-template-areas:
    "lights ."
    "screen speaker"
    "controls label";
  grid-template-columns: 3fr 2fr;
  gap: var(--pv-b-spacing-3);
  align-items: center;

  aspect-ratio: 16 / 9;
  width: 100%;
  padding: var(--pv-b-spacing-5);
  border-radius: 2% / 50%;

  color: var(--pv-b-color-gray-700);

  background-color: var(--pv-b-color-amber-100);
  outline: 2px solid var(--pv-b-color-gray-900);
  outline-offset: -5px;

  .lights {
    display: grid;
    grid-area: lights;
    grid-template-columns: repeat(3, 1fr);
    row-gap: var(--pv-b-spacing-2);
    align-self: end;
    justify-content: space-evenly;

    width: 100%;
    padding-inline: var(--pv-b-spacing-9);

    color: black;

    .light-group {
      display: grid;
      /* grid-row-end: span 2; */
      grid-row-end: span 3;
      grid-template-rows: subgrid;
      justify-items: center;
    }

    .light {
      width: var(--pv-b-spacing-4);
    }
  }

  .screen {
    --bg: #3b505d;
    --fg: oklch(from black l c h / 0.8);

    --font-size-md: clamp(
      var(--pv-b-font-size-sm),
      5cqw,
      var(--pv-b-font-size-3xl)
    );
    --font-line-height-md: clamp(
      var(--pv-b-font-line-height-sm),
      5cqw,
      var(--pv-b-font-line-height-3xl)
    );

    position: relative;

    display: flex;
    grid-area: screen;
    flex-wrap: wrap;
    justify-content: space-between;

    aspect-ratio: 9 / 4;
    padding: var(--pv-b-spacing-2);
    border: 1px solid var(--pv-b-color-gray-700);
    border-radius: var(--pv-b-radius-xs);

    color: var(--fg);
    text-shadow: 2px 2px color-mix(in oklch, var(--fg), var(--bg) 90%);

    background-color: var(--bg);
    box-shadow: var(--pv-b-inset-shadow-sm);

    &.off::after {
      content: "";
      position: absolute;
      inset: 0;
      background: inherit;
    }

    .cents {
      width: 100%;
      font-size: 3rem;
      font-variant-numeric: tabular-nums;
    }

    .reference-hz {
      font-family: "DSEG7 Modern Mini", monospace;
      font-size: var(--font-size-md);
      line-height: var(--font-line-height-md);

      .hz-unit {
        font-family: var(--pv-b-font-family-sans);
        font-size: 0.5em;
        font-style: normal;
        line-height: normal;
      }
    }

    .note {
      width: 2ch;
      font-family: "DSEG14 Modern Mini", monospace;
      font-size: var(--font-size-md);
      line-height: var(--font-line-height-md);
    }
  }

  .speaker-grill {
    display: grid;
    grid-area: speaker;
    grid-template-columns: repeat(8, 1fr);
    place-content: space-evenly;
    place-items: center;

    aspect-ratio: 8 / 4;

    .speaker-hole {
      width: 1cqw;
      height: 1cqw;
      border-radius: 50%;
      background: var(--pv-b-color-gray-500);
    }
  }

  .controls {
    display: flex;
    grid-area: controls;
    gap: var(--pv-b-spacing-4);
    align-items: center;

    .control {
      width: 2rem;
      height: 1rem;
      border: 1px solid var(--pv-b-color-gray-700);
      border-radius: var(--pv-b-radius-full);

      font: var(--pv-b-font-2xs);
    }

    .power-button {
      width: 2rem;
      height: 1rem;
      margin-left: auto;
      border: 1px solid var(--pv-b-color-red-900);
      border-radius: var(--pv-b-radius-full);

      background-color: var(--pv-b-color-red-700);

      &:hover {
        background-color: var(--pv-b-color-red-600);
      }

      &:active {
        background-color: var(--pv-b-color-red-800);
      }
    }
  }

  .product-label {
    display: grid;
    grid-area: label;
    align-self: end;
    justify-items: end;

    margin-top: -2rem;

    .model-top,
    .model-bottom {
      font-size: 1rem;
    }

    .logo {
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
</style>
