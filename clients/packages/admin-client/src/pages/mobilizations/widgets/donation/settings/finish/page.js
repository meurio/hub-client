import React from 'react';
import { FormattedMessage } from 'react-intl';

import { FormFinishMessage } from '../../../../../../../mobilizations/widgets/components';
import {
  DonationTellAFriend,
  DonationFinishPostDonation,
} from '../../../../../../../mobilizations/widgets/__plugins__/donation/components';

const DonationSettingsFinish = (props) => (
  <FormFinishMessage
    {...props}
    TellAFriend={DonationTellAFriend}
    FinishPostDonation={DonationFinishPostDonation}
    successMessage={
      <FormattedMessage
        id="page--donation-widget-finish.form.success-message"
        defaultMessage="Formulário de pós-doação salvo com sucesso!"
      />
    }
  />
);

export default DonationSettingsFinish;
