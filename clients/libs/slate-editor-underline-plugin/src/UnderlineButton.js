import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import { underlineMarkStrategy, hasMark } from './UnderlineUtils'

// eslint-disable-next-line react/prop-types
const UnderlineButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    // eslint-disable-next-line react/prop-types
    onClick={() => onChange(underlineMarkStrategy(value.change()))}
    className={classnames(
      'slate-underline-plugin--button',
      { active: hasMark(value) },
      className
    )}
  >
    <FontAwesome name="underline" />
  </Button>
)

export default UnderlineButton
