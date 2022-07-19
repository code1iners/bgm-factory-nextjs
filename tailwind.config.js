module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./libs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sexy-gray": "#2c2e39",
        "sexy-black": "#2c3e50",
      },
      animation: {
        "straight-r": "straight-r 0.2s ease-in-out",
        "rotate-r": "rotate-r 0.2s ease-in-out",
      },
      keyframes: {
        "straight-r": {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            opacity: 0.1,
            transform: "translateX(20px) scale(2)",
          },
        },
        "rotate-r": {
          "100%": {
            transform: "rotate(30deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
