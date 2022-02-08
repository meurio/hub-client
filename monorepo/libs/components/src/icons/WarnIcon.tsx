import React from "react";
import { createIcon } from "@chakra-ui/react";

const WarnIcon = createIcon({
  displayName: "WarnIcon",
  viewBox: "0 0 14 14",
  path: (
    <>
      <g fill="currentColor" clipPath="url(#clip0)">
        <path d="M13.94 12.687L7.425.846a.485.485 0 00-.85 0L.06 12.686a.485.485 0 00.425.72h13.03a.484.484 0 00.425-.72zm-12.636-.251L7 2.085l5.696 10.35H1.304z"></path>
        <path d="M6.393 5.547V9.05a.607.607 0 001.214 0V5.547a.607.607 0 00-1.214 0zM7 10.288a.64.64 0 100 1.28.64.64 0 000-1.28z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H14V14H0z"></path>
        </clipPath>
      </defs>
    </>
  )
})

export default WarnIcon;
