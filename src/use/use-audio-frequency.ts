import type { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";

import { autoCorrelate } from "@/helpers/autoCorrelate";

export const useAudioFrequency = (
  audioContext: MaybeRefOrGetter<AudioContext>,
  analyzerNode: MaybeRefOrGetter<AnalyserNode>,
) => {
  const context = toValue(audioContext);
  const analyzer = toValue(analyzerNode);

  const bufferLength = analyzer.fftSize;
  const buffer = new Float32Array(bufferLength);

  const getFrequency = () => {
    analyzer.getFloatTimeDomainData(buffer);
    return autoCorrelate(buffer, context.sampleRate);
  };

  return {
    getFrequency,
  };
};
