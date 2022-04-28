/* eslint-env node */
module.exports = {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{vue,ts,html}"],
  plugins: [require("@tailwindcss/forms")],
};
