/* eslint-disable react/prop-types */
import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import { strikethroughMarkStrategy, hasMark } from './StrikethroughUtils'

const StrikethroughButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    onClick={() => onChange(strikethroughMarkStrategy(value.change()))}
    className={classnames(
      'slate-strikethrough-plugin--button',
      { active: hasMark(value) },
      className,
    )}
  >
    <FontAwesome name="strikethrough" />
  </Button>
)

export default StrikethroughButton
