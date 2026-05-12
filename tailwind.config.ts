import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '2.5rem'
      }
    },
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        foreground: '#0F172A',
        muted: '#475569',
        border: '#CBD5E1',
        primary: {
          DEFAULT: '#1D4ED8',
          dark: '#1E3A8A'
        },
        accent: '#F59E0B'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
