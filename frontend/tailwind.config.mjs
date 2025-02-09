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
        // alternative assets
        "alt-dark-green-border": "rgb(16 185 129 / 0.2)",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    fontSize: {
      sm: "clamp(14px, 3vw, 16px)",
      md: "clamp(20px, 4vw, 22px)",
      lg: "clamp(26px, 6vw, 34px)",
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
        "0%": {
          transform: "translateX(0)",
        },
        "100%": {
          transform: "translateX(-100%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
