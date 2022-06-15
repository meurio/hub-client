import styled from "styled-components";
import theme from "../base/theme";

const Label = styled.label`
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 600;
  font-size: 13px;
  line-height: 1.15;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.commons.main};
  text-transform: uppercase;
`;

Label.defaultProps = {
  theme,
};

export default Label;
