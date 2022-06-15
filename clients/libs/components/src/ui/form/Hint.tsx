import styled from "styled-components";
import theme from "../base/theme";

interface HintProps {
  color?: "error" | "warning" | "info";
}

const handleColor = ({ color }: HintProps) => {
  switch (color) {
    case "info":
      return "#aaa";
    case "error":
      return "#ff0931";
    default:
      return "#50e3c2";
  }
};

const Hint = styled.span`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 11px;
  font-weight: 600;
  line-height: 1.36;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: ${handleColor};
`;

Hint.defaultProps = {
  theme,
  color: "info",
};

export default Hint;
