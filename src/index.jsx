import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import App from 'components/layout/App';
import { ToasterProvider } from 'lib/ToasterProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from 'styles/GlobalStyle';
import { emotionLightTheme, MUILightTheme } from 'theme/lightbase';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={emotionLightTheme}>
      <MuiThemeProvider theme={MUILightTheme}>
        <CssBaseline />
        <GlobalStyles styles={GlobalStyle} />
        <ToasterProvider>
          <App />
        </ToasterProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
