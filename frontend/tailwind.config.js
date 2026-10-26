/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#07090e',
          900: '#0d1117',
          850: '#131822',
          800: '#181f2c',
          700: '#232d3f',
          600: '#334155'
        },
        forge: {
          cyan: '#00f2fe',
          purple: '#9d4edd',
          pink: '#f72585',
          accent: '#4cc9f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'studio-gradient': 'radial-gradient(circle at 50% 0%, rgba(157, 78, 221, 0.15) 0%, rgba(0, 242, 254, 0.05) 50%, rgba(7, 9, 14, 1) 100%)',
      }
    },
  },
  plugins: [],
}
