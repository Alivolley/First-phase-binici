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

  // change default scrollbar style
  ::-webkit-scrollbar,
  .scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  *::-webkit-scrollbar-track,
  .scrollbar::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: transparent;
  }

  *::-webkit-scrollbar-thumb,
  .scrollbar::-webkit-scrollbar-thumb {
    background: #909090;
    border-radius: 100vh;
  }

  *::-webkit-scrollbar-thumb:hover,
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  *,
  .scrollbar {
    scrollbar-color: #e0cbcb white;
    scrollbar-width: thin;
  }

  // hide numeric input arrows
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
