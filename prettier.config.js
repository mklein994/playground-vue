/** @type {import("prettier").Config} */
export default {
  experimentalOperatorPosition: "start",
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
};
