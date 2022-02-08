import React from 'react';
import { useField } from 'react-final-form';
import FormField from './FormField';
import Textarea from './Textarea';

const TextareaField: React.FC<any> = (props) => {
  const { label, helpText, name, placeholder, disabled, ...config } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <div style={{display: "flex", paddingTop: "8px"}}>
        <Textarea
          placeholder={placeholder}
          invalid={(meta.error || meta.submitError) && meta.touched}
          disabled={disabled}
          {...input}
        />
      </div>
    </FormField>
  );
};

export default TextareaField;
