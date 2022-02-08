import React from 'react'

const contentStyle = {
  boxSizing: 'border-box',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  lineHeight: '24px',
  overflow: 'auto',
  overflowX: 'auto',
  overflowy: 'auto',
  paddingBottom: '32px',
  paddingLeft: '32px',
  paddingRight: '64px',
  paddingTop: '32px'
}

export default ({ children }) => (
  <div style={contentStyle}>
    {children}
  </div>
)
