import { LIGHT_THEME } from './constants.js';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === LIGHT_THEME
      ? {
          primary: {
            main: 'rgb(106, 186, 240)',
          },
          secondary: {
            main: 'rgb(248, 252, 254)',
          },
          background: {
            default: 'rgb(255, 255, 255)',
            paper: 'rgb(255, 254, 255)',
          },
          text: {
            primary: 'rgb(0, 0, 0)',
            secondary: 'rgb(74, 74, 74)',
          },
          divider: 'rgb(211, 211, 211)',
        }
      : {
          primary: {
            main: 'rgb(147, 62, 226)',
          },
          secondary: {
            main: 'rgb(248, 252, 254)',
          },
          background: {
            default: 'rgb(18, 18, 18)',
            paper: 'rgb(30, 30, 30)',
          },
          text: {
            primary: 'rgb(255, 255, 255)',
            secondary: 'rgb(207, 207, 207)',
          },
          divider: 'rgba(236,236,236,0.29)',
        }),
  },
  spacing: 4,
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 14,
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'bold',
    },
  },
});
