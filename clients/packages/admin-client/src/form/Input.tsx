import React from 'react';
import { useField } from 'bonde-components/form';

interface Properties {
  name: string;
  placeholder?: string;
  type?: string
}

const Input: React.FC<Properties> = ({ name, placeholder, type = 'text' }) => {
  const { input } = useField(name);

  return (
    <input
      {...input}
      className='form-control-input input block lightestgray'
      type={type}
      placeholder={placeholder}
    />
  );
}

export default Input;