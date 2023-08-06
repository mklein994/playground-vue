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
