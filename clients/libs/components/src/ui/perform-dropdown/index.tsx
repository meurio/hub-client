import React, { useState, createContext, useContext, useRef } from "react";
import { Button, Box, Fade, useOutsideClick } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "../../icons";

type DropdownContext = {
  isOpen: boolean;
  onToggle: () => void;
};

const dropdownContext = createContext<DropdownContext>({
  isOpen: false,
  onToggle: () => {},
});

type PerformDropdownListProps = {
  scroll?: boolean;
  children?: any;
};

export const PerformDropdownList: React.FC<PerformDropdownListProps> = ({
  children,
  scroll,
}: any) => {
  const { isOpen } = useContext(dropdownContext);
  const boxProps: any = {
    minWidth: "200px",
    maxWidth: "400px",
    bg: "white",
    boxShadow: "base",
    mt: 10,
  };

  if (scroll) {
    boxProps.overflowY = "scroll";
    boxProps.height = "500px";
  }

  return (
    <Fade
      in={isOpen}
      style={
        {
          position: "absolute",
          top: isOpen ? "0" : "-1000px",
          zIndex: 2,
        } as any
      }
    >
      <Box {...boxProps}>{children}</Box>
    </Fade>
  );
};

type PerformDropdownItemProps = {
  onClick?: any;
  children?: any;
};

export const PerformDropdownItem: React.FC<PerformDropdownItemProps> = ({
  children,
  onClick,
}: any) => {
  const { onToggle } = useContext(dropdownContext);

  return (
    <Box
      cursor="pointer"
      onClick={() => {
        if (onClick) onClick();
        onToggle();
      }}
      _hover={{ bg: "gray.100" }}
    >
      {children}
    </Box>
  );
};

export const PerformDropdownButton: React.FC<any> = ({
  children,
  color,
  ...props
}: any) => {
  const { isOpen, onToggle } = useContext(dropdownContext);
  const buttonProps = {
    ...props,
    zIndex: 3,
    rightIcon: isOpen ? (
      <ArrowUpIcon boxSize={3} />
    ) : (
      <ArrowDownIcon boxSize={3} />
    ),
    onClick: onToggle,
  };

  if (color) {
    buttonProps.color = color;
    buttonProps["_hover"] = { color };
    buttonProps["_active"] = { color };
  }

  return <Button {...buttonProps}>{children}</Button>;
};

const PerformDropdown = ({ children }: any) => {
  const wrapperRef: any = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({
    ref: wrapperRef,
    handler: () => setIsOpen(false),
  });

  return (
    <dropdownContext.Provider
      value={{
        isOpen,
        onToggle: () => setIsOpen(!isOpen),
      }}
    >
      <Box ref={wrapperRef} position="relative" display="flex">
        {children}
      </Box>
    </dropdownContext.Provider>
  );
};

export default PerformDropdown;
