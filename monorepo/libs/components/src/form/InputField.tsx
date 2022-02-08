import React from 'react';
import { useField } from 'react-final-form';
import { Input } from "@chakra-ui/react";
import FormField from "./FormField";

const InputField: React.FC<any> = (props) => {
  const {
    variant,
    label,
    name,
    placeholder,
    helpText,
    type,
    disabled,
    onBlur,
    ...config
  } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <Input
        variant={variant}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
        type={type || input.type}
        disabled={disabled}
        onBlur={e => {
          onBlur && onBlur(e);
          input.onBlur(e);
        }}
      />
    </FormField>
  );
};

export default InputField;
