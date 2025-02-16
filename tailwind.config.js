/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // `src` directory를 사용한다면
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {},
  fontFamily: {
    Pretendard: ["Pretendard"],
  },
  animation: {
    "custom-bounce": "customBounce 1s ease-in-out infinite",
  },
  keyframes: {
    customBounce: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },
};
export const plugins = ["tailwind-scrollbar-hide"];
