import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " fill"}
    viewBox="4 4 15 15"
  >
    <path
      fill="#000"
      d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
    ></path>
  </svg>
);

Icon.displayName = "Icon.ArrowLeft";

export default Icon;
