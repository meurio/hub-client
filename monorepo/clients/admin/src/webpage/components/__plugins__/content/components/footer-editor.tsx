import React from 'react'

export default function ({ children, ...properties }) {
  return <div style={{ position: 'relative', zIndex: 2 }}>
    {children && children.map(child => React.cloneElement(child, properties))}
  </div>
}
