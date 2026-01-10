import type { MaybeRefOrGetter } from "vue";
import { computed, onBeforeUnmount, ref, toValue, watch } from "vue";

import { useAudioFrequency } from "@/use/use-audio-frequency";
import { useMicrophoneAnalyzer } from "@/use/use-microphone-analyzer";

export const notes = [
  "C",
  "C♮",
  "D",
  "D♮",
  "E",
  "F",
  "F♮",
  "G",
  "G♮",
  "A",
  "A♮",
  "B",
] as const;

export type PitchName = (typeof notes)[number];

export interface UseTunerOptions {
  referenceHz: number;
}

export const useTuner = (referenceHz: MaybeRefOrGetter<number>) => {
  // The tuner must start off, since the Web Audio API requires user
  // interaction before using audio devices.
  const power = ref(false);

  const frequency = ref<number | null>(null);
  const pitchDetails = computed(() => {
    if (frequency.value == null) {
      return {
        name: undefined,
        cents: undefined,
        octave: undefined,
      };
    } else {
      const num = 12 * Math.log2(frequency.value / toValue(referenceHz)) + 69;
      const roundedNote = Math.round(num);
      return {
        name: notes[roundedNote % 12],
        cents: Math.floor((num - roundedNote) * 100),
        centsRaw: num - roundedNote,
        octave: Math.floor(roundedNote / 12) - 1,
      };
    }
  });

  let cleanPitchDetector: (() => void) | undefined = undefined;
  const timer = ref<number>();

  const start = async () => {
    const { context, analyzer, stopMicrophone } = await useMicrophoneAnalyzer();
    const { getFrequency } = useAudioFrequency(context, analyzer);

    cleanPitchDetector = () => {
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
  };

  watch(power, async (isOn) => {
    if (isOn) {
      await start();
    } else if (cleanPitchDetector != null) {
      cleanPitchDetector?.();
      cleanPitchDetector = undefined;
    }
  });

  onBeforeUnmount(() => {
    cleanPitchDetector?.();
  });

  return {
    power,
    pitchCents: computed(() => pitchDetails.value.cents),
    pitchName: computed(() => pitchDetails.value.name),
    frequency: computed(() => frequency.value),
    details: pitchDetails,
  };
};
