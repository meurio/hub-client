import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SettingsForm } from '../../../../../ux/components';
import { FormDomain } from '../../../../../mobilizations/components';
import * as paths from '../../../../../paths';

const MobilizationsSettingsDomainPage = ({
  location,
  history,
  mobilization,
  ...formProps
}) => {
  return (
    <FormDomain
      {...formProps}
      mobilization={mobilization}
      formComponent={SettingsForm}
      redirectToCreateDNS={() => history.push(paths.communityDomainCreate())}
      successMessage={
        <FormattedMessage
          id="page--mobilizations-domain.form-domain.success-message"
          defaultMessage="Dados de domínio salvos com sucesso"
        />
      }
    />
  );
};

export default MobilizationsSettingsDomainPage;
