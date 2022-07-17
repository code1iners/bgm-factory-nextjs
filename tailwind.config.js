module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sexy-gray": "#2c2e39",
        "sexy-black": "#2c3e50",
      },
      animation: {
        "wiggle-45": "wiggle-45 0.5s ease-in-out",
        "wiggle-90": "wiggle-90 0.5s ease-in-out",
      },
      keyframes: {
        "wiggle-45": {
          "0%": {
            transform: "scale(0.5)",
          },
          "70%": {
            opacity: 0.7,
          },
          "100%": {
            transform: "translateX(50px) scale(1)",
            opacity: 0,
          },
        },

        "wiggle-90": {
          "0%": {
            transform: "scale(0.5)",
          },
          "70%": {
            opacity: 0.7,
          },
          "100%": {
            transform: "translateY(50px) scale(1) rotateZ(180deg)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
