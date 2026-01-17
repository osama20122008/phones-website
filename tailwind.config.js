/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#f0f2f5',
        accent: '#ff6b35',
        dark: '#1a1a1a',
        light: '#ffffff',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        arabic: ['"Segoe UI"', '"Traditional Arabic"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
