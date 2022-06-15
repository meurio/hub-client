import React from "react";
import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

export interface TabProps {
  active?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ children, active, onClick }: any) => {
  const { colorMode } = useColorMode();
  const defaultColor = colorMode === "dark" ? "white" : "black";

  const defaultStylesProps: any = {
    color: defaultColor,
  };
  if (colorMode === "dark" && active) {
    defaultStylesProps.borderBottomWidth = "2px";
    defaultStylesProps.borderBottomStyle = "solid";
    defaultStylesProps.borderBottomColor = "pink.200";
  }
  if (active) {
    defaultStylesProps.color = "pink.200";
    defaultStylesProps._hover = {
      color: "pink.200",
      borderBottomColor: "pink.200",
    };
  }

  return (
    <Button
      variant="ghost"
      colorScheme="gray"
      onClick={onClick}
      px={0}
      pb={2}
      mr={5}
      {...defaultStylesProps}
    >
      {children}
    </Button>
  );
};

export default Tab;
