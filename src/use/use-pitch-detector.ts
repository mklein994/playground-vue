import PitchFinder from "pitchfinder";
import { PitchDetector } from "pitchy";
import type { MaybeRefOrGetter } from "vue";
import { computed, toValue } from "vue";

export const pitchDetectionMethods = [
  "YIN",
  "AMDF",
  "ACF2PLUS",
  "DynamicWavelet",
  "McLeod",
] as const;

export type PitchDetectionMethod = (typeof pitchDetectionMethods)[number];

export const useAudioFrequency = (
  analyzerNode: MaybeRefOrGetter<AnalyserNode>,
  mediaStreamAudioSource: MaybeRefOrGetter<MediaStreamAudioSourceNode>,
  method: MaybeRefOrGetter<PitchDetectionMethod>,
) => {
  const source = toValue(mediaStreamAudioSource);
  const analyzer = toValue(analyzerNode);

  const bufferLength = analyzer.fftSize;
  const buffer = new Float32Array(bufferLength);

  const detectPitch = computed<
    (buffer: Float32Array<ArrayBufferLike>) => number | null
  >(() => {
    switch (toValue(method)) {
      case "McLeod": {
        const detector = PitchDetector.forFloat32Array(bufferLength);
        return (buf: Float32Array<ArrayBufferLike>) =>
          detector.findPitch(buf, source.context.sampleRate)[0];
      }
      case "YIN":
        return PitchFinder.YIN();
      case "AMDF":
        return PitchFinder.AMDF();
      case "ACF2PLUS":
        return PitchFinder.ACF2PLUS();
      case "DynamicWavelet":
        return PitchFinder.DynamicWavelet();
      default:
        throw new Error(`Unknown pitch detection method: ${method as string}`);
    }
  });

  const getFrequency = (): number | null => {
    analyzer.getFloatTimeDomainData(buffer);
    const pitch = detectPitch.value(buffer);
    return pitch;
  };

  return {
    getFrequency,
  };
};
