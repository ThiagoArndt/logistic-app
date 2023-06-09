const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      animation: {
        "pop-in": "popInAnimation .5s cubic-bezier(0, 0, 0.2, 1)",
        "pop-out": "popOutAnimation .3s cubic-bezier(0, 0, 0.2, 1)",
      }
    },
    colors: {
      gray: "#8F98A7",
      lightGray: "#EFF0F3",
      blue: "#0176DE",
      red: "#E74C3C",
      white: "#FFF",
      black: "#000",
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
