import React from "react";
import { Stack } from "@chakra-ui/react";

export interface CardProps {
  onClick?: () => void
  fullSize?: boolean
  direction?: "row" | "column"
  textAlign?: any
  w?: string | number | any[]
  h?: string | number | any[]
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  fullSize,
  direction = "row",
  textAlign = "left",
  w = "205px",
  h = "90px"
}) => {
  return (
    <Stack
      as={onClick ? "button" : "div"}
      bg="white"
      boxShadow="sm"
      direction={direction}
      onClick={onClick}
      w={fullSize ? "auto" : w}
      h={fullSize ? "100%" : h}
      rounded={4}
      spacing={direction === "row" ? 4 : 2}
      alignItems="center"
      justifyContent="center"
      textAlign={textAlign}
      px={4}
    >
      {children}
    </Stack>
  );
}