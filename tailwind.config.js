/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Noto Sans Mono"],
      },
    },
  },
  plugins: [require("@digital-go-jp/tailwind-theme-plugin")],
};
