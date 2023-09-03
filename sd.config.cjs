const chroma = require("chroma-js");
const {
  compactHex,
  expandHex,
  shortColorName,
} = require("./src/tokens/helpers.cjs");

const cssTransforms = [
  "attribute/cti",
  "name/cti/kebab",
  "custom/name/rgb",
  "custom/name/short-color/kebab",
  "custom/value/color/short",
];

/**
 * @param {import("style-dictionary").TransformedToken} token
 */
const isRawRgb = (token) =>
  token.attributes.category === "color" && token.attributes.type === "rgb";

/** @type {import("style-dictionary").Config} */
module.exports = {
  source: [__dirname + "/src/tokens/base/**/*.cjs"],

  transform: {
    "custom/value/color/short": {
      type: "value",
      matcher(token) {
        return token.attributes.category === "color" && !isRawRgb(token);
      },
      transformer(token, _options) {
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
    },

    "custom/name/short-color/kebab": {
      type: "name",
      matcher(token) {
        return token.attributes.category === "color" && !isRawRgb(token);
      },
      transformer(token, _options) {
        return token.name
          .split(/-/)
          .filter((x) => !["color", "base"].includes(x))
          .join("-");
      },
    },

    "custom/name/rgb": {
      type: "name",
      matcher: isRawRgb,
      transformer(token, _options) {
        return (
          token.name
            .split(/-/)
            .filter((x) => !["rgb", "color"].includes(x))
            .join("-") + "-rgb"
        );
      },
    },
  },

  platforms: {
    css: {
      transforms: cssTransforms,
      prefix: "pv",
      buildPath: __dirname + "/src/assets/generated/",

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
