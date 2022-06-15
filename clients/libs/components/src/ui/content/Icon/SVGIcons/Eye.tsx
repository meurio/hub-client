import React from "react";

const Icon = ({ className }: any) => (
  <svg
    width="24"
    className={className + " fill"}
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0371 6.75351C6.75341 6.75351 1.63714 11.7954 1.43248 12.0186C1.28365 12.1675 1.20923 12.3535 1.20923 12.5582C1.20923 12.7628 1.28365 12.9489 1.43248 13.0977C1.65574 13.321 6.75341 18.3628 12.0371 18.3628C17.3209 18.3628 22.4371 13.321 22.6418 13.0977C22.7906 12.9489 22.865 12.7628 22.865 12.5582C22.865 12.3535 22.7906 12.1675 22.6418 12.0186C22.4371 11.7954 17.3395 6.75351 12.0371 6.75351ZM12.0371 16.8186C8.33481 16.8186 4.52086 13.8047 3.0883 12.5396C4.52086 11.2744 8.33481 8.26049 12.0371 8.26049C15.7395 8.26049 19.5534 11.2744 20.986 12.5396C19.5534 13.8047 15.7395 16.8186 12.0371 16.8186Z"
      fill="black"
    />
    <path
      d="M9.30225 12.5396C9.30225 14.0465 10.5302 15.293 12.0557 15.293C13.5813 15.293 14.8092 14.0651 14.8092 12.5396C14.8092 11.014 13.5813 9.78607 12.0557 9.78607C10.5302 9.78607 9.30225 11.0326 9.30225 12.5396ZM13.265 12.5396C13.265 13.2093 12.7255 13.7675 12.0371 13.7675C11.3674 13.7675 10.8092 13.2279 10.8092 12.5396C10.8092 11.8512 11.3488 11.3117 12.0371 11.3117C12.7069 11.3303 13.265 11.8698 13.265 12.5396Z"
      fill="black"
    />
  </svg>
);

Icon.displayName = "Icon.Show";

export default Icon;
