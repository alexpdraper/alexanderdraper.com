const systemFonts = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

module.exports = {
  purge: ['./site/index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      system: systemFonts,
      body: ['Quasimoda', ...systemFonts],
      display: ['"Volte Rounded"', 'Futura', ...systemFonts],
    },
    extend: {
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
