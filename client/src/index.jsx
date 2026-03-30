import React from 'react';
import ReactDOM from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';
import { createRtlCache } from './rtlCache';
import { createAppTheme } from './theme/createAppTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));

const rtlCache = createRtlCache();
const theme = createAppTheme('rtl');

root.render(
  <React.StrictMode>
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>,
);
