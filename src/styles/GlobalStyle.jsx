import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import { Fonts } from './Fonts';

export const GlobalStyle = css`
  ${emotionNormalize}
  ${Fonts}

  #root {
    display: flex;
    overflow: hidden !important;
  }

  *,
  * * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Yekan-Medium';
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-stretch: normal;
    user-select: none;
    overflow-x: hidden;
    vertical-align: baseline;
    height: 100vh;
    background-color: ${({ theme }) => theme.palette.layout.disabled};

    /* remove iOS touch tap highlight */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -webkit-touch-callout: none;

    a,
    a:hover {
      text-decoration: none;
    }
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  a,
  a:hover {
    text-decoration: none;
  }
`;
