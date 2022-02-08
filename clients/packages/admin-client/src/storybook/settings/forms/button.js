import React from 'react'

const btnStyle = {
  display: 'block',
  borderBottomColor: 'rgba(0, 0, 0, 0)',
  borderBottomLeftRadius: '3px',
  borderBottomRightRadius: '3px',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  borderImageOutset: '0',
  borderImageRepeat: 'stretch stretch',
  borderImageSlice: '100%',
  borderImageSource: 'none',
  borderImageWidth: '1',
  borderLeftColor: 'rgba(0, 0, 0, 0)',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  borderRightColor: 'rgba(0, 0, 0, 0)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px',
  borderTopColor: 'rgba(0, 0, 0, 0)',
  borderTopLeftRadius: '3px',
  borderTopRightRadius: '3px',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  color: 'rgb(255, 255, 255)',
  cursor: 'pointer',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  fontSize: '17.6px',
  fontWeight: '700',
  height: '52px',
  letterSpacing: '0px',
  lineHeight: '18px',
  paddingBottom: '16px',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '16px',
  textAlign: 'center',
  textDecoration: 'none',
  textDecorationColor: 'rgb(255, 255, 255)',
  textDecorationLine: 'none',
  textDecorationStyle: 'solid',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
  MozBorderBottomColors: 'none',
  MozBorderLeftColors: 'none',
  MozBorderRightColors: 'none',
  MozBorderTopColors: 'none'
}

const Button = ({
  children,
  style,
  type,
  disabled,
  onClick
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    style={{
      ...btnStyle,
      ...style,
      backgroundColor: disabled ? '#f2f2f2' : '#000'
    }}
  >
    {children}
  </button>
)

Button.defaultProps = {
  type: 'button'
}

export default Button
