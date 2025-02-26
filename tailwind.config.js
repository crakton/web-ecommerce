/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2e3192",  // Replace with your actual color
        secondary: "#eddb17",
        accent: "#your-accent-color",
        background: "#your-background-color",
        text: "#your-text-color",
      },
    },
  },
  plugins: [],
};
