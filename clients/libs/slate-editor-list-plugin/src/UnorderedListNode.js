import React from 'react'

// eslint-disable-next-line react/prop-types
const UnorderedListNode = ({ attributes, children }) => (
  <ul {...attributes}>
    {children}
  </ul>
)

export default UnorderedListNode
