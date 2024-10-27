/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: {
          700: "##6C63FF",
        },
        red: {
          400: "##d6675d",
        },
      },
    },
  },
  plugins: [],
};
