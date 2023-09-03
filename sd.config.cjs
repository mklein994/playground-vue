const cssTransforms = [
  "attribute/cti",
  "name/cti/kebab",
  // "attribute/color",
];

/** @param token {import("style-dictionary").TransformedToken} */
const isRawRgb = (token) =>
  token.attributes.category === "color" && token.name.endsWith("rgb");

/** @type {import("style-dictionary").Config} */
module.exports = {
  source: [__dirname + "/src/tokens/base/**/*.cjs"],

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
