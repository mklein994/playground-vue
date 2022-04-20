/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-logical")({ preserve: true }),
    require("postcss-dir-pseudo-class"),
  ],
};
