import React from 'react'

export const cloneElement = (children, properties) => {
  if (children && children.length === 0) {
    children = [children,]
  }

  return children && children.reduce((result, child, index) => {
    if (child) {
      result.push(React.cloneElement(child, {
        ...properties,
        key: index
      }))
    }

    return result;
  }, [])
}
