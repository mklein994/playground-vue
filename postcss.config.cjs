/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires -- This isn't a typescript file, so this error is irrelevant */

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-logical"),
    require("postcss-dir-pseudo-class"),
  ],
};
