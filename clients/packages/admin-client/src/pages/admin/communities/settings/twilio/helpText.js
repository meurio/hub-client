import React from 'react'
import { FormattedMessage } from 'react-intl'
import { HelpBlock } from 'storybook/settings/forms'

export const TwilioAccountSidHelp = () => (
  <HelpBlock level='warning'>
    <b>
      <FormattedMessage
        id='page--community-twilio.helper-text.title'
        defaultMessage='Onde buscar essa informação?'
      />
    </b>
    <br />
    <span>
      <FormattedMessage
        id='page--community-twilio.helper-text.twilio-login'
        defaultMessage='Faça login no {link}'
        values={{
          link: (
            <a href='https://www.twilio.com/login' target='_blank' rel="noopener noreferrer">
              <FormattedMessage
                id='page--community-twilio.helper-text.twilio-login.link'
                defaultMessage='site do Twilio'
              />
            </a>
          )
        }}
      />
      {' > '}<b>Account Summary</b>
      {' > '}<b>ACCOUNT SID</b>
    </span>
  </HelpBlock>
)

export const TwilioAuthTokenHelp = () => (
  <HelpBlock level='warning'>
    <b>
      <FormattedMessage
        id='page--community-twilio.helper-text.title'
        defaultMessage='Onde buscar essa informação?'
      />
    </b>
    <br />
    <span>
      <FormattedMessage
        id='page--community-twilio.helper-text.twilio-login'
        defaultMessage='Faça login no {link}'
        values={{
          link: (
            <a href='https://www.twilio.com/login' target='_blank' rel="noopener noreferrer">
              <FormattedMessage
                id='page--community-twilio.helper-text.twilio-login.link'
                defaultMessage='site do Twilio'
              />
            </a>
          )
        }}
      />
      {' > '}<b>Account Summary</b>
      {' > '}<b>AUTH TOKEN</b>
      {' > '}
      <b>
        <FormattedMessage
          id='page--community-twilio.form.twilio-auth-token.helper-text.eye-icon'
          defaultMessage='Clicar no ícone do olho'
        />
      </b>
    </span>
  </HelpBlock>
)

export const TwilioNumberHelp = () => (
  <HelpBlock level='warning'>
    <b>
      <FormattedMessage
        id='page--community-twilio.helper-text.title'
        defaultMessage='Onde buscar essa informação?'
      />
    </b>
    <br />
    <ol>
      <li>
        <FormattedMessage
          id='page--community-twilio.helper-text.twilio-login'
          defaultMessage='Faça login no {link}'
          values={{
            link: (
              <a href='https://www.twilio.com/login' target='_blank' rel="noopener noreferrer">
                <FormattedMessage
                  id='page--community-twilio.helper-text.twilio-login.link'
                  defaultMessage='site do Twilio'
                />
              </a>
            )
          }}
        />
      </li>
      <li>
        <FormattedMessage
          id='page--community-twilio.form.twilio-number.helper-text.menu-item'
          defaultMessage={
            'Clique em {strongPhoneNumber} ' +
            '(símbolo de {strongHashtag} no menu da esquerda)'
          }
          values={{
            strongPhoneNumber: <b>Phone Number</b>,
            strongHashtag: <b>#</b>
          }}
        />
      </li>
      <li>
        <FormattedMessage
          id='page--community-twilio.form.twilio-number.helper-text.choice-number'
          defaultMessage='Escolha qual número Twilio quer usar'
        />
      </li>
    </ol>
    <span />
  </HelpBlock>
)
