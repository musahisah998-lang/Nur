import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2F5D50',
          secondary: '#F0EEE3',
          dark: '#1D2A28',
          accent: '#E7DCC3',
          soft: '#F9F7F2'
        }
      },
      boxShadow: {
        soft: '0 12px 30px rgba(47, 93, 80, 0.1)'
      }
    }
  },
  plugins: []
};

export default config;
