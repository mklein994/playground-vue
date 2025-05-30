import process from "node:process";
import fs from "node:fs";

let tailwindSupported = true;
if (fs.existsSync("./.env.local")) {
  process.loadEnvFile("./.env.local");
  tailwindSupported = process.env.BUILDTIME_TAILWIND_SUPPORTED === "true";
}

export default {
  plugins: {
    // "tailwindcss/nesting": "postcss-nesting",
    "@tailwindcss/postcss": tailwindSupported ? {} : false,
    autoprefixer: {},
    "postcss-logical": {},
    "postcss-dir-pseudo-class": {},
  },
};
