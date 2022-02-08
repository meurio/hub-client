import React from 'react'
import FormGroup from '../formGroup'
import { selectStyle } from './styles'

const Select = ({ i18n, children, value, onChange }) => (
  <select style={selectStyle} value={value} onChange={onChange}>
    {children && children.map(child => React.cloneElement(child, { i18n }))}
  </select>
)

export const Option = ({ value, i18n, label }) => (
  <option value={value}>
    {i18n(label) || value}
  </option>
)

export default FormGroup(Select)
