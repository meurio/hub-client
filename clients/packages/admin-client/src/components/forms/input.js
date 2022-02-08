import React from 'react'

const Input = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
  <div>
    {label && <label>{label}</label>}
    <input {...input} type={type} placeholder={placeholder} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

export default Input
