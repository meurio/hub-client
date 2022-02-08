import React from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const createFormProvider = (Component) => {
  class Form extends React.Component {
    constructor (props, context) {
      super(props, context)
      this.state = { submitted: false }
    }

    getChildContext () {
      return {
        form: {
          fields: this.props.fields,
          i18n: this.i18n.bind(this),
          i18nKeys: this.props.i18nKeys
        }
      }
    }

    i18n (text) {
      if (typeof text === 'object') {
        const { values, ...message } = text
        return this.props.intl.formatMessage(message, values)
      }
      return text
    }

    componentWillReceiveProps (nextProps) {
      const submitIsDone = (
        this.props.submitting &&
        !nextProps.submitting &&
        !nextProps.submitFailed
      )
      if (submitIsDone) {
        this.setState({ submitted: true })
      }
    }

    getPropI18n (propName) {
      const prop = this.props[propName]
      const { i18nKeys } = this.props
      if (i18nKeys && i18nKeys[propName]) {
        return this.i18n(prop || i18nKeys[propName])
      }
      return this.i18n(prop)
    }

    render () {
      const { children, handleSubmit, submit, error } = this.props
      return (
        <Component
          i18n={this.i18n.bind(this)}
          getPropI18n={this.getPropI18n.bind(this)}
          submitted={this.state.submitted}
          onSubmit={handleSubmit(submit)}
          error={error}
        >
          {children}
        </Component>
      )
    }
  }

  Form.displayName = `createForm(${Component.displayName || Component.name || Component})`
  Form.childContextTypes = {
    form: PropTypes.object.isRequired
  }
  Form.propTypes = {
    intl: intlShape.isRequired
  }

  return Form
}

export const FormProvider = createFormProvider('form')
