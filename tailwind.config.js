const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/**/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "serif", ...defaultTheme.fontFamily.sans],
        serif: ["Circular", "serif"],
      },
      colors: {
        black: "#212934",
        gray: "#8895A7",
        grayDark: "#060A33",
        green: "#22E0BB",
        bg: "#F7FAFC",
      },
    },
    backgroundImage: {
      svgPattern: "url('/svg/svgPattern.svg')",
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    styled: false,
  },
};
