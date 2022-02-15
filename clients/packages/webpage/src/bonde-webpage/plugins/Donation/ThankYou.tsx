import React from 'react';
import Boleto from './Boleto';

type Props = {
  selectedValue: number;
  donation: any;
  mobilization: any;
  widget: any;
  overrides: any;
  handleConvertDonation: any;
};

const ThankYou = ({
  donation,
  widget,
  overrides,
  selectedValue,
  handleConvertDonation,
  ...ownProps
}: Props) => {
  const {
    settings: { finish_message_type: messageType },
  } = widget;
  const {
    FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
    FinishDefaultMessage: {
      component: FinishDefaultMessage,
      props: defaultProps,
    },
    FinishDonationMessage: {
      component: FinishDonationMessage,
      props: donationProps,
    },
  } = overrides;

  // Renderizar o componente de Boleto
  if (donation.payment_method === 'boleto' && donation.gateway_data)
    return (
      <Boleto
        {...ownProps}
        {...defaultProps}
        overrides={overrides}
        donation={donation}
        widget={widget}
      />
    );

  if (messageType === 'custom')
    return (
      <FinishCustomMessage {...ownProps} {...customProps} widget={widget} />
    );

  if (
    messageType === 'donation-recurrent' &&
    donation.payment_method !== 'boleto'
  ) {
    return (
      <FinishDonationMessage
        {...ownProps}
        {...donationProps}
        widget={widget}
        defaultSelectedValue={selectedValue}
        onClickDonate={(value?: any) => {
          if (value) {
            return handleConvertDonation({
              donation_id: donation.id,
              amount: widget.settings['donation_value' + value] + '00',
            });
          }
        }}
      />
    );
  }

  return (
    <FinishDefaultMessage {...ownProps} {...defaultProps} widget={widget} />
  );
};

export default ThankYou;
