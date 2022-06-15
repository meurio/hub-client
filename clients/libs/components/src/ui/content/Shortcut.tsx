import React from "react";
import styled from "styled-components";
import Header from "./Header";
import CleanButton from "./CleanButton";
import theme from "../base/theme";

const Wrapper = styled(CleanButton)<{ theme: any }>`
  width: 200px;
  height: 90px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.brand.light};
  padding: 0px 20px;

  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: center;
  grid-column-gap: 20px;
`;

const Text = styled(Header.H5)<{ theme: any }>`
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.brand.dark};
`;

const Shortcut = ({
  icon,
  text,
  theme,
}: {
  icon: React.ReactElement;
  text: string;
  theme: any;
}) => (
  <Wrapper theme={theme}>
    {icon}
    <Text theme={theme}>{text}</Text>
  </Wrapper>
);

Shortcut.defaultProps = {
  theme,
};

export default Shortcut;
