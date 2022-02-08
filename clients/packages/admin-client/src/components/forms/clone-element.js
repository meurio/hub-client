import React from 'react'

export const cloneElement = (children, props) => {
  if (children.length > 1) {
    return children.map(child => React.cloneElement(child, props))
  }
  return React.cloneElement(children, props)
}
