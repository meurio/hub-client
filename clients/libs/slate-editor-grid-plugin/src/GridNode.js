import React from 'react'


// eslint-disable-next-line react/prop-types
const GridNode = ({ attributes, children }) => (
  <table style={{ width: '100%', tableLayout: 'fixed' }}>
    <tbody {...attributes}>
      {children}
    </tbody>
  </table>
)

export default GridNode
