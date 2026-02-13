/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent / theme colors (used across components)
        accent: {
          cyan: '#38bdf8',
          light: '#22d3ee'
        },
        // Navbar-only black
        navbarBlack: '#000000',
        // Section gradient stops for hero / about / projects
        gradient: {
          top: '#05050a',   // near black
          mid: '#0a0f3d',   // deep navy
          bottom: '#141b6b' // blue
        },
        // Glassmorphism helpers
        glass: {
          bg: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.1)'
        },
        // Text tones
        body: '#cbd5e1', // light gray
        muted: '#94a3b8',
        dark: {
          100: '#1a1a28',
          200: '#151520',
          300: '#0f0f17',
          400: '#0a0a0f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
