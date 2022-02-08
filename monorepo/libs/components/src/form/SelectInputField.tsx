import React from 'react';
import { useField } from 'react-final-form';
import { Select } from "@chakra-ui/react";
import FormField from "./FormField";

export interface SelectInputFieldProps {
  name: string
  label?: string
  placeholder?: string
  helpText?: string
  disabled?: boolean
  validate?: any
}

const SelectInputField: React.FC<SelectInputFieldProps> = (props) => {
  const { name, label, helpText, placeholder, disabled, children, ...config } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <Select disabled={disabled} placeholder={placeholder} {...input}>
        {children}
      </Select>
    </FormField>
  );
};

export default SelectInputField;
