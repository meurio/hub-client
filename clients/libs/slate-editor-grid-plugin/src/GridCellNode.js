import React from 'react'


// eslint-disable-next-line react/prop-types
const GridCellNode = ({ attributes, children }) => (
  <td {...attributes}>
    {children}
  </td>
)

export default GridCellNode
