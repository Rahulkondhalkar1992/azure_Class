/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        azure: {
          50: '#e8f4fc',
          400: '#3aa0e8',
          500: '#0078D4',
          600: '#106EBE',
          700: '#005A9E',
        },
        ink: {
          50: '#f4f6fb',
          100: '#e8edf7',
          800: '#1a2236',
          900: '#0b1020',
          950: '#070b14',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 120, 212, 0.25)',
      },
    },
  },
  plugins: [],
}
