// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

// eslint-disable-next-line no-undef
module.exports = {
  prefix: "tw-",
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,css,ts,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
