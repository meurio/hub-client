import React from 'react'

const style = {
  backgroundColor: 'rgb(247, 247, 247)',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexGrow: '1',
  flexShrink: '1',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  lineHeight: '24px',
  minHeight: '0px',
  minWidth: '0px',
  position: 'relative',
  MozBoxDirection: 'normal',
  MozBoxFlex: '1',
  MozBoxOrient: 'vertical'
}

export default ({ children }) => (
  <div style={style}>
    {children}
  </div>
)
