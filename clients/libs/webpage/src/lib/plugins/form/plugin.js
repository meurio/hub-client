import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CountUp from 'react-countup'
import { intlShape } from 'react-intl'
import { Button, Input, Raise } from './components'
import { isValidEmail } from './utils'

class Form extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
      success: false,
      errors: [],
      values: {}
    }
  }

  fields () {
    const { settings } = this.props.widget
    const fields = settings && settings.fields ? settings.fields : []
    // TODO: this field 'greetings' used to only render in edit mode
    return fields.filter(f => f.kind !== 'greetings')
  }

  submit (e) {
    e.preventDefault()

    const { asyncFormEntryCreate, mobilization, widget } = this.props
    const { values } = this.state

    const fieldsWithValue = widget.settings.fields.map(field => ({
      ...field,
      value: values[this.getFieldName(field)]
    }))
    const errors = this.validate(fieldsWithValue)
    this.setState({ errors })

    if (errors.length > 0) {
      this.setState({ errors, loading: false, success: false })
    } else {
      this.setState({ loading: true })
      const formEntry = {
        widget_id: widget.id,
        fields: JSON.stringify(fieldsWithValue)
      }
      asyncFormEntryCreate({ mobilization, formEntry })
        .then(() => {
          this.setState({ loading: false, success: true, values: {} })
          return Promise.resolve()
        })
    }
  }

  validate (fieldsWithValue) {
    const errors = []
    fieldsWithValue.forEach((field) => {
      if (field.required === 'true' && !field.value) {
        errors.push(`${field.label} não pode ficar em branco`)
      } else if (field.value !== '' && field.kind === 'email' && !isValidEmail(field.value)) {
        errors.push(`${field.label} inválido`)
      }
    })
    return errors
  }

  renderCallToAction () {
    const { widget, mobilization: { header_font: headerFont }, intl } = this.props
    const callToAction = (
      widget.settings && widget.settings.call_to_action
        ? widget.settings.call_to_action
        : intl.formatMessage({
          id: 'form-widget.components--form.default.title-text',
          defaultMessage: 'Clique para configurar seu formulário...'
        })
    ).replace('\n', '<br/><br/>')

    return (
      <h2 className='mt0 mb3 center white' style={{ fontFamily: headerFont }}>
        {callToAction}
      </h2>
    )
  }

  getFieldName (field) {
    return `input-${field.uid}`
  }

  handleChange (e) {
    const { values } = this.state
    this.setState({
      values: {
        ...values,
        [e.target.name]: e.target.value
      }
    })
  }

  renderFields () {
    const { analyticsEvents } = this.props
    const fields = this.fields()
    return fields.map((field, index) => {
      return (
        <Input
          {...this.props}
          key={field.uid}
          name={this.getFieldName(field)}
          onChange={this.handleChange.bind(this)}
          onBlur={(Number(index) === 0 ? analyticsEvents.formIsFilled.bind(analyticsEvents) : () => {})}
          field={field}
        />
      )
    })
  }

  renderButton () {
    const { widget, intl } = this.props
    const { loading, success } = this.state  
    return widget.settings.fields && (
      <Button
        {...this.props}
        buttonText={
          (widget.settings && widget.settings.button_text) ||
          intl.formatMessage({
            id: 'form-widget.components--form.default.button-text',
            defaultMessage: 'Enviar'
          })
        }
        loading={loading}
        success={success}
      />
    )
  }

  renderCount () {
    const { widget: { settings } } = this.props
    if (settings && settings.count_text) {
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
      <React.Fragment>
        {errors.map((error, i) => (
          <Raise
            key={`error-${i}`}
            message={error}
          />
        ))}
      </React.Fragment>
    )
  }

  renderShareButtons () {
    // TODO: check how works greetings
    const fields = this.fields()
    let message = ''
    fields.map((field) => {
      if (field.kind === 'greetings') {
        message = field.placeholder
      }
      return message
    })
    if (message === '') {
      const { mobilization, widget, overrides } = this.props
      const { settings: { finish_message_type: finishMessageType } } = widget

      const {
        FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
        FinishDefaultMessage: { component: FinishDefaultMessage, props: defaultProps }
      } = overrides

      return finishMessageType === 'custom' ? (
        <FinishCustomMessage mobilization={mobilization} widget={widget} {...customProps} />
      ) : (
        <FinishDefaultMessage mobilization={mobilization} widget={widget} {...defaultProps} />
      )
    } else {
      return <p className='center p2 bg-darken-3'>{message}</p>
    }
  }

  renderForm () {
    const { widget: { settings } } = this.props
    
    const bgcolor = settings && settings.main_color
      ? settings.main_color
      : 'rgba(0,0,0,0.25)'

    return (
      <div>
        <div className='rounded p3 relative' style={{ backgroundColor: bgcolor }}>
          <form onSubmit={this.submit.bind(this)}>
            {this.renderCallToAction()}
            {this.renderFields()}
            {this.renderErrors()}
            {this.renderButton()}
          </form>
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

const { any, object, shape, string } = PropTypes

Form.propTypes = {
  mobilization: object.isRequired,
  widget: shape({
    settings: shape({
      finish_message_type: string
    }).isRequired
  }).isRequired,
  intl: intlShape,
  analyticsEvents: object,
  overrides: shape({
    FinishCustomMessage: shape({
      component: any,
      props: object
    }).isRequired,
    FinishDefaultMessage: shape({
      component: any,
      props: object
    }).isRequired
  }).isRequired
}

Form.defaultProps = {
  overrides: {
    FinishCustomMessage: { props: {} },
    FinishDefaultMessage: { props: {} }
  }
}

export default Form
