import React from 'react';
import { FormLabel } from '.';
import Control from './Control';
import Textarea from './Textarea';

interface Properties {
  name: string;
  label: any;
  placeholder?: string;
  rows?: any;
  maxLength?: number;
}

const TextareaControl: React.FC<Properties> = ({
  name,
  label,
  rows,
  placeholder,
  maxLength
}) => {
  return (
    <Control>
      <FormLabel name={name} maxLength={maxLength}>{label}</FormLabel>
      <Textarea name={name} placeholder={placeholder} rows={rows} />
    </Control>
  );
}

export default TextareaControl;