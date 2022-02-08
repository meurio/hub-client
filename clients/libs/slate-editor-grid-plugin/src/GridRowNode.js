import React from 'react'


// eslint-disable-next-line react/prop-types
const GridRowNode = ({ attributes, children }) => (
  <tr {...attributes}>
    {children}
  </tr>
)

export default GridRowNode
