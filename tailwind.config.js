/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#17151B',
          light: '#231F2A',
          dark: '#0F0E12',
          surface: '#1E1B24',
        },
        ivory: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          dark: '#E8E1D5',
          warm: '#F2EBE0',
        },
        rose: {
          muted: '#A96E78',
          soft: '#C48A94',
          deep: '#8C5660',
        },
        champagne: {
          DEFAULT: '#D9B887',
          light: '#EAD5B5',
          dark: '#BFA06E',
        },
        rosewood: {
          DEFAULT: '#55414C',
          light: '#6E5563',
          dark: '#3E2E37',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'DM Sans', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'polaroid': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'polaroid-lg': '0 10px 25px -5px rgba(23, 21, 27, 0.25), 0 8px 10px -6px rgba(23, 21, 27, 0.2)',
        'paper': '0 2px 10px rgba(85, 65, 76, 0.08), 0 20px 30px rgba(23, 21, 27, 0.12)',
        'glow-champagne': '0 0 25px rgba(217, 184, 135, 0.35)',
        'glow-rose': '0 0 25px rgba(169, 110, 120, 0.35)',
      },
    },
  },
  plugins: [],
}

