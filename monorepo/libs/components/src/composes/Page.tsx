import React from "react";
import { Button, Container, DarkMode, Flex, Heading, HStack, useColorMode } from "@chakra-ui/react";
import { Container as ThemeContainer } from "../theme/components";
import { BondeIcon } from "../icons";

export const Page: React.FC = ({ children }) => (
  <Flex direction="column" h="100vh">
    {children}
  </Flex>
);

export interface PageNavbarProps {
  header?: string | React.ReactElement
  navigation?: React.ReactElement
}

export const PageNavbar: React.FC<PageNavbarProps> = ({
  header,
  navigation
}) => (
  <Flex direction="column" bg="black" px={ThemeContainer.baseStyle.px}>
    <Flex direction="row" h="54px" alignItems="center">
      <BondeIcon boxSize={14} />
    </Flex>
    {header && (
      <Flex h="42px" alignItems="center">
        {typeof header === "string" ? (
            <Heading as="h1" size="xl" color="white">
              {header}
            </Heading>
          ) : header}
      </Flex>
    )}
    {navigation && (
      <HStack spacing={4} h="42px" alignItems="flex-end" as="nav">
        <DarkMode>
          {navigation}
        </DarkMode>
      </HStack>
    )}
  </Flex>
);

export interface PageContentProps {
  bg?: string
}

export const PageContent: React.FC<PageContentProps> = ({
  children,
  bg = "gray.50"
}) => (
  <Container bg={bg} flex={1}>
    {children}
  </Container>
);

export interface PageNavLinkProps {
  as?: any
  active?: boolean
  // When as props is react-router-link Link
  to?: string
  // When as props is html button
  onClick?: () => void
}

export const PageNavLink: React.FC<PageNavLinkProps> = ({
  children,
  active,
  as = "button",
  ...props
}) => {
  const { colorMode } = useColorMode();
  const defaultColor = colorMode === 'dark' ? 'white' : 'black';

  const defaultStylesProps: any = {
    color: defaultColor,
    px: 0,
    pb: 2,
    variant: "ghost",
    colorScheme: "gray"
  };

  if (colorMode === 'dark' && active) {
    defaultStylesProps.borderBottomWidth = '2px';
    defaultStylesProps.borderBottomStyle = 'solid';
    defaultStylesProps.borderBottomColor = 'pink.200';
  }

  if (active) {
    defaultStylesProps.color = 'pink.200';
    defaultStylesProps._hover = {
      color: 'pink.200',
      borderBottomColor: 'pink.200',
    };
  }
  
  return (
    <Button
      as={as}
      {...defaultStylesProps}
      {...props}
    >
      {children}
    </Button>
  );
}