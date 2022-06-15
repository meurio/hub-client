import React from "react";
import styled from "styled-components";
import Spacing from "../layout/Spacing";

type Props = {
  margin?: Record<string, number>;
  padding?: Record<string, number>;
  height?: string;
  onClick?: () => void;
  border?: string;
  width?: string;
  rounded?: string;
  children: any;
};

type CardProps = Omit<Props, "padding, margin, children">;

const CardStyled = styled.div<CardProps>`
  position: relative;
  border-radius: ${(props) => props.rounded || "1px"};
  background-color: #ffffff;
  box-shadow: 2px 1px 14px 11px rgba(0, 0, 0, 0.04);
  width: ${(props) => props.width || "100%"};
  display: block;
  ${({ height }) => height && `height: ${height};`}
  ${({ onClick }) => onClick && `cursor: pointer;`}
  ${({ border }) => border && `border: ${border};`}
`;

const Card = ({
  margin,
  padding,
  children,
  ...rest
}: Props): React.ReactElement => (
  <Spacing margin={margin}>
    <CardStyled {...rest}>
      <Spacing padding={padding}>{children}</Spacing>
    </CardStyled>
  </Spacing>
);

Card.defaultProps = {
  margin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

Card.displayName = "Card";

/** @component */
export default Card;
