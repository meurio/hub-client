/* eslint-disable react/prop-types */
import React from 'react'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'
import { Button } from '@slate-editor/components'

import { alignmentMarkStrategy, hasMark, getMark } from './AlignmentUtils'

const AlignmentLeftButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    onClick={() => onChange(alignmentMarkStrategy(value.change(), 'left'))}
    className={classnames(
      'slate-alignment-plugin--button',
      { active: hasMark(value) && getMark(value).data.get('align') === 'left' },
      className,
    )}
  >
    <FontAwesome name="align-left" />
  </Button>
)

export default AlignmentLeftButton
