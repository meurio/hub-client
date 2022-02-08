import styled from '@emotion/styled';
import { css } from "@emotion/react";

type Props = {
  type?: string;
  invalid?: boolean;
  disabled?: boolean;
  onBlur?: (e: any) => void;
  placeholder?: string;
  border?: boolean;
};

const RoundInput = styled.input<Props>`
  padding: 0 60px 0 15px;
  width: 100%;
  height: 40px;

  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #4A4A4A;
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
    color: #4A4A4A;
    font-family: 'Nunito Sans', sans-serif;
  }

  ${({ border, value, invalid }) =>
    border &&
    css`
      border: 1px solid;
      border-radius: 7px;
      ${!value
        ? css`
            &:hover,
            &:focus {
              border-color: #4A4A4A;
            }
            border-color: #4A4A4A;
          `
        : css`
            &:hover,
            &:focus {
              border-color: #4A4A4A;
            }
            border-color: #4A4A4A;
          `}
      ${invalid && `border-color: #FF2B4E;`}
    `}
`;

RoundInput.defaultProps = {
  invalid: false,
  type: 'text'
};

export default RoundInput;
