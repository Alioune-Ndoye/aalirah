/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:        '#07101E',
        'forest-mid':  '#0D1A30',
        'forest-deep': '#030810',
        mint:          '#C6A769',
        'mint-light':  '#D9BC8E',
        'mint-dark':   '#A88A4A',
        'mint-pale':   '#F5EDD8',
        ivory:         '#F8F5F0',
        cream:         '#F0EBE2',
        beige:         '#E8DCCB',
        sand:          '#D7C5A8',
        champagne:     '#C6A769',
        charcoal:      '#07101E',
        'char-mid':    '#0D1A30',
        'char-soft':   '#6B5D4F',
        'char-lt':     '#9E8F7F',
        silver:        '#C4B49A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
