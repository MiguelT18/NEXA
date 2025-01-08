/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-light": "#ffffff",
        "background-dark": "#09090b",
        // color palette
        "color-green": "#2ecc71",
        "color-blue": "#1f618d",
        "color-blue-gray": "#5d6d7e",
        "color-golden": "#f4d03f",
      },
    },
  },
  plugins: [],
};
