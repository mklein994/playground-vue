import type { Config } from "style-dictionary";
import { formats, transforms } from "style-dictionary/enums";
import { fileURLToPath, URL } from "url";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default {
  source: [resolve("./src/tokens/base/**/*.ts")],

  platforms: {
    css: {
      transforms: [transforms.nameKebab],
      prefix: "pv",
      buildPath: resolve("./src/assets/generated/"),

      files: [
        {
          format: formats.cssVariables,
          destination: "variables.css",
        },
      ],
    },

    json: {
      transforms: [transforms.nameKebab],
      prefix: "pv",
      buildPath: resolve("./src/assets/generated/"),

      files: [
        {
          format: formats.jsonFlat,
          destination: "variables.json",
        },
      ],
    },
  },
} satisfies Config;
