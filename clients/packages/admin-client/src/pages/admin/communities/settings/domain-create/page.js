import React, { Component } from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import { FormRedux, ControlLabel, FormControl, FormGroup } from 'components/forms'
import { Button } from 'ux/components'
import * as dnsMessages from 'community/notifications/dns'
import { Steps, Step } from 'steps'
import { DomainStep } from 'community/components/dns'
import { Preformatted } from 'components/markdown'
import { Title, Subtitle } from 'components/title'
import * as paths from 'paths'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dns: undefined,
      renderTestConnection: false
    }
  }

  handleTestConnection () {
    const { asyncCheckHostedZone, notify, intl } = this.props
    asyncCheckHostedZone(this.state.dns)
      .then(dns => {
        this.setState({ dns })

        if (!dns.ns_ok) notify(dnsMessages.checkDNSFailure(intl))
        else notify(dnsMessages.checkDNSSuccess(intl))
      })
  }

  render () {
    const {
      saving,
      asyncAddHostedZone,
      asyncDeleteHostedZone,
      fields: { domain_name: domainName },
      intl,
      ...formProps
    } = this.props

    return (
      <div className='page'>
        <Steps
          renderRule={(position, current) => position <= current}
          progressValidations={[
            () => this.state.dns !== undefined,
            () => this.state.renderTestConnection,
            () => this.state.dns && this.state.dns.ns_ok
          ]}
        >
          <Step
            stepComponent={DomainStep}
            title={intl.formatMessage({
              id: 'page--community-domain-create.step-add.title',
              defaultMessage: 'Insira o domínio desejado'
            })}
          >
            <FormRedux
              nosubmit
              {...formProps}
              onSubmit={values =>
                asyncAddHostedZone(values)
                  .then(dns => {
                    if (dns.status !== 'error') {
                      this.setState({ dns })
                    }
                  })
              }
            >
              <FormGroup {...domainName}>
                <ControlLabel>
                  <FormattedMessage
                    id='page--community-domain-create.step-add.form.domain-name.label'
                    defaultMessage='Domínio da sua comunidade'
                  />
                </ControlLabel>
                <FormControl
                  type='text'
                  placeholder={intl.formatMessage({
                    id: 'page--community-domain-create.step-add.form.domain-name.placeholder',
                    defaultMessage: 'Ex. minhacomunidade.org'
                  })}
                  disabled={this.state.dns !== undefined}
                />
              </FormGroup>
              <div className={styles.actionButtons}>
                <span style={{ marginRight: '1rem' }}>
                  <Button
                    type='button'
                    disabled={saving || this.state.dns !== undefined}
                    onClick={() => this.props.history.push(paths.communityDomain())}
                  >
                    <FormattedMessage
                      id='page--community-domain-create.step-add.form.cancel-button.text'
                      defaultMessage='Cancelar'
                  />
                  </Button>
                </span>
                <Button disabled={saving || this.state.dns !== undefined} type='submit'>
                  <FormattedMessage
                    id='page--community-domain-create.step-add.form.button.text'
                    defaultMessage='Adicionar'
                  />
                </Button>
              </div>
            </FormRedux>
          </Step>

          <Step
            stepComponent={DomainStep}
            title={intl.formatMessage({
              id: 'page--community-domain-create.step-dns-servers.step-title',
              defaultMessage: 'Altere os servidores do seu provedor DNS'
            })}
          >
            <Title size='2'>
              <FormattedMessage
                id='page--community-domain-create.step-dns-servers.title'
                defaultMessage='O que são servidores DNS?'
              />
            </Title>
            <Subtitle>
              <FormattedMessage
                id='page--community-domain-create.step-dns-servers.subtitle.first-paragraph'
                defaultMessage={
                  'Os Servidores DNS são endereços utilizados pelas organizações de registro de ' +
                  'domínios como {registroBr} ou {goDaddy}, para identificarem em qual ' +
                  'servidor se encontram as informações sobre o domínio registrado.'
                }
                values={{
                  registroBr: <a href='https://registro.br'>registro.br</a>,
                  goDaddy: <a href='https://br.godaddy.com'>godaddy.com</a>
                }}
              />
              <br /><br />
              <FormattedMessage
                id='page--community-domain-create.step-dns-servers.subtitle.second-paragraph'
                defaultMessage={
                  'Complete a ativação do domínio alterando os servidores DNS, onde o domínio ' +
                  'foi registrado, para os endereços abaixo:'
                }
              />
            </Subtitle>
            {
              this.state.dns &&
              this.state.dns.delegation_set_servers && (
                <Preformatted>
                  {this.state.dns.delegation_set_servers.map(
                    (server, index) => !index ? server : `\n${server}`
                  )}
                </Preformatted>
            )}
            <div className={styles.actionButtons}>
              <span style={{ marginRight: '1rem' }}>
                <Button
                  type='button'
                  onClick={() => this.props.history.push(paths.communityDomain())}
                >
                  <FormattedMessage
                    id='page--community-domain-create.step-dns-servers.change-later-button.text'
                    defaultMessage='Trocar depois'
                  />
                </Button>
              </span>
              <Button
                onClick={() => {
                  const { location: { query } } = this.props
                  if (query && query.next) {
                    this.props.history.push(query.next)
                  } else {
                    this.setState({ renderTestConnection: true })
                  }
                }}
              >
                <FormattedMessage
                  id='page--community-domain-create.step-dns-servers.button.text'
                  defaultMessage='Continuar'
                />
              </Button>
            </div>
          </Step>

          <Step
            stepComponent={DomainStep}
            title={intl.formatMessage({
              id: 'page--community-domain-create.step-check.title',
              defaultMessage: 'Teste a conexão'
            })}
          >
            <div>
              <p>
                <FormattedMessage
                  id='page--community-domain-create.step-check.first-paragraph'
                  defaultMessage='Clique no botão abaixo para verificar se tudo está certo.'
                />
              </p>
              <p>
                <FormattedMessage
                  id='page--community-domain-create.step-check.second-paragraph'
                  defaultMessage={
                    'Atenção: a mudança de DNS pode demorar até 48 horas para ' +
                    'ser propagada pela internet.'
                  }
                />
              </p>
            </div>
            <div className={styles.actionButtons}>
              <span style={{ marginRight: '1rem' }}>
                <Button
                  type='button'
                  onClick={() => this.props.history.push(paths.communityDomain())}
                >
                  <FormattedMessage
                    id='page--community-domain-create.step-check.test-later-button.text'
                    defaultMessage='Testar depois'
                  />
                </Button>
              </span>
              <Button onClick={() => this.handleTestConnection()}>
                <FormattedMessage
                  id='page--community-domain-create.step-check.button.text'
                  defaultMessage='Testar'
                />
              </Button>
            </div>
          </Step>
        </Steps>
      </div>
    )
  }
}

Page.propTypes = {
  intl: intlShape.isRequired
}

export default Page
