import React from "react";
import styled from "styled-components";
import Bonde from "../content/Bonde";
import theme from "../base/theme";

const Footer = styled(({ className, children }: any) => (
  <div className={className}>
    <Bonde />
    {children}
  </div>
))`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.body.background.dark};
  padding: 20px ${({ theme }) => theme.body.padding}px;
`;

Footer.defaultProps = {
  theme,
};

export default Footer;
