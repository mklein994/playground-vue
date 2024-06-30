import StyleDictionary from "style-dictionary";
import chroma from "chroma-js";
import { compactHex, expandHex, shortColorName } from "./src/tokens/helpers.js";
import { URL, fileURLToPath } from "url";

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

const cssTransforms = [
  "attribute/cti",
  "name/kebab",
  "custom/name/rgb",
  "custom/name/short-color/kebab",
  "custom/value/color/short",
];

/**
 * @param {import("style-dictionary").TransformedToken} token
 */
const isRawRgb = (token) =>
  token.attributes.category === "color" && token.attributes.type === "rgb";

StyleDictionary.registerTransform({
  name: "custom/value/color/short",
  type: "value",
  filter(token) {
    return token.type === "color" && !isRawRgb(token);
  },
  transform(token, _options) {
    const color = chroma(token.value);
    const hex = color.num();
    let name = shortColorName(hex);
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

/** @type {import("style-dictionary/types").Config} */
export default {
  source: [resolve("./src/tokens/base/**/*.js")],

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
