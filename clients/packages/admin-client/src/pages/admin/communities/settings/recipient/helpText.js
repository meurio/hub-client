import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Warning } from 'components/notify'

export const RecipientFormWarning = () => (
  <Warning
    title={
      <FormattedMessage
        id='page--community-recipient.warning.title'
        defaultMessage='Importante'
      />
    }
  >
    <ul style={{ paddingLeft: 15, marginBottom: 0 }}>
      <li>
        <FormattedMessage
          id='page--community-recipient.warning.content.list.li-01'
          defaultMessage={
            'Informe: Preencha sua conta bancária abaixo para trasferirmos ' +
            'automaticamente as doações recebidas por sua comunidade.'
          }
        />
      </li>
      <li>
        <FormattedMessage
          id='page--community-recipient.warning.content.list.li-02'
          defaultMessage={
            'Atenção 1: Não é possível fazer a transferência de uma doação já ' +
            'recebida para uma nova conta bancária, sempre será utilizada a conta ' +
            'bancária ativa no momento da doação.'
          }
        />
      </li>
      <li>
        <FormattedMessage
          id='page--community-recipient.warning.content.list.li-03'
          defaultMessage={
            'Atenção 2: As doações só ficam disponíveis 31 dias após a transação ' +
            'de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) ' +
            'no caso de transações com uma parcela e 2 dias úteis após o pagamento ' +
            'do boleto bancário. Caso a transação tenha de 2 a 12 parcelas, o ' +
            'recebimento normal será da seguinte forma: primeira parcela em 31 dias, ' +
            'segunda em 61, terceira em 91, e assim por diante.'
          }
        />
      </li>
    </ul>
  </Warning>
)
