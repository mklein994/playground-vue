import { fileURLToPath, URL } from "node:url";

import { kebabCase } from "change-case";
import type { Config } from "style-dictionary";
import { formats, transforms, transformTypes } from "style-dictionary/enums";
import type { Transform } from "style-dictionary/types";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const kebabStripValueGroupSuffix: Omit<Transform, "name"> = {
  type: transformTypes.name,
  transform(token, config) {
    const path =
      token.path.at(-1)! === "_" ? token.path.slice(0, -1) : token.path;
    return kebabCase([config.prefix].concat(path).join(" "));
  },
};

const configTransforms = [
  transforms.typographyCssShorthand,
  transforms.shadowCssShorthand,
  "kebabStripValueGroupSuffix",
];

export default {
  source: [resolve("./src/tokens/base.ts")],

  hooks: {
    transforms: {
      kebabStripValueGroupSuffix,
    },
  },

  platforms: {
    css: {
      transforms: configTransforms,
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
      transforms: configTransforms,
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
