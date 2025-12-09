/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern gradient theme (inspired by reference image)
        primary: {
          50: '#f8f5ff',
          100: '#f0e6ff',
          200: '#e0ccff',
          300: '#c9a3ff',
          400: '#b06dff',
          500: '#9238ff',
          600: '#8020ff',
          700: '#7c1aff',
          800: '#6b0ed6',
          900: '#5a0db8',
        },
        accent: {
          400: '#ff4d9f',
          500: '#ff2d92',
          600: '#e6008a',
        },
        dark: {
          50: '#f8f9fa',
          100: '#eef0f6',
          200: '#e1e6f0',
          300: '#cbd3e0',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9238ff 0%, #ff2d92 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        'gradient-card': 'linear-gradient(135deg, #2d2248 0%, #3d1f5c 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(146, 56, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(146, 56, 255, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(146, 56, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(146, 56, 255, 0.6)' }
        }
      }
    }
  },
  plugins: [],
}
