import React from 'react';
import { useField } from 'bonde-components/form';

interface Properties {
  name: string;
  placeholder?: string;
  rows?: any;
}

const Textarea: React.FC<Properties> = ({ name, placeholder, rows }) => {
  const { input } = useField(name);

  return (
    <textarea
      {...input}
      placeholder={placeholder}
      rows={rows}
      className='form-control-input textarea block lightestgray'
    />
  );
}

export default Textarea;