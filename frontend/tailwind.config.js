/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          50: '#fef7ed',
          100: '#fdecd1',
          200: '#fbd6a3',
          300: '#f8b964',
          400: '#f59e42',
          500: '#f2841e',
          600: '#e36914',
          700: '#bc4f13',
          800: '#963f17',
          900: '#7a3616',
        },
        cream: {
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'lobster': ['Lobster', 'cursive'],
        'dancing': ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      backgroundImage: {
        'bakery-gradient': 'linear-gradient(135deg, #fef7ed 0%, #fdecd1 25%, #fbd6a3 50%, #f8b964 75%, #f59e42 100%)',
        'cream-gradient': 'linear-gradient(135deg, #fffef7 0%, #fffbeb 50%, #fef3c7 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}