import React from "react";
import styled from "@emotion/styled";
import { Flex } from "@chakra-ui/react";
import { Main, Footer, Navbar } from "../ui";
import CommunitiesDropdown from "./CommunitiesDropdown";
import UserDropdown from "./UserDropdown";
import Logout from "./Logout";
import { BaseUIProperties } from "./types";

interface ContentProps {
  isMobile: boolean;
  bgColor: string;
}

const Content = styled.div<ContentProps>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props: ContentProps) => props.bgColor};

  ${(props: ContentProps) =>
    props.isMobile &&
    `
    padding-top: 65px;
    overflow-y: auto;
  `}
`;

const FooterTool: React.FC<any> = ({ languageTool: LanguageTool }) =>
  LanguageTool ? (
    <Footer>
      <LanguageTool />
    </Footer>
  ) : (
    <Footer />
  );

const BaseUI: React.FC<BaseUIProperties> = ({
  children,
  bgColor,
  disableNavigation,
  indexRoute,
  isMobile,
  session,
  languageTool: LanguageTool,
}: any) => {
  return (
    <Main>
      <Navbar
        fixed={isMobile}
        indexRoute={indexRoute}
        brand={disableNavigation ? "default" : "small"}
      >
        <Flex direction="row" grow={1} justify="space-between">
          {disableNavigation ? (
            <div />
          ) : (
            <CommunitiesDropdown session={session} />
          )}
          {isMobile ? (
            <Logout session={session} />
          ) : (
            <UserDropdown session={session} />
          )}
        </Flex>
      </Navbar>
      <Content isMobile={!!isMobile} bgColor={bgColor || "rgb(247,247,247)"}>
        {children}
      </Content>
      {!isMobile ? <FooterTool languageTool={LanguageTool} /> : null}
    </Main>
  );
};

BaseUI.defaultProps = {
  disableNavigation: false,
};

export default BaseUI;
