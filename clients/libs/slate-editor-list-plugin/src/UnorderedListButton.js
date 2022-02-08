import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import { unorderedListStrategy, isUnorderedList } from './ListUtils'

// eslint-disable-next-line react/prop-types
const UnorderedListButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    // eslint-disable-next-line react/prop-types
    onClick={() => onChange(unorderedListStrategy(value.change()))}
    className={classnames(
      'slate-list-plugin--button',
      { active: isUnorderedList(value) },
      className,
    )}
  >
    <FontAwesome name="list-ul" />
  </Button>
)

export default UnorderedListButton
