import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1c61e7",
        background: "#f6f6f6",
        // fontColor: "#404040",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mycustomtheme: {
          primary: "#1c61e7", // Customize primary color
          secondary: "#f59e0b", // Customize secondary color
          accent: "#ec4899", // Customize accent color
          neutral: "#333c4d", // Customize neutral color
          "base-100": "#ffffff", // Base background color
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      // Optional: You can keep default themes or add others here
      "dark", // DaisyUI built-in themes
      "cupcake",
    ],
  },
};
export default config;
