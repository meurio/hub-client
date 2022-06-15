import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " fill"}
    viewBox="4 4 15 15"
  >
    <path
      fill="#000"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
    ></path>
  </svg>
);

Icon.displayName = "Icon.ArrowDown";

export default Icon;
