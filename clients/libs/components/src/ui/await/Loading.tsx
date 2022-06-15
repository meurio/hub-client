import React from "react";
import styled from "styled-components";
import LoadingSVG, { LoadingSVGProps } from "./LoadingSVG";
import Header from "../content/Header";

interface FullSizeProps {
  background?: string;
}

const FullSize = styled.div<FullSizeProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.background};
`;

interface LoadingProps extends LoadingSVGProps {
  fullsize?: boolean;
  background?: string;
  message?: string;
  messageComponent?: any;
  align?: "center" | "left" | "right";
}

type LoadingStylesProps = Pick<LoadingProps, "align">;

const LoadingStyles = styled.div<LoadingStylesProps>`
  text-align: ${(props) => props.align};
`;

interface LoadingProps {
  align?: "center" | "left" | "right";
  fullsize?: boolean;
  background?: string;
  message?: string;
  messageComponent?: any;
}

/**
 * Animated loading transition component.
 */
const Loading: React.FC<LoadingProps> = ({
  children,
  align,
  fullsize,
  background,
  message,
  messageComponent: MessageComponent,
  ...props
}: any) => {
  return fullsize ? (
    <FullSize background={background}>
      <LoadingSVG {...props} />
      {message ? <MessageComponent>{message}</MessageComponent> : children}
    </FullSize>
  ) : (
    <LoadingStyles align={align}>
      <LoadingSVG {...props} />
      {message ? <MessageComponent>{message}</MessageComponent> : children}
    </LoadingStyles>
  );
};

Loading.defaultProps = {
  align: "center",
  fullsize: false,
  background: "rgba(219,219,219,0.31)",
  color: "#050505",
  size: "default",
  sparklesColor: "#35E3C3",
  sparklesColorInit: "#DBDBDB",
  sparklesDuration: "6s",
  messageComponent: Header.H3,
};

export default Loading;
