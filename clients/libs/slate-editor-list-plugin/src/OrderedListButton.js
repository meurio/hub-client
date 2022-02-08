import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import { orderedListStrategy, isOrderedList } from './ListUtils'

// eslint-disable-next-line react/prop-types
const OrderedListButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    // eslint-disable-next-line react/prop-types
    onClick={() => onChange(orderedListStrategy(value.change(), 'ordered-list'))}
    className={classnames(
      'slate-list-plugin--button',
      { active: isOrderedList(value) },
      className,
    )}
  >
    <FontAwesome name="list-ol" />
  </Button>
)

export default OrderedListButton
