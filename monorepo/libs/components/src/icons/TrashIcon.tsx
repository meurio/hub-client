import React from "react";
import { createIcon } from "@chakra-ui/react";

const TrashIcon = createIcon({
  displayName: "TrashIcon",
  viewBox: "0 0 16 16",
  path: (
    <>
      <path
        fill="currentColor"
        d="M13.556 3.886L12.6 14.784H5.59L4.632 3.886l-1.212.106.974 11.096c.051.511.495.912 1.01.912h7.379c.515 0 .959-.4 1.011-.92l.973-11.088-1.212-.106z"
      />
      <path
        fill="currentColor"
        d="M11.324 1H6.865c-.559 0-1.014.455-1.014 1.014v1.925h1.217V2.216h4.054V3.94h1.216V2.014c0-.56-.455-1.014-1.014-1.014z"
      />
      <path
        fill="currentColor"
        d="M15.581 3.331H2.608a.608.608 0 100 1.216h12.973a.608.608 0 100-1.216z"
      />
    </>
  )
})

export default TrashIcon;
