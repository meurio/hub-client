import React from "react";

const Icon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="25"
    fill="none"
    className={className + " fill"}
    viewBox="0 0 16 25"
  >
    <path
      fill="#000"
      stroke="#fff"
      strokeWidth="0.1"
      d="M15.481 9.799h0a.731.731 0 00-.637-.374H9.388l.005-.054.71-8.529A.731.731 0 009.612.09h0a.73.73 0 00-.85.294h0L.168 13.665h0a.73.73 0 00.613 1.129h5.46l-.004.054-.716 9.315h0a.731.731 0 00.504.752L15.48 9.799zm0 0c.13.23.125.513-.013.739 0 0 0 0 0 0L6.874 24.6a.732.732 0 01-.849.315l9.456-15.116zM7.228 21.034l.093.03 6.172-10.1.047-.077H8.594a.731.731 0 01-.729-.791l.522-6.269-.092-.031-6.12 9.458-.05.077h4.906a.733.733 0 01.73.788h0l-.533 6.915z"
    ></path>
  </svg>
);

Icon.displayName = "Icon.Bolt";

export default Icon;
