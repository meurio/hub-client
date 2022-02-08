import React from 'react'

const headStyle = {
  backgroundColor: 'rgb(255, 255, 255)',
  borderBottomColor: 'rgb(238, 238, 238)',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  borderLeftColor: 'rgb(0, 0, 0)',
  borderLeftStyle: 'none',
  borderLeftWidth: '0px',
  borderRightColor: 'rgb(0, 0, 0)',
  borderRightStyle: 'none',
  borderRightWidth: '0px',
  borderTopColor: 'rgb(0, 0, 0)',
  borderTopStyle: 'none',
  borderTopWidth: '0px',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  lineHeight: '24px',
  paddingLeft: '32px',
  paddingRight: '64px',
  paddingTop: '32px'
}

const titleStyle = {
  color: 'rgb(34, 34, 34)',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  fontSize: '34.4px',
  fontWeight: '300',
  lineHeight: '51.6px',
  marginBottom: '32px',
  marginTop: '0px'
}

export default ({ children, title }) => (
  <div style={headStyle}>
    {title && (<h1 style={titleStyle}>{title}</h1>)}
    {children}
  </div>
)
