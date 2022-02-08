import React from 'react';
import { Translate } from '../../components/MobilizationClass';
import TellAFriendBase from '../../components/ux/TellAFriendBase';

type Props = {
  mobilization: {
    twitter_share_text: string;
  };
  widget: {
    settings:
      | {
          whatsapp_text?: string;
        }
      | Record<string, any>;
  };
  href: string;
  imageUrl: string;
};

const FormTellAFriend = ({ mobilization, widget, ...props }: Props) => (
  <Translate>
    {({ t }: any) => (
      <TellAFriendBase
        mobilization={mobilization}
        widget={widget}
        message={t("Form Post Action")}
        {...props}
      />
    )}
  </Translate>
);

export default FormTellAFriend;
