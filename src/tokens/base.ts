import type { DesignTokens } from "style-dictionary/types";

import tailwindColors from "./vendor/tailwind.ts";

const baseColors = Object.fromEntries(
  Object.entries(tailwindColors)
    .filter(([_, group]) => typeof group !== "string")
    .map(([name, colors]) => [
      name,
      Object.fromEntries(
        Object.entries(colors).map(([k, v]) => [k, { $value: v }]),
      ),
    ]),
);

/** How large in pixels the base font is */
const rootFontSizePx: number = 16;

/** Factor that spacing units increases by */
const spacingFactor = 0.25;

const fontSizeRems: [string, number][] = [
  ["2xs", 0.625],
  ["xs", 0.75],
  ["sm", 0.875],
  ["base", 1],
  ["lg", 1.125],
  ["xl", 1.25],
  ["2xl", 1.5],
  ["3xl", 1.875],
  ["4xl", 2.25],
  ["5xl", 3],
  ["6xl", 3.75],
  ["7xl", 4.5],
  ["8xl", 6],
  ["9xl", 8],
];

const containerSizes: [string, number][] = [
  ["3xs", 16],
  ["2xs", 18],
  ["xs", 20],
  ["sm", 24],
  ["md", 28],
  ["lg", 32],
  ["xl", 36],
  ["2xl", 42],
  ["3xl", 48],
  ["4xl", 56],
  ["5xl", 64],
  ["6xl", 72],
  ["7xl", 80],
];

export default {
  color: {
    $type: "color",
    ...baseColors,
  },

  font: {
    $type: "typography",
    ...Object.fromEntries(
      fontSizeRems.map(([key, _]) => [
        key,
        {
          $value: {
            fontFamily: "var(--pv-b-font-family-sans)",
            fontSize: `{font.size.${key}}`,
            lineHeight: `{font.lineHeight.${key}}`,
          },
        },
      ]),
    ),

    family: {
      $type: "fontFamily",
      sans: {
        $value: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },

    weight: {
      $type: "fontWeight",
      thin: { $value: 100 },
      extralight: { $value: 200 },
      light: { $value: 300 },
      normal: { $value: 400 },
      medium: { $value: 500 },
      semibold: { $value: 600 },
      bold: { $value: 700 },
      extrabold: { $value: 800 },
      black: { $value: 900 },
    },

    size: {
      $type: "fontSize",
      ...Object.fromEntries(
        fontSizeRems.map(([key, remSize]) => [
          key,
          {
            $value: `${remSize}rem`,
            $description: `${remSize * rootFontSizePx}px`,
          },
        ]),
      ),
      basePx: {
        $value: rootFontSizePx === 16 ? "initial" : `${rootFontSizePx}px`,
      },
    },

    lineHeight: {
      $type: "dimension",
      "2xs": { $value: "1.2" }, // 0.75 / 0.625
      xs: { $value: "calc(1 / 0.75)" },
      sm: { $value: "calc(1.25 / 0.875)" },
      base: { $value: "1.5" }, // 1.5 / 1
      lg: { $value: "calc(1.75 / 1.125)" },
      xl: { $value: "1.4" }, // 1.75 / 1.25
      "2xl": { $value: "calc(2 / 1.5)" },
      "3xl": { $value: "1.2" }, //  2.25 / 1.875
      "4xl": { $value: "calc(2.5 / 2.25)" },
      "5xl": { $value: 1 },
      "6xl": { $value: 1 },
      "7xl": { $value: 1 },
      "8xl": { $value: 1 },
      "9xl": { $value: 1 },
    },

    // letter-spacing
    tracking: {
      $type: "dimension",
      tighter: { $value: "-0.05em" },
      tight: { $value: "-0.025em" },
      normal: { $value: "0em" },
      wide: { $value: "0.025em" },
      wider: { $value: "0.05em" },
      widest: { $value: "0.1em" },
    },
  },

  radius: {
    $type: "dimension",
    ...Object.fromEntries(
      ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((key, i) => {
        const value = (i + 1) * spacingFactor;
        return [
          key,
          {
            $value: `${value}rem`,
            $description: `${value * rootFontSizePx}px`,
          },
        ];
      }),
    ),

    full: { $value: "calc(infinity * 1px)" },
  },

  // margin, padding, etc.
  spacing: {
    $type: "dimension",
    ...Object.fromEntries(
      [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => [
        index,
        {
          $value: `${index * spacingFactor}rem`,
          $description: `${index * spacingFactor * rootFontSizePx}px`,
        },
      ]),
    ),
  },

  // @container sizes, widths, etc.
  container: {
    $type: "dimension",
    ...Object.fromEntries(
      containerSizes.map(([key, value]) => [
        key,
        {
          $value: `${value}rem`,
          $description: `${value * rootFontSizePx}px`,
        },
      ]),
    ),
  },

  breakpoint: {
    ...Object.fromEntries(
      (
        [
          ["sm", 40],
          ["md", 48],
          ["lg", 64],
          ["xl", 80],
          ["2xl", 96],
        ] satisfies [string, number][]
      ).map(([key, value]) => [
        key,
        { $value: `${value}rem`, $description: `${value * rootFontSizePx}px` },
      ]),
    ),
  },

  shadow: {
    "2xs": { $value: "0 1px rgb(0 0 0 / 0.05)" },
    xs: { $value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
    sm: {
      $value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    },
    md: {
      $value:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    },
    lg: {
      $value:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    xl: {
      $value:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
    "2xl": { $value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
  },

  insetShadow: {
    "2xs": { $value: "inset 0 1px rgb(0 0 0 / 0.05)" },
    xs: { $value: "inset 0 1px 1px rgb(0 0 0 / 0.05)" },
    sm: { $value: "inset 0 2px 4px rgb(0 0 0 / 0.05)" },
  },

  dropShadow: {
    xs: { $value: "0 1px 1px rgb(0 0 0 / 0.05)" },
    sm: { $value: "0 1px 2px rgb(0 0 0 / 0.15)" },
    md: { $value: "0 3px 3px rgb(0 0 0 / 0.12)" },
    lg: { $value: "0 4px 4px rgb(0 0 0 / 0.15)" },
    xl: { $value: "0 9px 7px rgb(0 0 0 / 0.1)" },
    "2xl": { $value: "0 25px 25px rgb(0 0 0 / 0.15)" },
  },

  textShadow: {
    "2xs": { $value: "0 1px 0 rgb(0 0 0 / 0.15)" },
    xs: { $value: "0 1px 1px rgb(0 0 0 / 0.2)" },
    sm: {
      $value:
        "0 1px 0 rgb(0 0 0 / 0.075), 0 1px 1px rgb(0 0 0 / 0.075), 0 2px 2px rgb(0 0 0 / 0.075)",
    },
    md: {
      $value:
        "0 1px 1px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.1)",
    },
    lg: {
      $value:
        "0 1px 2px rgb(0 0 0 / 0.1), 0 3px 2px rgb(0 0 0 / 0.1), 0 4px 8px rgb(0 0 0 / 0.1)",
    },
  },

  blur: {
    $type: "dimension",
    xs: { $value: "4px" },
    sm: { $value: "8px" },
    md: { $value: "12px" },
    lg: { $value: "16px" },
    xl: { $value: "24px" },
    "2xl": { $value: "40px" },
    "3xl": { $value: "64px" },
  },
} satisfies DesignTokens;
