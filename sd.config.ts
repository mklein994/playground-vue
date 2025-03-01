import chroma from "chroma-js";
import type { Config, TransformedToken } from "style-dictionary";
import StyleDictionary from "style-dictionary";
import { fileURLToPath, URL } from "url";

import { compactHex, expandHex, shortColorName } from "./src/tokens/helpers.ts";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const cssTransforms = [
  "attribute/cti",
  "name/kebab",
  "custom/name/rgb",
  "custom/name/short-color/kebab",
  // "custom/value/color/short",
];

const isRawRgb = (token: TransformedToken) =>
  token.attributes?.category === "color" && token.attributes.type === "rgb";

StyleDictionary.registerTransform({
  name: "custom/value/color/short",
  type: "value",
  filter(token) {
    return token.type === "color" && !isRawRgb(token);
  },
  transform(token, _options) {
    const color = chroma(token.value as string);
    const hex = color.num();
    const name = shortColorName(hex);
    if (name) {
      return name;
    }

    const compact = compactHex(hex);
    if (hex === expandHex(compact)) {
      return `#${compact.toString(16).padStart(3, "0")}`;
    }

    return `#${hex.toString(16).padStart(6, "0")}`;
  },
});

StyleDictionary.registerTransform({
  name: "custom/name/short-color/kebab",
  type: "name",
  filter(token) {
    return token.type === "color" && !isRawRgb(token);
  },
  transform(token, _options) {
    return token.name
      .split(/-/)
      .filter((x) => !["color", "base"].includes(x))
      .join("-");
  },
});

StyleDictionary.registerTransform({
  name: "custom/name/rgb",
  type: "name",
  filter: isRawRgb,
  transform(token, _options) {
    return (
      token.name
        .split(/-/)
        .filter((x) => !["rgb", "color"].includes(x))
        .join("-") + "-rgb"
    );
  },
});

const config: Config = {
  source: [resolve("./src/tokens/base/**/*.ts")],

  platforms: {
    css: {
      transforms: cssTransforms,
      prefix: "pv",
      buildPath: resolve("./src/assets/generated/"),

      files: [
        {
          format: "css/variables",
          filter: (token) => !isRawRgb(token),
          destination: "variables.css",
        },

        {
          format: "css/variables",
          filter: isRawRgb,
          destination: "variables.raw.css",
        },
      ],
    },
  },
};

// export default config;
const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
