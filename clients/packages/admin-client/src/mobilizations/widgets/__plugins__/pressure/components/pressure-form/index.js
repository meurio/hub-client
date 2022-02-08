import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import * as pressureHelper from 'mobilizations/widgets/utils/pressure-helper'
import { isValidEmail, isValidPhoneE164 } from 'utils/validation-helper'
import AnalyticsEvents from 'mobilizations/widgets/utils/analytics-events'

if (require('exenv').canUseDOM) {
  require('./index.scss')
  require('./phone-calls.scss')
}

// TODO: Reusable Input
const controlClassname = 'px3 py1'
const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem',
  outline: 'none'
}

const parseTarget = target => {
  const targetSplit = target.split('<')
  const valid = targetSplit.length === 2
  return valid ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') } : null
}

class RealtimeCallDuration extends Component {
  constructor (props) {
    super(props)
    this.state = { duration: 0, interval: undefined }
  }

  timer () {
    this.setState({ duration: this.state.duration + 1 })
  }

  componentDidMount () {
    this.setState({ interval: setInterval(this.timer.bind(this), 1000) })
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  render () {
    return <span>{`${this.state.duration}s`}</span>
  }
}

class PressureForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      phone: '',
      name: '',
      lastname: '',
      city: '',
      subject: props.subject,
      body: props.body,
      pressureType: pressureHelper.getType(props.targetList) || undefined,
      callManagement: undefined
    }
  }

  componentWillReceiveProps (props) {
    if (!this.props.callTransition && props.targetList && props.targetList.length) {
      this.setState({
        callManagement: props.targetList.map(target => ({
          ...parseTarget(target),
          attempts: 0
        }))
      })
    }

    if (
      props.callTransition &&
      props.targetList &&
      props.targetList.length &&
      JSON.stringify(this.props.callTransition) !== JSON.stringify(props.callTransition)
    ) {
      this.setState({
        callManagement: this.state.callManagement.map((target, index) => {
          const isCallToCurrentTarget = target.value === props.callTransition.twilioCallTo
          const transition = isCallToCurrentTarget ? props.callTransition : {}
          const { twilioCallTransitionStatus: status } = transition
          const isFailStatus = ['busy', 'failed', 'no-answer'].includes(status)

          let attempts = this.state.callManagement[index].attempts
          if (isCallToCurrentTarget && isFailStatus) attempts++

          return { ...target, ...transition, attempts }
        })
      })
    }
  }

  validate () {
    const { targetList, widget: { settings: { show_city: showCity } }, intl } = this.props
    const requiredMsg = intl.formatMessage({
      id: 'pressure-widget.components--pressure-form.validation.required',
      defaultMessage: 'Preenchimento obrigatório'
    })
    const errors = { valid: true }

    if (this.state.pressureType === pressureHelper.PRESSURE_TYPE_EMAIL) {
      if (!this.state.email) {
        errors.email = requiredMsg
      } else if (!isValidEmail(this.state.email)) {
        errors.email = intl.formatMessage({
          id: 'pressure-widget.components--pressure-form.email.validation.invalid-email-format',
          defaultMessage: 'E-mail inválido'
        })
      } else if (targetList && targetList.some(target => target.match(`<${this.state.email}>`))) {
        errors.email = intl.formatMessage({
          id: 'pressure-widget.components--pressure-form.email.validation.sender-is-target',
          defaultMessage: 'O email que você está tentando usar é de um dos alvos da mobilização.'
        })
      }
      if (!this.state.subject) {
        errors.subject = requiredMsg
      }
      if (!this.state.body) {
        errors.body = requiredMsg
      }
    }
    if (this.state.pressureType === pressureHelper.PRESSURE_TYPE_PHONE) {
      const { phone } = this.state
      const phoneE164 = /^\+/.test(phone) ? phone : `+${phone}`
      if (!phone) {
        errors.phone = requiredMsg
      } else if (!isValidPhoneE164(phoneE164)) {
        if ([11, 12].includes(phoneE164.length)) {
          errors.phone = intl.formatMessage({
            id: 'pressure-widget.components--pressure-form.phone.validation.ddd',
            defaultMessage: 'Informe o código do país e o DDD com dois dígitos. Ex: +5511'
          })
        } else {
          errors.phone = intl.formatMessage({
            id: 'pressure-widget.components--pressure-form.phone.validation.invalid',
            defaultMessage: 'Telefone inválido'
          })
        }
      } else if (
        targetList &&
        targetList.some(
          target => target.replace(/\D/g, '')
            .match(`${this.state.phone.replace(/\D/g, '')}`)
        )
      ) {
        errors.phone = intl.formatMessage({
          id: 'pressure-widget.components--pressure-form.phone.validation.caller-is-target',
          defaultMessage: 'O telefone que você está tentando usar é de um dos alvos da mobilização.'
        })
      }
    }
    if (!this.state.name) {
      errors.name = requiredMsg
    }
    if (!this.state.lastname) {
      errors.lastname = requiredMsg
    }
    if (showCity === 'city-true' && !this.state.city) {
      errors.city = requiredMsg
    }

    if (Object.keys(errors).length > 1) {
      errors.valid = false
    }
    return errors
  }

  handleSubmit (e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const errors = this.validate()

    this.setState({ errors })
    if (errors.valid) onSubmit && onSubmit(this.state)
  }

  render () {
    const {
      callTransition,
      buttonColor,
      buttonText,
      children,
      widget,
      disabled,
      addTwilioCallMutation,
      intl
    } = this.props
    const {
      email, phone, name, lastname, city, subject, body, errors,
      callManagement
    } = this.state

    return (
      <form
        className={classnames(
          'pressure-form',
          { 'is-calling': !!callTransition }
        )}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div
          className={classnames(
            'activist-form bg-white',
            !children ? 'rounded-bottom' : null
          )}
        >
          <div className='form bg-white rounded-bottom'>
            {this.state.pressureType === 'email' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-sender-email-id'>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.email.label'
                    defaultMessage='E-mail'
                  />
                  {(errors && errors['email'] && <span className='error'>{errors['email']}</span>)}
                </label>
                <input
                  id='pressure-sender-email-id'
                  className='col-12'
                  style={inputReset}
                  onBlur={AnalyticsEvents.pressureIsFilled.bind(AnalyticsEvents)}
                  type='email'
                  placeholder={intl.formatMessage({
                    id: 'pressure-widget.components--pressure-form.email.placeholder',
                    defaultMessage: 'Insira seu e-mail'
                  })}
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
            )}
            {this.state.pressureType === 'phone' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-sender-phone-id'>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.phone.label'
                    defaultMessage='Telefone'
                  />
                  {(errors && errors['phone'] && <span className='error'>{errors['phone']}</span>)}
                </label>
                <input
                  id='pressure-sender-phone-id'
                  className='col-12'
                  style={inputReset}
                  onBlur={AnalyticsEvents.pressureIsFilled.bind(AnalyticsEvents)}
                  type='text'
                  placeholder={intl.formatMessage({
                    id: 'pressure-widget.components--pressure-form.phone.placeholder',
                    defaultMessage: 'Insira seu telefone. Ex: +5511987654321'
                  })}
                  value={phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                />
              </div>
            )}
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-sender-firstname-id'>
                <FormattedMessage
                  id='pressure-widget.components--pressure-form.name.label'
                  defaultMessage='Nome'
                />
                {(errors && errors['name'] && <span className='error'>{errors['name']}</span>)}
              </label>
              <input
                id='pressure-sender-firstname-id'
                className='col-12'
                style={inputReset}
                type='text'
                placeholder={intl.formatMessage({
                  id: 'pressure-widget.components--pressure-form.name.placeholder',
                  defaultMessage: 'Insira seu nome'
                })}
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className={classnames('form-group', controlClassname)}>
              <label className='py1 gray' htmlFor='pressure-sender-lastname-id'>
                <FormattedMessage
                  id='pressure-widget.components--pressure-form.lastname.label'
                  defaultMessage='Sobrenome'
                />
                {(errors && errors['lastname'] && <span className='error'>{errors['lastname']}</span>)}
              </label>
              <input
                id='pressure-sender-lastname-id'
                className='col-12'
                style={inputReset}
                type='text'
                placeholder={intl.formatMessage({
                  id: 'pressure-widget.components--pressure-form.lastname.placeholder',
                  defaultMessage: 'Insira seu sobrenome'
                })}
                value={lastname}
                onChange={e => this.setState({ lastname: e.target.value })}
              />
            </div>
            {
              !widget.settings.show_city || widget.settings.show_city !== 'city-true' ? null : (
                <div className={classnames('form-group', controlClassname)}>
                  <label className='py1 gray' htmlFor='pressure-sender-city-id'>
                    <FormattedMessage
                      id='pressure-widget.components--pressure-form.city.label'
                      defaultMessage='Cidade'
                    />
                    {(errors && errors['city'] && <span className='error'>{errors['city']}</span>)}
                  </label>
                  <input
                    className='col-12'
                    style={inputReset}
                    type='text'
                    placeholder={intl.formatMessage({
                      id: 'pressure-widget.components--pressure-form.city.placeholder',
                      defaultMessage: 'Insira sua cidade'
                    })}
                    value={city}
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </div>
              )
            }
            {this.state.pressureType === 'email' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-subject-id'>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.subject.label'
                    defaultMessage='Assunto'
                  />
                  {(errors && errors['subject'] && <span className='error'>{errors['subject']}</span>)}
                </label>
                <input
                  id='pressure-subject-id'
                  className='col-12'
                  style={inputReset}
                  type='text'
                  value={subject}
                  disabled={disabled}
                  onChange={e => this.setState({ subject: e.target.value })}
                />
              </div>
            )}
            {this.state.pressureType === 'email' && (
              <div className={classnames('form-group', controlClassname)}>
                <label className='py1 gray' htmlFor='pressure-body-id'>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.body.label'
                    defaultMessage='Corpo do e-mail'
                  />
                  {(errors && errors['body'] && <span className='error'>{errors['body']}</span>)}
                </label>
                <textarea
                  id='pressure-body-id'
                  className='col-12 mt1'
                  style={{...inputReset, height: '7rem'}}
                  value={body}
                  disabled={disabled}
                  onChange={e => this.setState({ body: e.target.value })}
                />
              </div>
            )}
          </div>
          <div className='pt1 pb3 px3'>
            <button
              type='submit'
              onClick={this.handleSubmit.bind(this)}
              className='btn caps white col-12 py2 rounded'
              style={{ backgroundColor: buttonColor }}
            >
              {buttonText}
            </button>
          </div>
        </div>

        {this.state.pressureType === 'phone' && (
          <div className='phone-calls'>
            <ul>
              {callManagement && callManagement.length && callManagement.map((target, targetIndex) => {
                const {
                  name,
                  value,
                  attempts,
                  twilioCallTo: to,
                  twilioCallTransitionStatus: status,
                  twilioCallTransitionCallDuration: duration
                } = target
                let ListItem = <div />

                if (to === value) {
                  if (status === 'completed') {
                    ListItem = (
                      <li className='success' key={targetIndex}>
                        <div className='flex-container'>
                          <div className='call-item'>
                            <div>
                              <i className='fa fa-phone-square' />
                            </div>
                            <div className='target-name'>{name}</div>
                          </div>
                          <div className='finish'>
                            {duration}s
                            <i className='fa fa-check-circle' />
                          </div>
                        </div>
                      </li>
                    )
                  } else if (['initiated', 'ringing', 'in-progress'].includes(status)) {
                    ListItem = (
                      <li className='warning' key={targetIndex}>
                        <div className='flex-container'>
                          <div className='call-item'>
                            <div>
                              <span className='fa fa-phone ring' />
                            </div>
                            <div className='target-name-two'>
                              <span>{name}</span>
                              <FormattedMessage
                                id='pressure-widget.components--pressure-form.phone-calls.ringing'
                                defaultMessage='Chamada em andamento'
                              />
                            </div>
                          </div>
                          <div className='inline-container'>
                            <div className='prefix'>
                              {status === 'in-progress' && <RealtimeCallDuration />}
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  } else if (['busy', 'failed', 'no-answer'].includes(status)) {
                    ListItem = (
                      <li className='danger' key={targetIndex}>
                        <div className='flex-container'>
                          <div className='call-item'>
                            <span className='fa fa-phone-square' />
                            <div className='target-name'>{name}</div>
                          </div>
                          <div className='finish'>
                            3x
                            <span className='fa fa-times-circle' />
                          </div>
                        </div>
                      </li>
                    )
                    if (attempts < 0) {
                      ListItem = (
                        <li className='danger'>
                          <div className='flex-container'>
                            <div className='call-item'>
                              <span className='fa fa-phone-square' />
                              <div className='target-name'>{name}</div>
                            </div>
                            <div className='inline-container'>
                              <div className='prefix'>
                                {attempts}x
                              </div>
                              <button
                                className='btn-call outlined'
                                onClick={e => {
                                  e.preventDefault()
                                  addTwilioCallMutation({
                                    widgetId: this.props.widget.id,
                                    communityId: this.props.mobilization.community_id,
                                    from: this.state.phone,
                                    to: value
                                  })
                                }}
                              >
                                <FormattedMessage
                                  id='pressure-widget.components--pressure-form.phone-calls.retry'
                                  defaultMessage='Religar'
                                />
                              </button>
                            </div>
                          </div>
                        </li>
                      )
                    }
                  }
                } else {
                  ListItem = (
                    <li key={targetIndex}>
                      <div className='flex-container'>
                        <div className='call-item'>
                          <span className='fa fa-phone-square primary' />
                          <div className='target-name'>{name}</div>
                        </div>
                        <button
                          className='btn-call primary'
                          type='button'
                          onClick={e => {
                            e.preventDefault()
                            addTwilioCallMutation({
                              widgetId: this.props.widget.id,
                              communityId: this.props.mobilization.community_id,
                              from: this.state.phone,
                              to: value
                            })
                          }}
                        >
                          <FormattedMessage
                            id='pressure-widget.components--pressure-form.phone-calls.call'
                            defaultMessage='Ligar'
                          />
                        </button>
                      </div>
                    </li>
                  )
                }
                return ListItem
              })}
            </ul>

            <div className='how-it-works'>
              <FormattedMessage
                id='pressure-widget.components--pressure-form.phone.how-it-works.title'
                defaultMessage='Como funciona?'
              />
              <ol>
                <li>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.phone.how-it-works.list-item-01'
                    defaultMessage='Estamos ligando para o seu alvo'
                  />
                </li>
                <li>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.phone.how-it-works.list-item-02'
                    defaultMessage='Assim que alguém atender do lado de lá, vamos te ligar'
                  />
                </li>
                <li>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.phone.how-it-works.list-item-03'
                    defaultMessage='Quando você atender, conectamos as ligações'
                  />
                </li>
                <li>
                  <FormattedMessage
                    id='pressure-widget.components--pressure-form.phone.how-it-works.list-item-04'
                    defaultMessage='Agora é com você!'
                  />
                </li>
              </ol>
            </div>

            <div style={{ margin: '1rem 0', padding: '0 1rem' }}>
              <button
                type='button'
                className='btn-call full-width'
                style={{ backgroundColor: buttonColor }}
                onClick={e => {
                  e.preventDefault()
                  this.props.changeParentState({ showFinishMessage: true })
                }}
              >
                <FormattedMessage
                  id='pressure-widget.components--pressure-form.phone.finish-and-share'
                  defaultMessage='Encerrar e Compartilhar'
                />
              </button>
            </div>
          </div>
        )}
        {children}
      </form>
    )
  }
}

PressureForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
  mobilization: PropTypes.object,
  widget: PropTypes.object,
  changeParentState: PropTypes.func.isRequired,
  intl: intlShape
}

PressureForm.defaultProps = {
  subject: '',
  body: '',
  changeParentState: () => {}
}

export default injectIntl(PressureForm)
