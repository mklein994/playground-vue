<script setup lang="ts">
import { ref } from "vue";

import ChromaticTuner from "@/components/chromatic-tuner/ChromaticTuner.vue";

import { useEventListener } from "@/use/use-event-listener";
import { usePitch } from "@/use/use-pitch";
import type { PitchDetectionMethod } from "@/use/use-pitch-detector";
import { pitchDetectionMethods } from "@/use/use-pitch-detector";
import { useTuner } from "@/use/use-tuner";

const referenceHz = ref(440);

const detectionMethod = ref<PitchDetectionMethod>("McLeod");
const { power, frequency } = useTuner(detectionMethod);

const { name, cents } = usePitch(() => frequency.value ?? 0, referenceHz);

// Power off the tuner when not visible
const wasPoweredOn = ref(power.value);
useEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (wasPoweredOn.value) {
      power.value = true;
    }
  } else {
    wasPoweredOn.value = power.value;
    if (wasPoweredOn.value) {
      power.value = false;
    }
  }
});
</script>

<template>
  <div class="tuner-experiment">
    <ChromaticTuner
      v-model:is-on="power"
      v-model:reference-hz="referenceHz"
      :pitch-cents="cents"
      :pitch-name="name"
      class="chromatic-tuner"
    ></ChromaticTuner>

    <form class="settings" @submit.prevent>
      <div class="pv-input-wrapper">
        <label for="detection-method" class="pv-label">Detection Method</label>
        <select
          id="detection-method"
          v-model="detectionMethod"
          class="pv-select tw:form-select"
        >
          <option
            v-for="method of pitchDetectionMethods"
            :key="method"
            :value="method"
          >
            {{ method }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<style>
.tuner-experiment {
  display: grid;
  height: 100dvh;
  align-content: center;
  padding: var(--pv-b-spacing-4);
  gap: var(--pv-b-spacing-4);
  justify-items: stretch;

  .chromatic-tuner {
    max-width: var(--pv-b-container-3xl);
    max-height: calc(100dvh - 2 * var(--pv-b-spacing-4));
    margin-inline: auto;
  }

  .settings {
    display: grid;
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: var(--pv-b-container-3xl);
  }
}
</style>
