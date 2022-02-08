import React from 'react';
import { useField } from 'react-final-form';
import styled from '@emotion/styled';
import Label from './Label';
import Raise from './Raise';
import Box from './Box';

const TextareaStyled = styled.textarea`
  width: 100%;
  font-family: "Nunito Sans", sans-serif;
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
  }
`;

export interface TextareaFieldProperties {
  name: string;
  placeholder?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
}

const TextareaField: React.FC<TextareaFieldProperties> = ({
  name,
  placeholder,
  disabled,
  label,
  validate
}) => {
  const { input, meta } = useField(name, { validate });

  return (
    <>
      <Box>
        {label && <Label>{label}</Label>}
        {meta.touched && meta.error && <Raise>{meta.error}</Raise>}
      </Box>
      <TextareaStyled {...input} placeholder={placeholder} disabled={disabled} />
    </>
  );
};

export default TextareaField;