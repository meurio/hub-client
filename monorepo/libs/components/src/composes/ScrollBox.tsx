import React from "react";
import { Box } from "@chakra-ui/react";

export interface ScrollBoxProps {
  h?: string | any
  bg?: string
}

export const ScrollBox: React.FC<ScrollBoxProps> = ({ children, bg = "inherit" }) => {
  return (
    <Box
      display="flex"
      flex={1}
      bg={bg}
      overflowY="auto"
      overflowX="hidden"
      css={{
        "::-webkit-scrollbar": {
          width: "33px"
        },
        "::-webkit-scrollbar-thumb": {
          backgroundClip: "padding-box",
          backgroundColor: "rgba(74, 74, 74, 0.75)",
          borderWidth: "20px 15px",
          borderStyle: "solid",
          borderColor: "transparent",
          borderImage: "initial"
        }
      }}
    >
      {children}
    </Box>
  );
};
