/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#004067',
          accent: '#F2994A',
          urgent: '#EF4444',
          warning: '#F59E0B',
          light: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
