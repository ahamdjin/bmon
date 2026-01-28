import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#161525",
        muted: "#5f5f69",
        brand: {
          DEFAULT: "#4f46e5",
          700: "#4338ca",
        },
        surface: "#ffffff",
        subtle: "#f7f6f4",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(22,21,37,0.08)",
        hairline: "0 0 0 1px rgba(22,21,37,0.08)",
      },
      borderRadius: {
        pill: "999px",
        card: "24px",
      },
    },
  },
  plugins: [],
} satisfies Config;

