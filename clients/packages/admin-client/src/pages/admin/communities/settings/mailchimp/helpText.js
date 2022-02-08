import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Warning } from 'components/notify'
import { Button, HelpBlock } from 'storybook/settings/forms'
import { notify } from 'utils/notifications'
import { resyncMailchimp } from 'community/action-creators'

export const MailchimpFormWarning = injectIntl(
  connect(undefined, (dispatch, ownProps) => ({
    onClick: () => {
      dispatch(resyncMailchimp())
        .then(({ sync_requested_at }) => {
          notify({
            status: 'success',
            message: {
              id: 'routes.admin.authenticated.sidebar.community-settings.mailchimp.resync.message',
              defaultMessage: 'Sincronia com Mailchimp solicitada com sucesso.'
            }
          }, dispatch, ownProps)
        })
        .catch((err) => {
          notify({
            status: 'error',
            title: 'Oops!',
            message: {
              id: 'routes.admin.authenticated.sidebar.community-settings.mailchimp.resync.message',
              defaultMessage: 'Houve um problema ao tentar sincronizar com mailchimp: {error}',
              context: {
                error: err.message || err
              }
            }
          }, dispatch, ownProps)
        })
    }
  }))(
    ({ onClick }) => (
      <Warning
        title={
          <FormattedMessage
            id='page--community-mailchimp.warning.title'
            defaultMessage='Atenção'
          />
        }
      >
        <FormattedMessage
          id='page--community-mailchimp.warning.content'
          defaultMessage={
            'Configure a integração com o mailchimp para que seja possível a criação ' +
            'de segmentos dos usuários que interagiram com o sua mobilização nele.' +
            '{br}' +
            'Adotamos o seguinte padrão no nome dos segmentos: ' +
            'M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)' +
            '{br}{br}' +
            'Caso sua base de ações não esteja sincronizada com o mailchimp, você pode forçar a sincronia no botão abaixo:'
          }
          values={{
            br: <br />
          }}
        />
        <Button
          style={{ margin: '10px 0' }}
          onClick={onClick}
        >
          <FormattedMessage
            id='page--community-mailchimp.form.button.sync'
            defaultMessage='Sincronizar'
          />
        </Button>
      </Warning>
    )
  )
)

export const MailchimpApiKeyHelp = () => (
  <HelpBlock level='warning'>
    <b>
      <FormattedMessage
        id='page--community-mailchimp.form.api-key.helper-text.title'
        defaultMessage='Onde buscar essa informação?'
      />
    </b>
    <br />
    <ol>
      <li>
        <FormattedMessage
          id='page--community-mailchimp.form.api-key.helper-text.step-01'
          defaultMessage={
            'Após fazer o login como administrador no mailchimp, ' +
            'clique no seu nome de usuário. Surgirá um menu, clique na opção {accountStrong}.'
          }
          values={{ accountStrong: <b>account</b> }}
        />
      </li>
      <li>
        <FormattedMessage
          id='page--community-mailchimp.form.api-key.helper-text.step-02'
          defaultMessage={
            'Siga os passos: {extrasStrong} > {apiKeysStrong} > ' +
            '{yourApiKeysStrong} > {createKeyStrong}'
          }
          values={{
            extrasStrong: <b>Extras</b>,
            apiKeysStrong: <b>API keys</b>,
            yourApiKeysStrong: <b>Your API keys</b>,
            createKeyStrong: <b>Create a Key</b>
          }}
        />
      </li>
      <li>
        <FormattedMessage
          id='page--community-mailchimp.form.api-key.helper-text.step-03'
          defaultMessage='Agora é só colar no campo abaixo o conteúdo de {apiKeyStrong}.'
          values={{ apiKeyStrong: <b>API key</b> }}
        />
      </li>
    </ol>
  </HelpBlock>
)

export const MailchimpListIdHelp = () => (
  <HelpBlock level='warning'>
    <b>
      <FormattedMessage
        id='page--community-mailchimp.form.list-id.helper-text.title'
        defaultMessage='Onde buscar essa informação?'
            />
    </b>
    <ol>
      <li>
        <FormattedMessage
          id='page--community-mailchimp.form.list-id.helper-text.step-01'
          defaultMessage={
                        'Após fazer o login como administrador no mailchimp, clique no seu ' +
                        'nome de usuário. Surgirá um menu, clique na opção {listStrong}.'
                    }
          values={{ listStrong: <b>List</b> }}
                />
      </li>
      <li>
        <FormattedMessage
          id='page--community-mailchimp.form.list-id.helper-text.step-02'
          defaultMessage={
                        'Selecione a lista correspondente e siga os passos: ' +
                        '{settingsStrong} > {listAndDefaultsStrong}'
                    }
          values={{
            settingsStrong: <b>Settings</b>,
            listAndDefaultsStrong: <b>Lists and Defaults</b>
          }}
                />
      </li>
      <li>
        <FormattedMessage
          id='page--community-mailchimp.form.list-id.helper-text.step-03'
          defaultMessage={
                        'Agora é só colar no campo abaixo o conteúdo da coluna a direita, ' +
                        'abaixo do título {listIdStrong}'
                    }
          values={{
            listIdStrong: <b>LIST ID</b>
          }}
                />
      </li>
    </ol>
  </HelpBlock>
)
