import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

export default {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{vue,ts,html}"],
  plugins: [forms()],
} satisfies Config;
