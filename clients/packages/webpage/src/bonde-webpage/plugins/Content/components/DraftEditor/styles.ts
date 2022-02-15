import styled from '@emotion/styled';

export const Wrapper = styled.div`
  & .reboo-editor {
    .editor {
      position: relative;
      z-index: 2;
    }

    .toolbar-container {
      display: block;
      width: 100%;
    }

    .outside {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
    }

    // Align editor content
    .alignment--left {
      text-align: left;
    }
    figure.alignment--left {
      float: left;
      margin: 0.5rem;
    }
    .alignment--center {
      text-align: center;
    }
    figure.alignment--center {
      margin: 0.5rem auto;
    }
    .alignment--right {
      text-align: right;
    }
    figure.alignment--right {
      float: right;
      margin: 0.5rem;
    }
  }

  & .content-new-editor {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: bold;
    }
    a {
      text-decoration: none;
    }
    h1 {
      font-size: 5rem;
    }
    h2 {
      font-size: 3rem;
    }
    h3 {
      font-size: 2rem;
    }
    h4 {
      font-size: 1.5rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.5rem;
    }
  }
`;
