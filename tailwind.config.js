// tailwind.config.js (excerpt)
export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0b0d0f",
        surface: "#111418",
        text: "#F2F5F8",
        calm: "#59b3a5",
        focus: "#7aa0ff",
        energize: "#ffb25e",
        sleep: "#8a7bd6",
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.25)" },
    },
  },
  plugins: [],
};
