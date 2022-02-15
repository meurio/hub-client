import React, { useState } from 'react';
import FormSelect from './FormSelect';
import TellAFriend from '../TellAFriend';
// import PropTypes from 'prop-types'
// import { TellAFriend } from '..';
// import { FormattedMessage } from 'react-intl';

// type Props = {
//   defaultSelectedValue: string | number;
//   mobilization: any;
//   widget: any;
//   onClickDonation: any;
// }

const FinishDonationMessage = ({
  defaultSelectedValue,
  mobilization,
  widget,
  onClickDonate,
  ...ownProps
}: any) => {
  const [value, setValue] = useState(defaultSelectedValue);
  const [success, setSuccess] = useState(false);

  const onChange = (e: any) => {
    setValue(e.currentTarget.value);
  };

  if (success) {
    const message = !!value ? 'donation: ok' : 'donation: not ok';
    return (
      <TellAFriend
        {...ownProps}
        mobilization={mobilization}
        widget={widget}
        message={message}
      />
    );
  }

  return (
    <FormSelect
      mobilization={mobilization}
      widget={widget}
      onChange={onChange}
      value={value}
      onSubmit={async (value: number | string) => {
        await onClickDonate(value);
        setValue(value);
        setSuccess(true);
      }}
    />
  );
};

export default FinishDonationMessage;
