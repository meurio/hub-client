import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " stroke"}
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      fill="#000"
      d="M12.13 11.75A6.988 6.988 0 0014 7c0-3.854-3.136-7-7-7S0 3.146 0 7c0 3.853 3.135 6.999 7 6.999 1.572 0 3.019-.518 4.19-1.394l5.205 5.205c.127.127.285.19.444.19a.607.607 0 00.443-.19.644.644 0 000-.897L12.13 11.75zM1.267 7a5.738 5.738 0 015.732-5.733 5.738 5.738 0 015.733 5.732 5.731 5.731 0 01-5.733 5.733 5.738 5.738 0 01-5.732-5.733z"
    ></path>
  </svg>
);

Icon.displayName = "Icon.Search";

export default Icon;
