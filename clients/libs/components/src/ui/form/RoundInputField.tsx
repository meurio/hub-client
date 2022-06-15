import React from "react";
import styled, { css } from "styled-components";
import { useField } from "react-final-form";
import FormField from "./FormField";
import Hint from "./Hint";
import RoundInput from "./RoundInput";
import Label from "./Label";
import theme from "../base/theme";

type Props = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: any) => void;
};

const StyledFormField = styled(FormField)<{
  invalid?: boolean;
  value?: string;
}>`
  border: 1px solid;
  border-radius: 7px;
  padding: 0;
  ${(props) =>
    !props.value
      ? css`
          &:hover,
          &:focus {
            border-color: ${props.theme.commons.main};
          }
          border-color: ${props.theme.commons.main};
        `
      : css`
          &:hover,
          &:focus {
            border-color: ${props.theme.brand.main};
          }
          border-color: ${props.theme.brand.main};
        `}

  ${(props) =>
    props.invalid &&
    `
    border-color: ${props.theme.error};
  `}
`;

StyledFormField.defaultProps = {
  theme,
};

const RoundInputField = ({
  name,
  type,
  label,
  placeholder,
  disabled,
  onBlur,
  ...config
}: Props) => {
  const { input, meta } = useField(name, config);
  return (
    <StyledFormField
      value={input.value}
      invalid={(meta.error || meta.submitError) && meta.touched}
    >
      {label && <Label>{label}</Label>}
      {(meta.error || meta.submitError) && meta.touched && (
        <Hint color="error">{meta.error || meta.submitError}</Hint>
      )}
      <RoundInput
        {...input}
        placeholder={placeholder}
        type={type}
        invalid={(meta.error || meta.submitError) && meta.touched}
        disabled={disabled}
        onBlur={(e: any) => {
          onBlur && onBlur(e);
          input.onBlur(e);
        }}
      />
    </StyledFormField>
  );
};

export default RoundInputField;
