import React from "react";
import styled from "styled-components";
import theme from "../base/theme";

const Link = styled((props: any) => {
  const { component: Component, className, ...ownProps } = props;
  return <Component className={className} {...ownProps} />;
})`
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) => props.theme.dark.color.main};
  cursor: pointer;

  &:hover,
  &:active {
    color: ${(props) => props.theme.dark.color.hover};
    text-decoration: underline;
  }
  &:focus {
    color: ${(props) => props.theme.dark.color.focus};
  }
`;

Link.defaultProps = {
  theme,
  component: "a",
};

export default Link;
