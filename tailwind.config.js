/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0db0a4',
          dark: '#0a8a80',
          light: '#10c9bb',
        },
        accent: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
        },
        warning: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        testnet: {
          DEFAULT: '#64748b',
          dark: '#475569',
        },
        mainnet: {
          DEFAULT: '#0db0a4',
          dark: '#0a8a80',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
