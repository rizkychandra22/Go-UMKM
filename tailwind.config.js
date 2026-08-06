/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './resources/js/**/*.jsx',
    './resources/js/**/*.js',
    './resources/js/**/*.ts',
    './resources/js/**/*.tsx',
    './resources/css/**/*.css',
    './resources/views/**/*.blade.php',
    './resources/**/*.blade.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [
    // small helper to provide `.size-N` utilities used by icon classNames in JSX
    plugin(function ({ addUtilities, theme }) {
      const sizes = [3, 4, 5, 6, 8, 10, 20];
      const utils = {};

      sizes.forEach((s) => {
        const value = theme(`spacing.${s}`);
        if (value) {
          utils[`.size-${s}`] = { width: value, height: value };
        }
      });

      addUtilities(utils, { variants: ['responsive'] });
    }),
  ],
};
