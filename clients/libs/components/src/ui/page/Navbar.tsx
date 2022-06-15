import React from "react";
import styled from "styled-components";
import { Flex } from "@chakra-ui/react";
import Icon from "../content/Icon";
import Bonde from "../content/Bonde";

interface NavbarProps {
  children?: any;
  className?: string;
  indexRoute: string;
  fixed?: boolean;
  brand?: "default" | "small";
}

// Reset link to keep BondeSVG render
const HomeLink = styled.a`
  color: #000;
  text-decoration: none;

  &:hover {
    color: #000;
    text-decoration: none;
  }
`;

const Navbar: React.FC<NavbarProps> = ({
  brand,
  children,
  indexRoute,
  fixed = false,
}: any) => (
  <Flex
    position={fixed ? "fixed" : "relative"}
    direction="row"
    w="100%"
    bg="black"
    px={[6, null, null, 12]}
    py={4}
    alignItems="center"
  >
    <HomeLink href={indexRoute} title="Bonde Home Link">
      {brand !== "small" ? <Bonde /> : <Icon name="Bonde" />}
    </HomeLink>
    {children}
  </Flex>
);

export default Navbar;
