/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-background": "#09090b",
        "primary-color": "#1f618d",
        "secondary-color": "#25b763",
        "dark-gray": "#1F1F21",
        "difuminate-text-dark": "#A1A1AA",
        "light-gray": "#27272A",
        "difuminate-text-light": "#64748B",
      },
    },
    fontSize: {
      sm: "clamp(14px, 3vw, 18px)",
      md: "clamp(20px, 4vw, 24px)",
      lg: "clamp(26px, 6vw, 36px)",
    },
    backgroundImage: {
      "gradient-basic": "linear-gradient(to right, #38bdf8, #60a5fa)",
      "gradient-pro": "linear-gradient(to right, #3b82f6, #9333ea)",
      "gradient-premium": "linear-gradient(to right, #9333ea, #ef4444)",
      "gradient-dark-section":
        "linear-gradient(180deg,rgba(14, 14, 16, 1) 0%, rgba(29, 29, 31, 1) 100% 100%)",
      "gradient-light-section":
        "linear-gradient(180deg,rgba(23, 163, 75, 0.1) 0%,rgba(32, 98,142, 0.1) 100%)",
    },
    animation: {
      scroll: "scroll 15s linear infinite",
    },
    keyframes: {
      scroll: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
  },
  plugins: [],
};
