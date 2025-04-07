import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
import { ErrorBoundary, Loader } from './components';
import { getDesignTokens } from './services/matherial-theme.js';
import { selectTheme } from './store/app';

function App() {
  const mode = useSelector(selectTheme);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline>
          <RouterProvider
            router={router}
            fallbackElement={<Loader />}
            future={{ v7_startTransition: true }}
          />
        </CssBaseline>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
