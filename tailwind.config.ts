import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { navy: '#112a41', teal: '#087e74', mint: '#e9f7f2', cream: '#f7f9f7' },
    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] }
  } },
  plugins: [],
};
export default config;
