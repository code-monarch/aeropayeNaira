const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
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
      boxShadow: {
        custom: "0px 6px 15px rgba(0, 0, 0, 0.04)",
        card: "0px 2px 6px 0px rgba(0, 0, 0, 0.05)",
      },
    },
    backgroundImage: {
      svgPattern: "url('/svg/svgPattern.svg')",
    },
  },
  plugins: [
    require("daisyui"),
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
  ],
};
