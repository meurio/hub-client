import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { FormGroup, ControlLabel, FormControl, FormDropdown, Raise } from 'components/forms'
import { isBoolean } from 'utils/type-checker'

if (require('exenv').canUseDOM) require('./form-domain.scss')

const HeaderToggle = ({ children, show, onToggle }) => (
  <h3 onClick={onToggle} style={{ cursor: 'pointer' }}>
    <i
      className={classnames('fa', !show ? 'fa-arrow-right' : 'fa-arrow-down')}
      style={{ marginRight: '5px' }}
    />
    {children}
  </h3>
)

const CreateDomainText = ({ onClickLink }) => (
  <p className='h5'>
    <FormattedMessage
      id='mobilizations.components--form-domain.create-domain-text.first-line'
      defaultMessage={
        'Ops, você ainda não tem um domínio configurado na sua comunidade. ' +
        'Se quiser cadastar, {link}.'
      }
      values={{
        link: (
          <a href='/' onClick={onClickLink} target='_self'>
            <FormattedMessage
              id='mobilizations.components--form-domain.create-domain-text.first-line.link'
              defaultMessage='clique aqui'
            />
          </a>
        )
      }}
    />
    <br />
    <FormattedMessage
      id='mobilizations.components--form-domain.create-domain-text.second-line'
      defaultMessage='Senão você pode, abaixo, usar um domínio externo para configurar o endereço da sua mobilização.'
      />
  </p>
)

const InputError = (field) => field.error && field.touched ? (
  <Raise error={field.error} componentClass='p' />
) : undefined

class FormDomain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showSubdomain: false,
      showExternalDomain: false,
      showRootDomain: false
    }
  }

  componentDidMount () {
    const { hostedZones, mobilization: { custom_domain: customDomain } } = this.props

    /* eslint-disable no-useless-escape */
    const subdomainRegex = zone => new RegExp(`^www\..+\.${zone.domain_name}$`).test(customDomain)
    const rootDomainRegex = zone => new RegExp(`^www\.${zone.domain_name}$`).test(customDomain)
    /* eslint-disable no-useless-escape */

    const hasCustomDomain = !!customDomain
    const isSubdomain = hostedZones.some(subdomainRegex)
    const isRootDomain = hostedZones.some(rootDomainRegex)

    if (!hasCustomDomain || isSubdomain) {
      this.toggle('showSubdomain', !this.state.showSubdomain)
    } else if (hasCustomDomain && !isSubdomain && !isRootDomain) {
      this.toggle('showExternalDomain', !this.state.showExternalDomain)
    } else if (isRootDomain) {
      this.toggle('showRootDomain', !this.state.showRootDomain)
    }
  }

  clickHere (e) {
    e.preventDefault()
    this.props.redirectToCreateDNS()
  }

  toggle (key, value) {
    if (key === 'showExternalDomain') {
      this.props.fields.advancedConfig.onChange(value)
      const state = { [key]: value }
      if (value === true) {
        state.showSubdomain = false
        state.showRootDomain = false
        this.props.fields.rootDomainConfig.onChange(false)
      }
      this.setState(state)
    } else if (key === 'showSubdomain') {
      const state = { [key]: value }
      if (value === true) {
        state.showExternalDomain = false
        state.showRootDomain = false
        this.props.fields.advancedConfig.onChange(false)
        this.props.fields.rootDomainConfig.onChange(false)
      }
      this.setState(state)
    } else if (key === 'showRootDomain') {
      this.props.fields.rootDomainConfig.onChange(value)
      const state = { [key]: value }
      if (value === true) {
        state.showSubdomain = false
        state.showExternalDomain = false
        this.props.fields.advancedConfig.onChange(false)
      }
      this.setState(state)
    }
  }

  renderCNAMETable () {
    const { mobilization, fields: { externalDomain } } = this.props
    let host = externalDomain ? externalDomain.value : ''
    if (host.startsWith('www.')) {
      host = host.replace('www.', '')
    }
    return (
      <div className='h5'>
        <p>
          <FormattedMessage
            id='mobilizations.components--form-domain.cname-table.helper-text'
            defaultMessage={
            '{strong}: você vai precisar configurar este domínio no seu servidor de registro para que o endereço seja redirecionado à página da sua mobilização. Pra isso, você vai precisar dessas informações aqui embaixo, anote aí:'
            }
            values={{
              strong: (
                <strong>
                  <FormattedMessage
                    id='mobilizations.components--form-domain.cname-table.helper-text.strong'
                    defaultMessage='Não esqueça'
                  />
                </strong>
              )
            }}
          />
        </p>
        <table className='col-12 left-align'>
          <tbody>
            <tr>
              <th>
                <FormattedMessage
                  id='mobilizations.components--form-domain.cname-table.header.name'
                  defaultMessage='Nome'
                />
              </th>
              <th>
                <FormattedMessage
                  id='mobilizations.components--form-domain.cname-table.header.record-type'
                  defaultMessage='Tipo'
                />
              </th>
              <th>
                <FormattedMessage
                  id='mobilizations.components--form-domain.cname-table.header.data'
                  defaultMessage='Dados'
                />
              </th>
            </tr>
            <tr>
              <td><code>{host}</code></td>
              <td><code>CNAME</code></td>
              <td><code>{mobilization.slug}.{process.env.REACT_APP_DOMAIN_ADMIN}</code></td>
            </tr>
            <tr>
              <td><code>{`www.${host}`}</code></td>
              <td><code>CNAME</code></td>
              <td><code>{mobilization.slug}.{process.env.REACT_APP_DOMAIN_ADMIN}</code></td>
            </tr>
          </tbody>
        </table>
        <p>
          <FormattedMessage
            id='mobilizations.components--form-domain.cname-table.footer.helper-text'
            defaultMessage={
              'Se tiver alguma dúvida, dá uma olhada no tópico "Configurando seu domínio no BONDE", no nosso tutorial, o {link}.'
            }
            values={{
              link: (
                <a href='https://trilho.bonde.org' target='_blank' rel='noopener noreferrer'>
                  <FormattedMessage
                    id='mobilizations.components--form-domain.cname-table.footer.helper-text.link'
                    defaultMessage='Trilho {icon}'
                    values={{
                      icon: (
                        <i className='fa fa-external-link' style={{ fontSize: '.7rem' }} />
                      )
                    }}
                  />
                </a>
              )
            }}
          />
        </p>
      </div>
    )
  }

  render () {
    const {
      formComponent: FormComponent,
      error,
      fields: { domain, subdomain, externalDomain, rootDomain },
      hostedZones,
      intl,
      ...formProps
    } = this.props

    return (
      <div className='components--form-domain'>
        <FormComponent {...formProps}>
          <p className='h5 mb3'>
            <FormattedMessage
              id='mobilizations.components--form-domain.helper-text-first-line'
              defaultMessage='Estamos quase lá, antes de publicar sua mobilização é preciso escolher a url que será usada para publicação.'
            />
            <br />
            <FormattedMessage
              id='mobilizations.components--form-domain.helper-text-second-line'
              defaultMessage='Já cadastrou um domínio na comunidade? Selecione abaixo qual das opções melhor se encaixa.'
              />
            <br />
            <FormattedMessage
              id='mobilizations.components--form-domain.helper-text-third-line'
              defaultMessage={
                  'Quer cadastrar um novo domínio? {link}.'
                }
              values={{
                link: (
                  <a href='/' onClick={this.clickHere.bind(this)} target='_self'>
                    <FormattedMessage
                      id='mobilizations.components--form-domain.helper-text-third-line.link'
                      defaultMessage='Clique aqui'
                      />
                  </a>
                  )
              }}
              />
          </p>

          {error && <p>{error}</p>}

          <div className='basic-config' style={{ marginBottom: '1rem' }}>
            <HeaderToggle
              onToggle={() => this.toggle('showSubdomain', !this.state.showSubdomain)}
              show={this.state.showSubdomain}
            >
              <FormattedMessage
                id='mobilizations.components--form-domain.basic.header-toggle.use-existing-domain'
                defaultMessage='Quero usar um novo sub-domínio'
              />
            </HeaderToggle>
            {this.state.showSubdomain && (
              hostedZones.length > 0 ? (
                <div>
                  <p className='h5'>
                    <FormattedMessage
                      id='mobilizations.components--form-domain.basic.helper-text'
                      defaultMessage='Preencha abaixo o subdomínio e escolha o domínio que deseja configurar como endereço da sua mobilização'
                    />
                  </p>
                  <div className='form-groups-container flex flex-wrap'>
                    <div className='prefix'>www.</div>
                    <FormGroup controlId='subdomain' {...subdomain}>
                      <ControlLabel hideError>
                        <FormattedMessage
                          id='mobilizations.components--form-domain.basic.form.subdomain.label'
                          defaultMessage='Subdomínio'
                        />
                      </ControlLabel>
                      <FormControl
                        type='text'
                        placeholder={
                          intl.formatMessage({
                            id: 'mobilizations.components--form-domain.basic.form.subdomain.placeholder',
                            defaultMessage: 'nomedamob'
                          })
                        }
                      />
                    </FormGroup>
                    <div className='delimiter'>
                      <strong>.</strong>
                    </div>
                    <FormGroup controlId='domain' {...domain}>
                      <ControlLabel hideError>
                        <FormattedMessage
                          id='mobilizations.components--form-domain.basic.form.domain.label'
                          defaultMessage='Domínio Principal'
                        />
                      </ControlLabel>
                      <FormDropdown
                        onChange={e => domain.onChange(e.target.value)}
                        value={
                          (isBoolean(domain.value) ? false : domain.value) ||
                          domain.initialValue || ''
                        }
                      >
                        <option value='' disabled>
                          {intl.formatMessage({
                            id: 'mobilizations.components--form-domain.basic.form.domain.button.choice',
                            defaultMessage: 'Escolha...'
                          })}
                        </option>
                        {hostedZones.map((obj, i) => (
                          <option key={`hostedZone-${i}`} value={obj.domain_name}>
                            {obj.domain_name}
                          </option>
                        ))}
                      </FormDropdown>
                    </FormGroup>
                  </div>
                  {InputError(subdomain)}
                </div>
              ) : (
                <div>
                  <CreateDomainText
                    onClickLink={this.clickHere.bind(this)}
                  />
                </div>
              )
            )}
          </div>

          <div className='root-domain-config basic-config' style={{ marginBottom: '1rem' }}>
            <HeaderToggle
              onToggle={() => this.toggle('showRootDomain', !this.state.showRootDomain)}
              show={this.state.showRootDomain}
            >
              <FormattedMessage
                id='mobilizations.components--form-domain.root.header-toggle.use-root-domain'
                defaultMessage='Quero usar um domínio principal cadastrado na comunidade'
              />
            </HeaderToggle>
            {this.state.showRootDomain && (
              hostedZones.length > 0 ? (
                <div>
                  <p className='h5'>
                    <FormattedMessage
                      id='mobilizations.components--form-domain.root.helper-text'
                      defaultMessage='Escolha o domínio que deseja configurar como endereço da sua mobilização'
                    />
                  </p>
                  <div className='form-groups-container flex flex-wrap'>
                    <div className='prefix'>www.</div>
                    <FormGroup controlId='rootDomain' {...rootDomain}>
                      <ControlLabel hideError>
                        <FormattedMessage
                          id='mobilizations.components--form-domain.basic.form.domain.label'
                          defaultMessage='Domínio Principal'
                        />
                      </ControlLabel>
                      <FormDropdown
                        onChange={e => rootDomain.onChange(e.target.value)}
                        value={
                          (isBoolean(rootDomain.value) ? false : rootDomain.value) ||
                          rootDomain.initialValue || ''
                        }
                      >
                        <option value='' disabled>
                          {intl.formatMessage({
                            id: 'mobilizations.components--form-domain.basic.form.domain.button.choice',
                            defaultMessage: 'Escolha...'
                          })}
                        </option>
                        {hostedZones.map((obj, i) => (
                          <option
                            key={`hostedZone-${i}`}
                            value={obj.domain_name}
                          >
                            {obj.domain_name}
                          </option>
                        ))}
                      </FormDropdown>
                    </FormGroup>
                  </div>
                  {InputError(rootDomain)}
                </div>
              ) : (
                <div>
                  <CreateDomainText
                    onClickLink={this.clickHere.bind(this)}
                  />
                </div>
              )
            )}
          </div>

          <div className='advanced-config'>
            <HeaderToggle
              onToggle={() => this.toggle('showExternalDomain', !this.state.showExternalDomain)}
              show={this.state.showExternalDomain}
            >
              <FormattedMessage
                id='mobilizations.components--form-domain.advanced.header-toggle'
                defaultMessage='Quero direcionar para um domínio externo'
              />
            </HeaderToggle>

            {this.state.showExternalDomain && (
              <div>
                <p className='h5'>
                  <FormattedMessage
                    id='mobilizations.components--form-domain.advanced.helper-text'
                    defaultMessage='Se você quer usar um domínio que comprou mas não está cadastrado na sua comunidade aqui, pode fazer isso. Por exemplo, se você já comprou www.meudominio.com.br você pode usá-lo para este BONDE. Demais, né? Preencha o campo abaixo e siga as orientações:'
                  />
                </p>
                <FormGroup controlId='externalDomain' {...externalDomain}>
                  <ControlLabel hideError>
                    <FormattedMessage
                      id='mobilizations.components--form-domain.advanced.form.external-domain.label'
                      defaultMessage='Domínio personalizado'
                    />
                  </ControlLabel>
                  <div className='form-control-container--external-domain'>
                    <div className='prefix'>www.</div>
                    <FormControl
                      containerClassName='form-control--external-domain'
                      type='text'
                      placeholder={
                        intl.formatMessage({
                          id: 'mobilizations.components--form-domain.advanced.form.external-domain.placeholder',
                          defaultMessage: 'meudominio.com.br'
                        })
                      }
                    />
                  </div>
                  {InputError(externalDomain)}
                </FormGroup>

                <div className='separator' />

                {this.renderCNAMETable()}
              </div>
            )}
          </div>
        </FormComponent>
      </div>
    )
  }
}

FormDomain.propTypes = {
  formComponent: PropTypes.any.isRequired,
  fields: PropTypes.shape({
    externalDomain: PropTypes.object.isRequired,
    subdomain: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  hostedZones: PropTypes.array.isRequired,
  redirectToCreateDNS: PropTypes.func,
  isSubdomain: PropTypes.bool
}

export default FormDomain
