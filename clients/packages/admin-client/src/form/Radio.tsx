import React from 'react';
import classnames from 'classnames';
import { useField } from 'bonde-components/form';

interface Properties {
  name: string;
  value: string;
  className?: string;
}

const Radio: React.FC<Properties> = ({
  children,
  className,
  name,
  value
}) => {
  const { input } = useField(name, { value, type: "radio" });
  return (
    <label className={classnames('form-radio pr2', className)}>
      <input {...input} className='mr1' />
      {children}
    </label>
  );
}

export default Radio;