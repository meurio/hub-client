import React from 'react';
import { useField, UseFieldConfig } from 'react-final-form';
import FormField from './FormField';
import RoundInput from './RoundInput';

interface Props extends UseFieldConfig<any, any> {
  name: string;
  type?: string;
  label?: string;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: any) => void;
}

const RoundInputField: React.FC<Props> = ({
  name,
  type,
  label,
  helpText,
  placeholder,
  disabled,
  onBlur,
  ...config
}) => {
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText}>
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
    </FormField>
  );
};

export default RoundInputField;
