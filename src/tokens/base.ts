import type { DesignTokens } from "style-dictionary/types";

import tailwindColors from "./vendor/tailwind.ts";

const baseColors = Object.fromEntries(
  Object.entries(tailwindColors)
    .filter(([_, group]) => typeof group !== "string")
    .map(([name, colors]) => [
      name,
      Object.fromEntries(
        Object.entries(colors).map(([k, v]) => [k, { $value: v }]),
      ),
    ]),
);

export default {
  color: {
    $type: "color",
    base: baseColors,
  },
} satisfies DesignTokens;
