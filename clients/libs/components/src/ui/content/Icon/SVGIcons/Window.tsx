import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className + " fill"}
    viewBox="0 0 18 14"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.44792 1.16667V12.8333H16.2257V1.16667H1.44792ZM1.05903 0C0.629473 0 0.28125 0.348223 0.28125 0.777778V13.2222C0.28125 13.6518 0.629473 14 1.05903 14H16.6146C17.0441 14 17.3924 13.6518 17.3924 13.2222V0.777778C17.3924 0.348223 17.0441 0 16.6146 0H1.05903Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.3924 4.66669H0.28125V3.50002H17.3924V4.66669Z"
      fill="black"
    />
    <path
      d="M15.0592 2.13888C15.0592 2.46104 14.7981 2.72221 14.4759 2.72221C14.1537 2.72221 13.8926 2.46104 13.8926 2.13888C13.8926 1.81671 14.1537 1.55554 14.4759 1.55554C14.7981 1.55554 15.0592 1.81671 15.0592 2.13888Z"
      fill="black"
    />
  </svg>
);

Icon.displayName = "Icon.Window";

export default Icon;
