/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'sai-teal': {
          50: '#E6F7F7',
          100: '#CCEFEF',
          200: '#99DFDF',
          300: '#66CFCF',
          400: '#33BFBF',
          500: '#005C61',
          600: '#004A4E',
          700: '#00373A',
          800: '#002527',
          900: '#001213',
        },
        'sai-gold': {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFD700',
          600: '#CCAC00',
          700: '#998100',
          800: '#665600',
          900: '#332B00',
        },
        'primary': {
          light: '#FFFFFF',
          dark: '#111827',
        },
        'secondary': {
          light: '#F9FAFB',
          dark: '#1F2937',
        },
        'tertiary': {
          light: '#F3F4F6',
          dark: '#374151',
        },
        'text': {
          light: '#111827',
          dark: '#F9FAFB',
        },
        'text-secondary': {
          light: '#374151',
          dark: '#E5E7EB',
        },
        'dashboard-primary': {
          DEFAULT: '#133041',
          light: '#3949ab',
          lighter: '#3a5a72',
          bright: '#eaf6ff',
          dark: '#0b0e15',
          bg: '#0b0e15',
        },
        'dashboard-accent': {
          DEFAULT: '#ff9800',
          dark: '#f57c00',
          light: '#fff4ed',
        },
        'dashboard-primary-lightest': '#e8eaf6',
        'dashboard-primary-dark': '#0b0e15',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(0, 92, 97, 0.5)',
        'glow-lg': '0 0 25px rgba(0, 92, 97, 0.7)',
      },
      keyframes: {
        'partner-bounce-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(24px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        'pulse-fast': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.3' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'partner-bounce-x': 'partner-bounce-x 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse-fast 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
}
