import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " fill"}
    viewBox="4 4 15 15"
  >
    <path
      fill="#000"
      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
    ></path>
  </svg>
);

Icon.displayName = "Icon.ArrowRight";

export default Icon;
