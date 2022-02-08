import React from 'react'

const HelpBlock = ({ children, level }) => (
  <small
    style={{
      color: (
        level === 'error' ? 'red'
          : level === 'success' ? 'green'
          : '#c7c7c7'
      )
    }}
  >
    <dfn>{children}</dfn>
  </small>
)

export default HelpBlock
