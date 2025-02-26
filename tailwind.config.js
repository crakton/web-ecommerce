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
        background: "#032f6c",
        blue:"#0186ff",
        text: "#your-text-color",
      },
    },
  },
  plugins: [],
};
