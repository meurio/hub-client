/* eslint-disable react/prop-types */
import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Button } from '@slate-editor/components'

const ToggleReadOnlyButton = ({
  value,
  outerState: { readOnly },
  changeState,
  className,
  style,
  type
}) => (
  <Button
    className={className}
    style={style}
    type={type}
    onClick={() => changeState({ value, readOnly: !readOnly })}
  >
    <FontAwesome name={readOnly ? 'toggle-on' : 'toggle-off'} style={{ marginRight: 5 }} />
    Read Only
  </Button>
)

export default ToggleReadOnlyButton
