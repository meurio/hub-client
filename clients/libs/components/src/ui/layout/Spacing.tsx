import styled from "styled-components";
import React from "react";

type Props = {
  /** The margin property. */
  margin: {
    x?: number;
    y?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  /** The padding property. */
  padding: {
    x?: number;
    y?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  children: any;
};

type SpacingProps = {
  margin: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  padding: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

const SpacingStyled = styled.div<SpacingProps>`
  ${({ margin }) => margin.top && `margin-top: ${margin.top}px;`}
  ${({ margin }) => margin.bottom && `margin-bottom: ${margin.bottom}px;`}
  ${({ margin }) => margin.left && `margin-left: ${margin.left}px;`}
  ${({ margin }) => margin.right && `margin-right: ${margin.right}px;`}
  ${({ padding }) => padding.top && `padding-top: ${padding.top}px;`}
  ${({ padding }) => padding.bottom && `padding-bottom: ${padding.bottom}px;`}
  ${({ padding }) => padding.left && `padding-left: ${padding.left}px;`}
  ${({ padding }) => padding.right && `padding-right: ${padding.right}px;`}
`;

/**
 * The only true Spacing component.
 */
const Spacing = ({
  margin,
  padding,
  ...ownProps
}: Props): React.ReactElement => {
  const { x: marginX, y: marginY } = margin;
  const { x: paddingX, y: paddingY } = padding;
  return (
    <SpacingStyled
      {...ownProps}
      margin={{
        top: marginY || margin.top,
        bottom: marginY || margin.bottom,
        left: marginX || margin.left,
        right: marginX || margin.right,
      }}
      padding={{
        top: paddingY || padding.top,
        bottom: paddingY || padding.bottom,
        left: paddingX || padding.left,
        right: paddingX || padding.right,
      }}
    />
  );
};

Spacing.displayName = "Spacing";

Spacing.defaultProps = {
  margin: {},
  padding: {},
};

/** @component */
export default Spacing;
