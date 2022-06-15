import React from "react";

const Icon = ({ className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10"
      fill="none"
      className={className + " fill"}
      viewBox="0 0 13 10"
    >
      <path
        fill="#50E3C2"
        fillRule="evenodd"
        d="M12.339 1.707L4.652 9.394 0 4.742l1.414-1.414 3.238 3.238L10.925.293l1.414 1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

Icon.displayName = "Icon.Check";

export default Icon;
