import type { DesignTokens } from "style-dictionary/types";

import baseColors from "../color/tailwind.ts";

export default {
  color: {
    $type: "color",
    base: baseColors,
  },
} satisfies DesignTokens;
