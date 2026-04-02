/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff9ed',
          100: '#fff1d4',
          200: '#ffdfa8',
          300: '#ffc671',
          400: '#ffaa33',
          500: '#ff8f0a',
          600: '#f07300',
          700: '#c75802',
          800: '#9e4409',
          900: '#7f390b',
          950: '#451b03',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      fontFamily: {
        sans: ['"Nunito"', '"PingFang SC"', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 10px 25px -5px rgba(255, 143, 10, 0.2), 0 8px 10px -6px rgba(255, 143, 10, 0.1)',
        'cute-green': '0 10px 25px -5px rgba(34, 197, 94, 0.2), 0 8px 10px -6px rgba(34, 197, 94, 0.1)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是针对 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false
  }
}