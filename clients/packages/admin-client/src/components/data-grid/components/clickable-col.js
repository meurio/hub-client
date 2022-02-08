import React from 'react'
import { ColHOC } from '../hocs'

const Linkable = ({ children, onClick, ...colProps }) => (
  <div {...colProps}>
    <a
      href='#'
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  </div>
)

export default ColHOC(Linkable)
