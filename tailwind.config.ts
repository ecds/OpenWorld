import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { topBarHeight } from "./app/config";
import { streetcarLines } from "./app/data/streetcarData";
import { buildingUses } from "./app/data/buildings";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        black: "#1C1817",
        white: "#FDF9F6",
        accent: "#dc3545",
      },
    },
  },
  future: {},
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: {
          ".primary-content > p": {
            lineHeight: "1.75rem",
            marginTop: "1.25rem",
            marginBottom: "1.25rem",
          },
          main: {
            ".primary-content > p:first-of-type:first-letter": {
              float: "left",
              fontFeatureSettings: '"ss06" !important',
              fontSize: "6rem",
              lineHeight: "3.5rem",
              fontWeight: "bold",
              padding: "1rem 0.75rem 0rem 0rem",
            },
          },
        },
        "[maplibregl-popup-close-button], button.maplibregl-popup-close-button":
          {
            paddingRight: ".5rem !important",
          },
      });
    }),
  ],
  safelist: [
    `-top-[${topBarHeight}]`,
    `top-[${topBarHeight}]`,
    `h-[calc(100vh-${topBarHeight})]`,
    `mt-[${topBarHeight}]`,
    "opacity-0",
    ...streetcarLines.map((line) => `bg-[${line.color}]`),
    ...buildingUses.map((use) => `bg-[${use.color}]`),
  ],
} satisfies Config;
