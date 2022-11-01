/** @type {import('tailwindcss').Config} */

const path = require("path");
const theme = require("./theme");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme,
  plugins: [require("@tailwindcss/line-clamp")],
};
