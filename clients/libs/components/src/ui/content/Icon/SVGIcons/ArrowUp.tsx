import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " fill"}
    viewBox="4 4 15 15"
  >
    <path fill="#000" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
  </svg>
);

Icon.displayName = "Icon.ArrowUp";

export default Icon;
