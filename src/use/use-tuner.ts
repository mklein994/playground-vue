import type { MaybeRefOrGetter } from "vue";
import { computed, onBeforeUnmount, ref, watch } from "vue";

import { useMicrophoneAnalyzer } from "@/use/use-microphone-analyzer";
import {
  type PitchDetectionMethod,
  useAudioFrequency,
} from "@/use/use-pitch-detector";

export interface UseTunerOptions {
  referenceHz: number;
}

export const useTuner = (
  detectionMethod: MaybeRefOrGetter<PitchDetectionMethod>,
) => {
  // The tuner must start off, since the Web Audio API requires user
  // interaction before using audio devices.
  const power = ref(false);

  const frequency = ref<number | null>(null);

  let stopTuner: (() => void) | undefined = undefined;
  const timer = ref<number>();

  watch(power, async (isOn) => {
    if (isOn) {
      const { source, analyzer, stopMicrophone } =
        await useMicrophoneAnalyzer();
      const { getFrequency } = useAudioFrequency(
        analyzer,
        source,
        detectionMethod,
      );

      stopTuner = () => {
        if (timer.value != null) {
          cancelAnimationFrame(timer.value);
          timer.value = undefined;
          frequency.value = null;
        }

        stopMicrophone();
      };

      const update = () => {
        timer.value = requestAnimationFrame(update);
        frequency.value = getFrequency();
      };

      update();
    } else if (stopTuner != null) {
      stopTuner?.();
      stopTuner = undefined;
    }
  });

  onBeforeUnmount(() => {
    stopTuner?.();
  });

  return {
    power,
    frequency: computed(() => frequency.value),
  };
};
