/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/app/common/utils/colors.utils");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      // ***************** COLORS ***************** \\
      "color-white": "#ffffff",
      "color-gray": colors.gray[300],
      "color-gray-lite": colors.gray[100],
      "color-red": colors.red[400],
      "color-transparent": 'transparent',
      "color-loading": colors.blue[700],

      // ***************** PRIMARY ***************** \\
      "color-primary": colors.blue[500],
      "color-primary-dark": colors.blue[800],

      "color-secundary": colors.rose[500],

      // ***************** TEXT ***************** \\
      "color-text": colors.gray[600],

      // ***************** BACKGROUND ***************** \\
      "color-bg": colors.blue[50],

      // ***************** BUTTON ***************** \\
      "color-btn-accept": colors.gray[100],
      "color-btn-accept-hover": colors.gray[200],

      "color-btn-cancel": colors.gray[100],
      "color-btn-cancel-hover": colors.gray[200],

      // ***************** BUTTON ***************** \\
      "color-success": colors.green[400], // #34d3a1
      "color-error": colors.red[400], // #ff5b81
      "color-warning": colors.yellow[300], // #e7d062
      "color-info": colors.blue[300], // #7bcefe

      rose: {
        50: "#fef1fb",
        100: "#fee5f9",
        200: "#ffcaf6",
        300: "#ff9fed",
        400: "#ff63dd",
        500: "#ff24c6", // Rose
        600: "#f012ac",
        700: "#d1058c",
        800: "#ad0773",
        900: "#8f0c61",
        950: "#580038",
      },

      blue: {
        50: "#f0f8ff",
        100: "#dff1ff",
        200: "#b9e3fe",
        300: "#7bcefe",
        400: "#34b5fc",
        500: "#0a9ded",
        600: "#007ccb",
        700: "#005d9b", // Blue
        800: "#055487",
        900: "#0a4570",
        950: "#072c4a",
      },

      green: {
        50: "#ecfdf6",
        100: "#d1fae7",
        200: "#a7f3d4",
        300: "#6ee7bd",
        400: "#34d3a1",
        500: "#10b989",
        600: "#06a77d", // Green
        700: "#04785d",
        800: "#065f4a",
        900: "#064e3f",
        950: "#022c24",
      },

      yellow: {
        50: "#fdfbed",
        100: "#f7f2ce",
        200: "#efe498",
        300: "#e7d062",
        400: "#e2c044", // Yellow
        500: "#d9a227",
        600: "#c07f1f",
        700: "#9f5e1e",
        800: "#824a1e",
        900: "#6b3d1c",
        950: "#3d1f0b",
      },
      red: {
        50: "#ffeff1",
        100: "#ffe0e4",
        200: "#ffc5d1",
        300: "#ff96ab",
        400: "#ff5b81",
        500: "#ff225b",
        600: "#ff0048",
        700: "#da003d",
        800: "#b6003c",
        900: "#840032",
        950: "#58001a",
      },
      gray: {
        50: "#f7f8f8",
        100: "#edeef1",
        200: "#d8dbdf",
        300: "#b6bac3",
        400: "#8e95a2",
        500: "#6b7280",
        600: "#5b616e",
        700: "#4a4e5a",
        800: "#40444c",
        900: "#383a42",
        950: "#25272c",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
