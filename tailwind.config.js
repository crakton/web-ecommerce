/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2e3192",  // Deep blue
        secondary: "#eddb17", // Bright yellow
        background: "#032f6c", // Dark navy blue
        accent: "#ff9800",  // Warm orange
        mutedPrimary: "#5a5fb5", // Softer primary
        mutedSecondary: "#f8e89a", // Softer yellow
        neutralGray: "#d1d5db", // Soft gray
      },
    },
  },
  plugins: [],
};
