/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f3723f",
        "primary-light": "#fcddd1",
        secondary: "#57a7dd",
        "secondary-dark": "#0d75bc",
        blackish: "#333333",
        "dashboard-bg": "#fffbfa",
        "dashboard-navy": "#1d1d41",
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        gothic: ["Gothic A1", "sans-serif"],
      },
      screens: {
        xs: "400px",
        xl: "1536px",
      },
      boxShadow: {
        customDesktop:
          "0px 5.44px 5.44px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        customMobile: "0px 3.58px 3.58px 0px rgba(0, 0, 0, 0.25)",
        testimonialMobile:
          "0px 0.58px 0.58px 0px rgba(0, 0, 0, 0.25)",
        testimonialMobileArrows:
          "0px 1.83px 1.83px 0px rgba(0, 0, 0, 0.25)",
        dbButtonActive: "0px 12.34px 37.01px rgba(136, 51, 255, 0.1)",
        dbButton: "0px 2.47px 6.17px rgba(38, 51, 77, 0.03)",
      },
      backgroundImage: {
        "feature-ellipse":
          "url('/src/assets/features/feature-ellipse.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
