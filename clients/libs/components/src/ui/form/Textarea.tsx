import styled from "styled-components";
import theme from "../base/theme";

type TextareaProps = {
  invalid?: boolean;
  fullWidth?: boolean;
  valid?: boolean;
  showValid?: boolean;
  touched?: boolean;
};

const Textarea = styled.textarea<TextareaProps>`
  ${(props) => props.fullWidth && "width: 100%;"}
  font-family: ${theme.fontFamily};
  font-size: 16px;
  color: #000000;
  border: none;
  border-bottom: 1px solid #aaaaaa;
  padding: 0 0 8px;
  flex: 1;
  background: none;
  min-height: 109px;

  &[disabled] {
    color: #d1cdd2;
    background: none;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.brand.main};
  }

  &::placeholder {
    color: ${theme.commons.dark};
  }
  &::-webkit-input-placeholder {
    color: ${theme.commons.dark};
  }
  &::-moz-placeholder {
    color: ${theme.commons.dark};
  }
  &:-ms-input-placeholder {
    color: ${theme.commons.dark};
  }
  &:-moz-placeholder {
    color: ${theme.commons.dark};
  }

  ${(props) => props.invalid && `border-color: #ff0931;`}
`;

Textarea.displayName = "Textarea";

/** @component */
export default Textarea;
