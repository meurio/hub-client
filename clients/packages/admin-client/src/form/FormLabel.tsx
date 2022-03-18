import React from 'react';
import classnames from 'classnames';
import { useField } from 'bonde-components/form';
import { InputCounter } from '../components/form-util';
import { Raise } from '../components/forms';

const FormLabel: React.FC<any> = ({
  children,
  className,
  name,
  maxLength
}) => {
  const { meta: { error, touched }, input: { value } } = useField(name, { subscription: { error: true, touched: true, value: true } });

  return (
    <label style={{ cursor: 'pointer' }}>
      <span className={classnames('caps', className)}>{children}</span>
      {!!maxLength && (
        <InputCounter
          className='right regular'
          maxLength={maxLength}
          length={value ? value.length : 0}
        />
      )}
      {error && touched && <Raise className="" error={error} componentClass="span" />}
    </label>
  );
}

export default FormLabel;