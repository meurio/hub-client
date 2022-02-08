import React from 'react';
import { Global, css } from '@emotion/react';

const layoutStyles = css`
  // Move to component style
  .flex {
    display: flex;
  }
  .flex-column {
    flex-direction: column;
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .border {
    border: solid 1px;
  }
  .fixed {
    position: fixed;
  }

  .mx-auto {
    margin: 0 auto;
  }
  .px2 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .p2 {
    padding: 1rem;
  }
  .p3 {
    padding: 2rem;
  }
  .my2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .mt0 {
    margin-top: 0;
  }
  .mt1 {
    margin-top: 0.5rem;
  }
  .mb2 {
    margin-bottom: 1rem;
  }
  .mb3 {
    margin-bottom: 2rem;
  }
  .mb4 {
    margin-bottom: 4rem;
  }

  // FormPlugin
  .rounded {
    border-radius: 3px;
  }
  .caps {
    text-transform: uppercase;
    letter-spacing: 0;
  }
  .bold {
    font-weight: bold;
  }
  .inline-block {
    display: inline-block;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }
  .center {
    text-align: center;
  }
  .white {
    color: #fff;
  }
  .input,
  .textarea,
  .select {
    box-sizing: border-box;
    height: auto;
  }
  .input {
    font-family: inherit;
    font-size: inherit;
    display: block;
    width: 100%;
    border-radius: 2px;
    padding: 1rem;
  }
  .select {
    font-family: inherit;
    font-size: inherit;
    display: block;
    width: 100%;
    border-radius: 2px;
    padding: 1rem;
    background-color: #fff;
  }
  .border-gray94 {
    border-color: #eee;
  }
  .block {
    display: block;
  }
  .btn {
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    line-height: 1.125rem;
    height: auto;
    border: 1px solid transparent;
    vertical-align: middle;
    -webkit-appearance: none;
    background-color: transparent;
  }
  .bg-darken-4 {
    background-color: rgba(0, 0, 0, 0.5);
  }

  // Block & Widgets
  .clearfix:after,
  .clearfix:before {
    content: ' ';
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
  .col-12 {
    width: 100%;
  }
  .col-10 {
    width: 83.33333%;
  }
  .col-8 {
    width: 66.66667%;
  }
  .col-2 {
    width: 16.66667%;
  }
  .col-3 {
    width: 25%;
  }
  .col-1 {
    width: 8.33333%;
  }
  .col {
    box-sizing: border-box;
    float: left;
  }
  .right {
    float: right;
  }

  // Styled components widget
  .pressure-widget {
    background-color: #fff;
    border-radius: 5px;
  }

  // Mobile medias
  @media (min-width: 1024px) {
    .show-mobile {
      display: none !important;
    }
  }
  @media (max-width: 1023.9px) {
    .hide-mobile {
      display: none !important;
    }
  }

  @media (min-width: 40em) {
    .sm-col-12 {
      width: 100%;
    }
  }
  @media (min-width: 52em) {
    .md-col-6 {
      width: 50%;
    }
    .md-mb0 {
      margin-bottom: 0;
    }
  }
  @media (min-width: 64em) {
    .lg-col-6 {
      width: 50%;
    }
    .lg-col-8 {
      width: 66.66667%;
    }
    .lg-col-4 {
      width: 33.33333%;
    }
    .lg-col-3 {
      width: 25%;
    }
  }
`;

const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  body {
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Source Sans Pro', 'Proxima Nova', sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    max-width: 100vw;
    background-color: #f7f7f7;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background: #fff;
    -webkit-text-fill-color: $black !important;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }

  input,
  textarea,
  select {
    &:focus {
      outline: none;
    }
  }

  p {
    margin: 0;
  }

  ::-webkit-input-placeholder {
    color: $lightestGray;
  }
  :-moz-placeholder {
    color: $lightestGray;
  }
  ::-moz-placeholder {
    color: $lightestGray;
  }
  :-ms-input-placeholder {
    color: $lightestGray;
  }

  textarea {
    resize: none;
  }
`;

const Styles: React.FC = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    <Global styles={layoutStyles} />
    {children}
  </>
);

export default Styles;
