import React from 'react';
import styled from '@emotion/styled';
import { useField } from 'react-final-form';
import Box from './Box';
import Label from './Label';
import Raise from './Raise';

const SelectStyled = styled.select`
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  color: rgb(0, 0, 0);
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: none;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 0px;
  box-shadow: none;
  background: none transparent;
  border-radius: 0px;
  display: inline-block;
  position: relative;
  width: 100%;
  cursor: pointer;
  padding-right: 32px !important;

  :focus-visible {
    outline: none;
  }
`;

export interface SelectFieldProperties {
  name: string;
  placeholder?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
  onChange?: any;
}

const SelectField: React.FC<SelectFieldProperties> = ({
  children,
  name,
  label,
  placeholder,
  onChange,
  disabled,
  validate
}) => {
  const { input, meta } = useField(name, { validate });

  return (
    <>
      <Box>
        {label && <Label>{label}</Label>}
        {meta.touched && meta.error && <Raise>{meta.error}</Raise>}
      </Box>
      <SelectStyled
        {...input}
        placeholder={placeholder}
        onChange={(e) => {
          input.onChange(e);
          onChange && onChange(e)
        }}
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </SelectStyled>
    </>
  )
}

export default SelectField;