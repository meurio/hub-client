import React from 'react'

// eslint-disable-next-line react/prop-types
const OrderedListNode = ({ attributes, children }) => (
  <ol {...attributes}>
    {children}
  </ol>
)

export default OrderedListNode
