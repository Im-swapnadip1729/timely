/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // for toggling dark mode with a class
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', "monospace", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};
