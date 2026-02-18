import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './app/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
