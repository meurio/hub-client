import React from 'react';
import classnames from 'classnames';
import { useForm } from 'bonde-components/form';

const Submit = ({ children }) => {
  const form = useForm();
  const { valid, submitting, dirty } = form.getState();

  return (
    <button
      type="submit"
      className={classnames('btn h3 white p2 rounded col-12', !valid ? 'bg-gray95' : 'bg-pagenta')}
      disabled={!valid || submitting || !dirty}
    >
      {children}
    </button>
  );
}

export default Submit;