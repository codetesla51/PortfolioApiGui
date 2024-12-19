import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  
  darkMode: 'class', // Enable dark mode using the 'class' strategy

  theme: {
    extend: {}
  },

  plugins: []
} satisfies Config;