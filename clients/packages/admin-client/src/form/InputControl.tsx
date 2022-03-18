import React from 'react';
import { FormLabel } from '.';
import Control from './Control';
import Input from './Input';

interface Properties {
  name: string;
  label: any;
  placeholder?: string;
  maxLength?: number;
}

const InputControl: React.FC<Properties> = ({
  name,
  label,
  maxLength,
  placeholder
}) => {
  return (
    <Control>
      <FormLabel name={name} maxLength={maxLength}>{label}</FormLabel>
      <Input type='text' name={name} placeholder={placeholder} />
    </Control>
  );
}

export default InputControl;