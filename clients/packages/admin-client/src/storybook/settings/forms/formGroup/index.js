import React from 'react'
import { controlLabelStyle, formGroupStyle } from './styles'
import HelpBlock from '../helpBlock'

const ControlLabel = ({ children, htmlFor }) => (
  <label style={controlLabelStyle} htmlFor={htmlFor}>
    {children}
  </label>
)

export default (InputComponent) => ({
  id,
  touched,
  error,
  name,
  i18n,
  label,
  helpText,
  helpTextComponent: HelpTextComponent,
  style,
  ...inputProps
}) => {
  return (
    <div style={{ ...formGroupStyle, ...style }}>
      {label && (<ControlLabel htmlFor={`${name}-id`}>{label}</ControlLabel>)}
      {helpText && <HelpBlock level='warning'>{helpText}</HelpBlock>}
      {HelpTextComponent && <HelpTextComponent />}
      <InputComponent
        id={`${name}-id`}
        name={name}
        i18n={i18n}
        {...inputProps}
      />
      {touched && error && (
        <HelpBlock level='error'>{error}</HelpBlock>
      )}
    </div>
  )
}
