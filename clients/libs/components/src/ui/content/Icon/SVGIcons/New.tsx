import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " fill"}
    width="30"
    height="26"
    fill="none"
    viewBox="0 0 30 26"
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M1.5 1.5v15h19v-15h-19zM1 0a1 1 0 00-1 1v16a1 1 0 001 1h20a1 1 0 001-1V1a1 1 0 00-1-1H1z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M22 6H0V4.5h22V6z"
      clipRule="evenodd"
    ></path>
    <path fill="#000" d="M19 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
    <path
      fill="#000"
      stroke="#fff"
      strokeLinecap="square"
      strokeWidth="2"
      d="M20.476 10.017h-1v5.375h-5.458v3.62h5.458v5.571H23.116v-5.57h5.468v-3.62h-5.467v-5.376h-2.641z"
    ></path>
  </svg>
);

Icon.displayName = "Icon.New";

export default Icon;
