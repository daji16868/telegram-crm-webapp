/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0088cc',
        secondary: '#666666',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 