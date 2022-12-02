import { css } from '@emotion/react';
import IRANYekanWebBoldWoff from 'assets/fonts/IRANYekanWebBold.woff';
import IRANYekanWebBoldWoff2 from 'assets/fonts/IRANYekanWebBold.woff2';
import IRANYekanWebExtraBoldWoff from 'assets/fonts/IRANYekanWebExtraBold.woff';
import IRANYekanWebExtraBoldWoff2 from 'assets/fonts/IRANYekanWebExtraBold.woff2';
import IRANYekanWebLightWoff from 'assets/fonts/IRANYekanWebLight.woff';
import IRANYekanWebLightWoff2 from 'assets/fonts/IRANYekanWebLight.woff2';
import IRANYekanWebMediumWoff from 'assets/fonts/IRANYekanWebMedium.woff';
import IRANYekanWebMediumWoff2 from 'assets/fonts/IRANYekanWebMedium.woff2';
import IRANYekanWebRegularWoff from 'assets/fonts/IRANYekanWebRegular.woff';
import IRANYekanWebRegularWoff2 from 'assets/fonts/IRANYekanWebRegular.woff2';

export const Fonts = css`
  @font-face {
    font-family: 'Yekan-Light';
    src: local('Yekan-Light'), local('Yekan-Light'),
      url(${IRANYekanWebLightWoff2}) format('woff2'),
      url(${IRANYekanWebLightWoff}) format('woff');
    font-weight: 300;
    font-style: normal;
    text-rendering: optimizeLegibility;
    font-display: auto;
  }

  @font-face {
    font-family: 'Yekan-Regular';
    src: local('Yekan-Regular'), local('Yekan-Regular'),
      url(${IRANYekanWebRegularWoff2}) format('woff2'),
      url(${IRANYekanWebRegularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
    font-display: auto;
  }

  @font-face {
    font-family: 'Yekan-Medium';
    src: local('Yekan-Medium'), local('Yekan-Medium'),
      url(${IRANYekanWebMediumWoff2}) format('woff2'),
      url(${IRANYekanWebMediumWoff}) format('woff');
    font-weight: 500;
    font-style: normal;
    text-rendering: optimizeLegibility;
    font-display: auto;
  }

  @font-face {
    font-family: 'Yekan-Bold';
    src: local('Yekan-Bold'), local('Yekan-Bold'),
      url(${IRANYekanWebBoldWoff2}) format('woff2'),
      url(${IRANYekanWebBoldWoff}) format('woff');
    font-weight: 600;
    font-style: normal;
    text-rendering: optimizeLegibility;
    font-display: auto;
  }

  @font-face {
    font-family: 'Yekan-ExtraBold';
    src: local('Yekan-ExtraBold'), local('Yekan-ExtraBold'),
      url(${IRANYekanWebExtraBoldWoff2}) format('woff2'),
      url(${IRANYekanWebExtraBoldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
    text-rendering: optimizeLegibility;
    font-display: auto;
  }
`;
