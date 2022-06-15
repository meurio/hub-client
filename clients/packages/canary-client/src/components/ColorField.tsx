import React from 'react';
import { FormField, Label, form } from 'bonde-components';
const { useField } = form;
import { SketchPicker } from 'react-color';

interface ColorFieldProperties {
  name: string;
  label: string;
}

const ColorField: React.FC<ColorFieldProperties> = ({ name, label }) => {
  const { input } = useField(name);

  return (
    <FormField>
      <Label>{label}</Label>
      <div style={{ padding: '8px 0' }}>
        <SketchPicker
          color={input.value}
          onChangeComplete={(color: any) => input.onChange(color.hex)}
        />
      </div>
    </FormField>
  );
}

export default ColorField;