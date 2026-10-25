/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ivory-bg": "#F7F3EA",
        "sandstone-soft": "#E5D4B8",
        "charcoal-main": "#20201D",
        "terracotta": "#A65A3A",
        "terracotta-hover": "#8F4A2D",
        "aged-bronze": "#8C684B",
        "muted-olive": "#68705A",
        "card-white": "#FFFFFF",
        "primary": "#A65A3A",
        "primary-container": "#8C684B",
        "on-primary": "#ffffff",
        "on-primary-container": "#ffffff",
        "secondary": "#8C684B",
        "secondary-container": "#E5D4B8",
        "on-secondary": "#20201D",
        "tertiary": "#68705A",
        "tertiary-container": "#E5D4B8",
        "on-tertiary": "#ffffff",
        "cream": "#F7F3EA",
        "background": "#F7F3EA",
        "surface": "#FFFFFF",
        "on-surface": "#20201D",
        "on-surface-variant": "#8C684B",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FAF7F2",
        "surface-container": "#F4EFEA",
        "surface-container-high": "#EFE8DE",
        "surface-container-highest": "#E5D4B8",
        "surface-dim": "#DAD0C4",
        "outline": "#8C684B",
        "outline-variant": "#E5D4B8",
        "error": "#ba1a1a"
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        display: ["Noto Serif", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Public Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
