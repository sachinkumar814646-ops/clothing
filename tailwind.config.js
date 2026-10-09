module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        cream: "#FFF7F5",
        charcoal: "#000",
        stone: "#73789A",
        bone: "#F4DFDB",
        sand: "#E9A59C",
        coral: "#E9897E",
        navy: "#2B2F6B",
        beige : '#2B2F6B',
        pinked : '#000',
      },
      letterSpacing: {
        "widest-2": "0.3em",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
