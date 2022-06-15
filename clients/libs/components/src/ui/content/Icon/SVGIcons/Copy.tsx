import React from "react";

const Icon: React.FC = ({ className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      fill="none"
      viewBox="0 0 14 16"
      className={className + " fill"}
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M10.01 0H1.43C.644 0 0 .655 0 1.455v10.181h1.43V1.455h8.58V0zm2.146 2.91H4.29c-.786 0-1.43.654-1.43 1.454v10.181c0 .8.644 1.455 1.43 1.455h7.866c.786 0 1.43-.655 1.43-1.454V4.364c0-.8-.644-1.455-1.43-1.455zm0 11.636H4.29V4.364h7.866v10.181z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

Icon.displayName = "Icon.Copy";

export default Icon;
