import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CountUp from 'react-countup'
import { intlShape } from 'react-intl'
import classnames from 'classnames'

import { Error } from 'components/form-util'
import { isValidEmail } from 'utils/validation-helper'
import { FinishMessageCustom } from 'mobilizations/widgets/components'
import AnalyticsEvents from 'mobilizations/widgets/utils/analytics-events'
import { Button, Input, FormTellAFriend } from '../components'

class Form extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      loading: false,
      success: false,
      errors: []
    }
  }

  componentWillReceiveProps () {
    if (this.state.loading) {
      this.setState({loading: false, success: true})
    }
  }

  fields () {
    const { settings } = this.props.widget
    return (settings && settings.fields ? settings.fields : [])
  }

  submit () {
    if (!this.props.editable) {
      const { asyncFormEntryCreate, mobilization, widget } = this.props

      const fieldsWithValue = widget.settings.fields.map(field => ({
        ...field,
        value: document.querySelector(`#input-${field.uid}`).value
      }))
      const errors = this.validate(fieldsWithValue)
      this.setState({ errors })

      if (errors.length === 0) {
        this.setState({ loading: true })
        const formEntry = {
          widget_id: widget.id,
          fields: JSON.stringify(fieldsWithValue)
        }
        asyncFormEntryCreate({ mobilization, formEntry }).then(() => {
          this.setState({ loading: false, success: true })
        })
      }
    }
  }

  validate (fieldsWithValue) {
    const errors = []
    fieldsWithValue.forEach((field) => {
      if (field.required === 'true' && field.value === '') {
        errors.push(`${field.label} não pode ficar em branco`)
      } else if (field.value !== '' && field.kind === 'email' && !isValidEmail(field.value)) {
        errors.push(`${field.label} inválido`)
      }
    })
    return errors
  }

  renderCallToAction () {
    const { configurable, widget, mobilization: { header_font: headerFont }, intl } = this.props
    const callToAction = (
      widget.settings && widget.settings.call_to_action
        ? widget.settings.call_to_action
        : intl.formatMessage({
          id: 'form-widget.components--form.default.title-text',
          defaultMessage: 'Clique para configurar seu formulário...'
        })
    ).replace('\n', '<br/><br/>')

    return configurable ? null : (
      <h2
        className='mt0 mb3 center white'
        dangerouslySetInnerHTML={{__html: callToAction}}
        style={{ fontFamily: headerFont }}
      />
    )
  }

  renderFields () {
    const fields = this.fields()
    return fields.map((field, index) => {
      return (
        <Input
          {...this.props}
          key={field.uid}
          uid={field.uid}
          onBlur={(Number(index) === 0 ? AnalyticsEvents.formIsFilled.bind(AnalyticsEvents) : () => {})}
          canMoveUp={index !== 0}
          canMoveDown={index !== fields.length - 1}
          initializeEditing={this.props.hasNewField && index === fields.length - 1}
          field={field}
        />
      )
    })
  }

  renderButton () {
    const { configurable, widget, intl } = this.props
    const { loading, success } = this.state

    if (!configurable) {
      return (
        <Button
          {...this.props}
          buttonText={
            (widget.settings && widget.settings.button_text) ||
            intl.formatMessage({
              id: 'form-widget.components--form.default.button-text',
              defaultMessage: 'Enviar'
            })
          }
          handleClick={this.submit.bind(this)}
          loading={loading}
          success={success}
        />
      )
    }
  }

  renderCount () {
    const { widget: { settings } } = this.props
    if (!this.props.configurable && settings && settings.count_text) {
      const {
        block: { scrollTopReached: startCounting },
        widget: { form_entries_count: count },
        mobilization: { body_font: bodyFont }
      } = this.props

      return (
        <div className='mt2 h3 center white' style={{ fontFamily: bodyFont }}>
          <CountUp
            start={0}
            end={!isNaN(count) && startCounting ? Number(count) : 0}
            duration={5}
          />
          &nbsp;
          {settings.count_text}
        </div>
      )
    }
  }

  renderErrors () {
    const { errors } = this.state

    return errors.length > 0 && (
      <div>{errors.map(error => <Error message={error} />)}</div>
    )
  }

  renderShareButtons () {
    const fields = this.fields()
    let message = ''
    fields.map((field) => {
      if (field.kind === 'greetings') {
        message = field.placeholder
      }
      return message
    })
    if (message === '') {
      const { mobilization, widget } = this.props
      const { settings: { finish_message_type: finishMessageType } } = widget
      return finishMessageType === 'custom' ? (
        <FinishMessageCustom widget={widget} />
      ) : (
        <FormTellAFriend mobilization={mobilization} widget={widget} />
      )
    } else {
      return <p className='center p2 bg-darken-3'>{message}</p>
    }
  }

  renderForm () {
    const {
      editable,
      configurable,
      widget: { settings }
    } = this.props
    const backgroundColor = settings && settings.main_color
      ? settings.main_color
      : 'rgba(0,0,0,0.25)'

    return (
      <div>
        <div
          className={classnames(
            'rounded',
            { 'p3 relative': editable || !configurable }
          )}
          style={{ backgroundColor: !configurable ? backgroundColor : null }}
        >
          {this.renderCallToAction()}
          {this.renderFields()}
          {this.renderErrors()}
          {this.renderButton()}
        </div>
      </div>
    )
  }

  render () {
    const { mobilization: { header_font: headerFont } } = this.props
    const { success } = this.state

    return (
      <div className={`widget ${headerFont}-header`}>
        {success ? this.renderShareButtons() : this.renderForm()}
        {this.renderCount()}
      </div>
    )
  }
}

Form.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message_type: PropTypes.string
    }).isRequired
  }).isRequired,
  editable: PropTypes.bool,
  configurable: PropTypes.bool,
  hasNewField: PropTypes.bool,
  intl: intlShape
}

export default Form
