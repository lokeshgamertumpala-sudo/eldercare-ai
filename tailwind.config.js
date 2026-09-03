/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elder: {
          bg: '#0c0f17',
          surface: 'rgba(255, 255, 255, 0.08)',
          card: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.15)',
          text: '#f8fafc',
          muted: '#94a3b8',
          accent: '#38bdf8',
          accentGlow: 'rgba(56, 189, 248, 0.25)',
          warning: '#f59e0b',
          urgent: '#ef4444',
          success: '#10b981',
          telugu: '#ec4899',
          hindi: '#f97316',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      boxShadow: {
        'liquid': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
        'liquid-lg': '0 20px 50px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)',
        'orb-idle': '0 0 50px 15px rgba(56, 189, 248, 0.25)',
        'orb-listening': '0 0 70px 25px rgba(99, 102, 241, 0.4)',
        'orb-thinking': '0 0 70px 25px rgba(236, 72, 153, 0.4)',
        'orb-speaking': '0 0 80px 30px rgba(16, 185, 129, 0.45)',
        'orb-urgent': '0 0 80px 30px rgba(239, 68, 68, 0.45)',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
