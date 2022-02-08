import React from 'react'
import FormGroup from '../formGroup'
import { inputStyle } from './styles'

const Input = ({ id, type, value, onChange, placeholder }) => (
  <input
    id={id}
    style={inputStyle}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
)

export default FormGroup(Input)
