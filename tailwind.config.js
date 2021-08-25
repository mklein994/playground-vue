// eslint-disable-next-line no-undef
module.exports = {
  prefix: "tw-",
  purge: ["./index.html", "./src/**/*.{vue,css,ts,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
