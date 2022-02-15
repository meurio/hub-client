import React from 'react';
import { fields } from '../utils';

const ShareButtons = ({ widget, overrides, mobilization }: any) => {
  // TODO: check how works greetings
  const message = fields(widget.settings).filter(
    (field: any) => field.kind === 'greetings'
  );

  if (message.length < 1) {
    const {
      settings: { finish_message_type: finishMessageType },
    } = widget;

    const {
      FinishCustomMessage: {
        component: FinishCustomMessage,
        props: customProps,
      },
      FinishDefaultMessage: {
        component: FinishDefaultMessage,
        props: defaultProps,
      },
    } = overrides;

    return finishMessageType === 'custom' ? (
      <FinishCustomMessage
        mobilization={mobilization}
        widget={widget}
        {...customProps}
      />
    ) : (
      <FinishDefaultMessage
        mobilization={mobilization}
        widget={widget}
        {...defaultProps}
      />
    );
  }

  return <p className="center p2 bg-darken-3">{message[0]}</p>;
};

export default ShareButtons;
