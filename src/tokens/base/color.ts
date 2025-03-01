import chroma from "chroma-js";

import baseColors from "../color/tailwind.ts";
import { recursiveTransform } from "../helpers.ts";

const oklchRe = /^oklch\((.*)\)$/;

export default {
  color: {
    base: baseColors,
    rgb: recursiveTransform(baseColors, "value", (value) =>
      chroma(value).rgb().join(" "),
    ),
    oklch: recursiveTransform(baseColors, "value", (x) => x.match(oklchRe)![1]),
  },
};
