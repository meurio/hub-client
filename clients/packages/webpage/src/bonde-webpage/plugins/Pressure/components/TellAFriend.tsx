import React from 'react';

// import { FormattedMessage } from 'react-intl'
import { Translate } from '../../../components/MobilizationClass';
import TellAFriendBase from '../../../components/ux/TellAFriendBase';

type Props = {
  preview: boolean;
  mobilization: {
    twitter_share_text: string;
  };
  widget: {
    settings: {
      whatsapp_text: string;
    };
  };
  href: string;
  imageUrl: string;
  imageWidth: string;
};

const PressureTellAFriend = ({
  preview,
  mobilization,
  widget,
  ...props
}: Props) => (
  <Translate>
    {({ t }: any) => (
      <TellAFriendBase
        preview={preview}
        mobilization={mobilization}
        widget={widget}
        message={t('Pressure Post Action')}
        {...props}
      />
    )}
  </Translate>
);

export default PressureTellAFriend;
