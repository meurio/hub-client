import React from 'react';
import { useField } from 'react-final-form';
import { SketchPicker } from 'react-color';
import FormField from "./FormField";

const ColorField: React.FC<any> = (props): any => {
  const {
    label,
    name,
    helpText,
    ...config
  } = props;
  const { input, meta } = useField(name, config);

  return (
    <FormField label={label} helpText={helpText} meta={meta}>
      <SketchPicker
        color={input.value}
        onChangeComplete={(color: any) => input.onChange(color.hex)}
      />
    </FormField>
  );
}

export default ColorField;