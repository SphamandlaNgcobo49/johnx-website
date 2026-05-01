// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0A0A0A',
        onyx: '#141414',
        ivory: '#F8F5F0',
        champagne: '#D4AF37',
        brass: '#B5A642',
        charcoal: '#1C1C1C',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        syncopate: ['var(--font-syncopate)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in-slow': 'fadeIn 2s ease-out forwards',
        'fade-in-up': 'fadeInUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'image-pan': 'imagePan 20s linear infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        imagePan: {
          '0%': { transform: 'scale(1.05) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        }
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // eslint-disable-line @typescript-eslint/no-require-imports
  ],
};
