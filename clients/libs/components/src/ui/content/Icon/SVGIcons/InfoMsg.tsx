import React from "react";

function Icon({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
      className={className + " fill"}
    >
      <g fill="#000" clipPath="url(#clip0)">
        <path d="M21.018 10.075a10.245 10.245 0 00-3.174-7.209A10.244 10.244 0 0010.52.002a10.244 10.244 0 00-7.324 2.864A10.245 10.245 0 00.02 10.075v.017a9.91 9.91 0 003.294 7.327v2.539A1.04 1.04 0 004.344 21c.19 0 .378-.053.543-.156l2.04-1.275a10.78 10.78 0 003.572.607h.015l.202.002c2.67 0 5.195-1.013 7.128-2.866a10.245 10.245 0 003.174-7.209v-.028zm-4.026 6.347a9.023 9.023 0 01-6.46 2.523h-.014a9.588 9.588 0 01-3.319-.587.896.896 0 00-.788.081l-1.865 1.165V17.27a.901.901 0 00-.31-.68 8.677 8.677 0 01-2.984-6.495 9.02 9.02 0 012.795-6.338 9.027 9.027 0 016.46-2.523h.025a9.021 9.021 0 016.46 2.523 9.02 9.02 0 012.794 6.333 9.02 9.02 0 01-2.794 6.333z"></path>
        <path d="M12.213 12.896V8.645c0-.624-.508-1.131-1.131-1.131H9c-.624 0-1.131.507-1.131 1.13v1.07c0 .557.402 1.02.931 1.114v2.094a1.133 1.133 0 00-.931 1.113v1.07c0 .624.507 1.131 1.13 1.131h3.053c.623 0 1.13-.507 1.13-1.131v-1.07c0-.58-.422-1.06-.97-1.14zm-.261 2.108h-2.85v-.868h.184a.748.748 0 00.747-.747V10.36a.748.748 0 00-.747-.747h-.184v-.868h1.879v4.623c0 .412.335.747.747.747h.224v.888zM10.432 7.145c.987 0 1.79-.802 1.79-1.79 0-.986-.803-1.79-1.79-1.79-.987.001-1.79.804-1.79 1.79 0 .988.803 1.79 1.79 1.79zm0-2.347a.559.559 0 11-.001 1.117.559.559 0 01.001-1.117z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H20.959V21H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

Icon.displayName = "Icon.InfoMsg";

export default Icon;
