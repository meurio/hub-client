import styled, { css } from "styled-components";
import theme from "../base/theme";

type Props = {
  type?: string;
  invalid?: boolean;
  disabled?: boolean;
  theme: any;
  onBlur?: (e: any) => void;
  placeholder?: string;
  border?: boolean;
};

const RoundInput = styled.input<Props>`
  padding: 0 60px 0 15px;
  width: 100%;
  height: 40px;

  font-family: ${(props) => props.theme.fontFamily};
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.commons.dark};
  border: none;
  box-sizing: border-box;
  background-color: unset;

  &[disabled] {
    color: #d1cdd2;
    background: unset;
  }

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &:-moz-placeholder {
    color: ${(props) => props.theme.commons.dark};
    font-family: ${(props) => props.theme.fontFamily};
  }

  ${({ border, value, theme, invalid }) =>
    border &&
    css`
      border: 1px solid;
      border-radius: 7px;
      ${!value
        ? css`
            &:hover,
            &:focus {
              border-color: ${theme.commons.main};
            }
            border-color: ${theme.commons.main};
          `
        : css`
            &:hover,
            &:focus {
              border-color: ${theme.brand.main};
            }
            border-color: ${theme.brand.main};
          `}
      ${invalid && `border-color: ${theme.error};`}
    `}
`;

RoundInput.defaultProps = {
  invalid: false,
  type: "text",
  theme,
};

export default RoundInput;
