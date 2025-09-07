import chroma from "chroma-js";
import type { Config } from "style-dictionary";
import StyleDictionary from "style-dictionary";
import { formats, transforms } from "style-dictionary/enums";
import { fileURLToPath, URL } from "url";

import { compactHex, expandHex, shortColorName } from "./src/tokens/helpers.ts";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const cssTransforms = [transforms.nameKebab];

StyleDictionary.registerTransform({
  name: "custom/value/color/short",
  type: "value",
  filter(token) {
    return token.$type === "color";
  },
  transform(token, _options) {
    const color = chroma(token.$value as string);
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

const config: Config = {
  source: [resolve("./src/tokens/base/**/*.ts")],

  platforms: {
    css: {
      transforms: cssTransforms,
      prefix: "pv",
      buildPath: resolve("./src/assets/generated/"),

      files: [
        {
          format: formats.cssVariables,
          destination: "variables.css",
        },

        {
          format: formats.jsonFlat,
          destination: "variables.json",
        },
      ],
    },
  },
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
