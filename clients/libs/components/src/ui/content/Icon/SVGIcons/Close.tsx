import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " stroke"}
    viewBox="0 0 10 10"
  >
    <path
      fill="#D8D8D8"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="square"
      strokeWidth="1.5"
      d="M5.337 5.013l3.324 3.325.107.107-.2.2-.107-.106-3.325-3.325L1.74 8.61l-.1.1-.214-.213.1-.1L4.922 5 1.604 1.682l-.107-.107.2-.201.107.107 3.319 3.318 3.273-3.273.1-.1.215.214-.1.1-3.274 3.273z"
    />
  </svg>
);

Icon.displayName = "Icon.Times";

export default Icon;
