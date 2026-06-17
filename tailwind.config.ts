import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

// All design tokens are defined in app/globals.css via @theme inline.
// This file only handles content paths and plugins.
const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '1440': '1440px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
