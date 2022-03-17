import React from 'react';

import { FormattedMessage } from 'react-intl';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from '../../../../../components/forms';
import { SettingsForm } from '../../../../../ux/components';

const MobilizationsSettingsAnalyticsPage = (props) => {
  const {
    fields: { google_analytics_code: googleAnalyticsCode },
    ...formProps
  } = props;
  return (
    <div className="mobilization-analytics-page darkengray">
      <p className="h5">
        <FormattedMessage
          id="page--mobilizations-analytics.first-paragraph"
          defaultMessage="Para acompanhar os resultados da sua mobilização, você precisa configurar uma conta no Google Analytics."
        />
      </p>
      <p className="h5">
        <FormattedMessage
          id="page--mobilizations-analytics.second-paragraph"
          defaultMessage="Siga os passos abaixo:"
        />
      </p>
      <ol className="h5">
        <li className="link">
          <FormattedMessage
            id="page--mobilizations-analytics.ol.create-analytics-account"
            defaultMessage="Crie uma conta no Google Analytics {analyticsLink}"
            values={{
              analyticsLink: (
                <a
                  href="http://www.google.com/analytics/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage
                    id="page--mobilizations-analytics.ol.create-analytics-account.link"
                    defaultMessage="clicando aqui"
                  />
                </a>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            id="page--mobilizations-analytics.ol.keep-up-with"
            defaultMessage="Obtenha sua ID de acompanhamento no Google Analytics. É um código que começa sempre com as letras UA, que você verá após criar sua conta lá."
          />
        </li>
        <li className="m0">
          <FormattedMessage
            id="page--mobilizations-analytics.ol.paste-ga-code"
            defaultMessage="Copie a ID de acompanhamento e cole no campo abaixo:"
          />
          <SettingsForm {...formProps}>
            <FormGroup
              controlId="googleAnalyticsCodeId"
              {...googleAnalyticsCode}
            >
              <ControlLabel>
                <FormattedMessage
                  id="page--mobilizations-analytics.ol.form.ga-code.label"
                  defaultMessage="ID do Google Analytics"
                />
              </ControlLabel>
              <FormControl
                type="text"
                placeholder="UA-00000000-0 ou G-A00A0AAAA0"
              />
            </FormGroup>
          </SettingsForm>
        </li>
        <li>
          <FormattedMessage
            id="page--mobilizations-analytics.ol.done"
            defaultMessage="Pronto! Você já pode acompanhar as estatísticas da sua mobilização no Google Analytics!"
          />
        </li>
      </ol>
    </div>
  );
};

export default MobilizationsSettingsAnalyticsPage;
