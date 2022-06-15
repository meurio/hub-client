import React from "react";

function Icon({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      className={className + " fill"}
      viewBox="0 0 18 18"
    >
      <path
        fill="#000"
        d="M.06 13.512L.042 17.14c0 .204.074.409.223.558a.745.745 0 00.54.223l3.609-.019c.204 0 .39-.074.54-.223L17.418 5.214a.786.786 0 000-1.098L13.846.506a.786.786 0 00-1.097 0L10.256 3.02.284 12.972a.828.828 0 00-.224.54zM13.307 2.144l2.511 2.512-1.413 1.414-2.512-2.512 1.414-1.414zM1.605 13.847l9.19-9.191 2.512 2.511-9.19 9.173-2.531.018.019-2.511z"
      ></path>
    </svg>
  );
}

Icon.displayName = "Icon.Pencil";

export default Icon;
