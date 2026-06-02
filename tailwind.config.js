/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)", ...fontFamily.sans],
      },
      colors: {
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primaryDark: "rgb(var(--color-primary-dark) / <alpha-value>)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.55) 2px,rgba(0,0,0,0.15) 5px,rgba(0,0,0,0) 8px,rgb(var(--color-light)) 10px,rgb(var(--color-light)) 75px)",

        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.85) 2px,rgba(255,255,255,0.25) 5px,rgba(255,255,255,0) 8px,rgb(var(--color-dark)) 10px,rgb(var(--color-dark)) 75px)",

        circularLightLg:
          "repeating-radial-gradient(rgba(0,0,0,0.55) 2px,rgba(0,0,0,0.15) 5px,rgba(0,0,0,0) 8px,rgb(var(--color-light)) 10px,rgb(var(--color-light)) 60px)",

        circularDarkLg:
          "repeating-radial-gradient(rgba(255,255,255,0.85) 2px,rgba(255,255,255,0.25) 5px,rgba(255,255,255,0) 8px,rgb(var(--color-dark)) 10px,rgb(var(--color-dark)) 60px)",

        circularLightMd:
          "repeating-radial-gradient(rgba(0,0,0,0.55) 2px,rgba(0,0,0,0.15) 5px,rgba(0,0,0,0) 8px,rgb(var(--color-light)) 10px,rgb(var(--color-light)) 50px)",

        circularDarkMd:
          "repeating-radial-gradient(rgba(255,255,255,0.85) 2px,rgba(255,255,255,0.25) 5px,rgba(255,255,255,0) 8px,rgb(var(--color-dark)) 10px,rgb(var(--color-dark)) 50px)",

        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.55) 2px,rgba(0,0,0,0.15) 4px,rgba(0,0,0,0) 6px,rgb(var(--color-light)) 8px,rgb(var(--color-light)) 38px)",

        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.85) 2px,rgba(255,255,255,0.25) 4px,rgba(255,255,255,0) 6px,rgb(var(--color-dark)) 8px,rgb(var(--color-dark)) 38px)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
