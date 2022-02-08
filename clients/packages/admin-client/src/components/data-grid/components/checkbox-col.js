import React from 'react'
import { ColHOC } from '../hocs'

const Checkbox = ({ onChange, checked, ...colProps }) => (
  <div {...colProps}>
    <input type='checkbox' checked={checked} onChange={onChange} />
  </div>
)

export default ColHOC(Checkbox)
