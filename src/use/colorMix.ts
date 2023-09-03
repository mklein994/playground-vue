const rectangularColorSpaces = [
  "srgb",
  "srgb-linear",
  "lab",
  "oklab",
  "xyz",
  "xyz-d50",
  "xyz-d65",
] as const;

const polarColorSpaces = ["hsl", "hwb", "lch", "oklch"] as const;

const hueInterpolationMethods = [
  "shorter hue",
  "longer hue",
  "increasing hue",
  "decreasing hue",
] as const;

export const flatColorSpaces = [
  ...rectangularColorSpaces,
  ...polarColorSpaces.flatMap((space) =>
    hueInterpolationMethods.map((method) => `${space} ${method}` as const),
  ),
] as const;

export type ColorSpace = (typeof flatColorSpaces)[number];

const generateGradientPercents = (stops: number) => {
  const percents: number[] = [];
  const increment = 1 / (stops + 1);
  for (let i = 0; i < stops + 2; i++) {
    const percent = i * increment;
    percents.push(percent);
  }
  return percents;
};

export const generateGradient = (
  colorSpace: ColorSpace,
  firstColor: string,
  lastColor: string,
  stops: number,
) =>
  generateGradientPercents(stops).map((stop) => {
    const stopPercent = stop * 100;
    return `color-mix(in ${colorSpace}, ${firstColor}, ${lastColor} ${
      Number.isInteger(stopPercent) ? stopPercent : stopPercent.toFixed(2)
    }%)`;
  });

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("generateGradientPercents", () => {
    it.each([
      [0, [0 / 1, 1 / 1]],
      [1, [0 / 2, 1 / 2, 2 / 2]],
      [2, [0 / 3, 1 / 3, 2 / 3, 3 / 3]],
      [3, [0 / 4, 1 / 4, 2 / 4, 3 / 4, 4 / 4]],
    ])("handles %i stops", (stops, expected) => {
      expect(generateGradientPercents(stops)).toStrictEqual(expected);
    });
  });

  describe("generateGradient", () => {
    it("generates a gradient", () => {
      const actual = generateGradient(
        "srgb",
        "rgb(255 0 0)",
        "rgb(0 255 0)",
        3,
      );
      expect(actual).toStrictEqual([
        "color-mix(in srgb, rgb(255 0 0), rgb(0 255 0) 0%)",
        "color-mix(in srgb, rgb(255 0 0), rgb(0 255 0) 25%)",
        "color-mix(in srgb, rgb(255 0 0), rgb(0 255 0) 50%)",
        "color-mix(in srgb, rgb(255 0 0), rgb(0 255 0) 75%)",
        "color-mix(in srgb, rgb(255 0 0), rgb(0 255 0) 100%)",
      ]);
    });
  });
}
