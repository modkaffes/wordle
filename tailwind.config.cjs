const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      white: "var(--color-white)",
      black: "var(--color-black)",
      gray5: "var(--color-gray-5)",
      initial: {
        DEFAULT: "var(--color-gray-1)",
        dark: "var(--color-gray-2)",
      },
      correct: {
        DEFAULT: "var(--color-green)",
        dark: "var(--color-green-dark)",
      },
      present: {
        DEFAULT: "var(--color-yellow)",
        dark: "var(--color-yellow-dark)",
      },
      absent: {
        DEFAULT: "var(--color-gray-3)",
        dark: "var(--color-gray-4)",
      },
    },
    extend: {
      animation: {
        flip: "flip 0.65s ease-in-out",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(0)" },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
};
