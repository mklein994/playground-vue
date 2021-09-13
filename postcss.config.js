module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-logical")({ preserve: true }),
    require("postcss-dir-pseudo-class"),
  ]
};
