import styled from '@emotion/styled';
import { useField } from 'react-final-form';
import Box from './Box';
import Label from './Label';
import Raise from './Raise';

const InputStyled = styled.input`
  border: none;
  height: 2rem;
  outline: none;
  font-size: 0.9rem;
  width: 100%;
  font-family: "Nunito Sans", sans-serif;
  color: rgb(0, 0, 0);
  padding: 8px 0px;
  background: none;
`;

export interface InputFieldProperties {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProperties> = ({
  name,
  placeholder,
  type,
  label,
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
      <InputStyled
        {...input}
        disabled={disabled}
        placeholder={placeholder}
        type={type || input.type}
      />
    </>
  );
}

export default InputField;