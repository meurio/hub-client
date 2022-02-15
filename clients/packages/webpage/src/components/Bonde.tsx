import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="109"
      height="55"
      fill="none"
      viewBox="0 0 109 55"
    >
      <path fill="url(#pattern0)" d="M0 0H109V55H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00505 0 0 .01 -.005 0)"
            xlinkHref="#image0"
          ></use>
        </pattern>
        <image
          id="image0"
          width="200"
          height="100"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}

export default Icon;
