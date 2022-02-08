import React from 'react'
import { FormProvider } from './createFormProvider'
import { fromJS } from 'immutable'

const getValue = eventOrValue =>
  typeof eventOrValue === 'object'
    ? eventOrValue.target.value : eventOrValue

class Field extends React.Component {
  /**
   * Component responsible to manage the behavior of field. It get
   * a context received by FormProvider and pass like props to
   * render component.
   */

  getFieldProps (fieldName) {
    const { form: { fields, i18n } } = this.context
    const { normalize } = this.props
    const field = fromJS(fields).getIn(fieldName.split('.')).toJS()

    return {
      i18n,
      ...field,
      error: i18n(field.error),
      onChange: (eventOrValue) => {
        const value = getValue(eventOrValue)
        if (!normalize) return field.onChange(value)
        else return field.onChange(normalize(value))
      },
      value: !normalize ? this.isEmpty(field.value) : normalize(field.value)
    }
  }

  isEmpty (value) {
    return !value ? '' : value
  }

  getI18nProps (fieldName) {
    const { form: { i18n, i18nKeys } } = this.context
    let { label, placeholder, helpText } = this.props
    if (i18nKeys && i18nKeys.fields && i18nKeys.fields[fieldName]) {
      const fieldContext = i18nKeys.fields[fieldName]
      label = label || fieldContext.label
      placeholder = placeholder || fieldContext.placeholder
      helpText = helpText || fieldContext.helpText
    }
    return {
      label: i18n(label),
      placeholder: i18n(placeholder),
      helpText: i18n(helpText)
    }
  }

  render () {
    const {
      name,
      component: Component,
      normalize, // eslint-disable-line no-unused-vars
      ...inputProps
    } = this.props
    return (
      <Component
        {...inputProps}
        {...this.getFieldProps(name)}
        {...this.getI18nProps(name)}
      />
    )
  }
}

Field.contextTypes = FormProvider.childContextTypes

export default Field
