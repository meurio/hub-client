import React from "react";
import styled from "styled-components";
import theme from "../base/theme";

const Ring = styled.div<{ theme: any }>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ theme }) => theme.commons.light};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.commons.light} transparent transparent
      transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ theme }: any) => {
  return (
    <Ring theme={theme}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Ring>
  );
};

Spinner.defaultProps = {
  theme,
};

export default Spinner;
