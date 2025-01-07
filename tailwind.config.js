/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem", // Custom height class
        200: "50rem", // Custom height class
      },
    },
  },
  plugins: [],
};
