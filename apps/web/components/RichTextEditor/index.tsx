'use client';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import Editor from './Editor';

export default function RichTextEditor() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light', // or detect system preference if you want
          secondary: { main: '#42B81A' },
        },
        typography: {
          fontFamily:
            '"Space grotesk" "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Editor />
    </ThemeProvider>
  );
}
