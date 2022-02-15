import React from 'react';

import styled from '@emotion/styled';

import { Translate } from '../MobilizationClass';

type Props = {
  color?: string;
};

const Text = styled.span<Props>`
  display: block;
  background: none;
  color: ${(props) => props.color || '#fff'};
  font-size: 14px;
  text-align: left;
  margin: 1.5rem 0 1rem 0;

  a {
    color: ${(props) => props.color || '#fff'};
  }
`;

// eslint-disable-next-line react/display-name
export default ({ color }: any) => {
  return (
    <Translate>
      {({ t, Trans, mobilization }) => {
        const politicalLink =
          mobilization?.language === 'es'
            ? '/static/politica-de-privacidad.pdf'
            : '/static/politica-de-privacidade.pdf';

        return (
          <Text color={color}>
            <Trans i18nKey="Disclaimer">
              {`Ao inserir seus dados, você concorda em ter seus dados compartilhados com os organizadores dessa página e aceita receber emails de atualização, conforme descrito na `}
              <a
                href={politicalLink}
                title={t('Political')}
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidade
              </a>
              {`. Você pode cancelar o recebimento desses e-mails a qualquer momento.`}
            </Trans>
          </Text>
        );
      }}
    </Translate>
  );
};
