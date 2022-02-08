import styled from '@emotion/styled';

type TextareaProps = {
  invalid?: boolean;
  fullWidth?: boolean;
  valid?: boolean;
  showValid?: boolean;
  touched?: boolean;
};

const Textarea = styled.textarea<TextareaProps>`
  ${props => props.fullWidth && 'width: 100%;'}
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  color: #000000;
  border: none;
  border-bottom: 1px solid #AAAAAA;
  padding: 0 0 8px;
  flex: 1;
  background: none;
  min-height: 109px;

  &[disabled] {
    color: #D1CDD2;
    background: none;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #ee0099;
  }

  &::placeholder {
    color: #4A4A4A;
  }
  &::-webkit-input-placeholder {
    color: #4A4A4A;
  }
  &::-moz-placeholder {
    color: #4A4A4A;
  }
  &:-ms-input-placeholder {
    color: #4A4A4A;
  }
  &:-moz-placeholder {
    color: #4A4A4A;
  }

  ${props => props.invalid && `border-color: #ff0931;`}
`;

Textarea.displayName = 'Textarea';

/** @component */
export default Textarea;
