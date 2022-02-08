import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import { appendGrid, hasGrid } from './GridUtils'

// eslint-disable-next-line react/prop-types
const GridButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    // eslint-disable-next-line react/prop-types
    onClick={() => onChange(appendGrid(value.change()))}
    className={classnames(
      'slate-grid-plugin--button',
      { active: hasGrid(value) },
      className,
    )}
  >
    <FontAwesome name="th" />
  </Button>
)

export default GridButton
