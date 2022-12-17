module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#6C4AB6",
        primary2: "#8D72E1",
        secondary: "#8D9EFF",
        secondaryHover: "#8c9cf5",
        secondary2: "#B9E0FF",
        bgGray: "#FAFAFA",
        bgPage: "#FCFCFD",
        grayCard: "#e4e6eb",
        grayCardHover: "#f0f2f5",
        textGray: "#8f8f8f",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
