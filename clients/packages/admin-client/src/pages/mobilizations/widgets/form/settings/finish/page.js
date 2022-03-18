import React from 'react';
import { FormattedMessage } from 'react-intl';

import { FormFinishMessage } from '../../../../../../../mobilizations/widgets/components';
import { FormTellAFriend } from '../../../../../../../mobilizations/widgets/__plugins__/form/components';

const FormSettingsFinishPage = (props) => (
  <FormFinishMessage
    {...props}
    TellAFriend={FormTellAFriend}
    successMessage={
      <FormattedMessage
        id="page--form-widget-finish.success-message"
        defaultMessage="Formulário de pós-inscrição salvo com sucesso!"
      />
    }
  />
);

export default FormSettingsFinishPage;
