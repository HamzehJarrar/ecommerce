import { createTheme } from '@mui/material/styles';

export function createAppTheme(direction = 'rtl') {
  return createTheme({
    direction,
    palette: {
      mode: 'light',
      primary: {
        main: '#c62828',
      },
      secondary: {
        main: '#1565c0',
      },
      error: {
        main: '#e53935',
      },
      success: {
        main: '#2e7d32',
      },
      background: {
        default: '#eceff1',
        paper: '#ffffff',
      },
      text: {
        primary: '#263238',
        secondary: '#546e7a',
      },
    },
    typography: {
      fontFamily: '"Tajawal", "Roboto", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });
}
