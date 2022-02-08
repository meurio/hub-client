import React from 'react'
import FontAwesome from 'react-fontawesome'
import beautify from 'json-beautify'
import { Button } from '@slate-editor/components'

// eslint-disable-next-line react/prop-types
const StateLoggerButton = ({ value, className, style, type }) => (
  <div>
    <Button
      className={className}
      style={style}
      type={type}
      onClick={e => {
        e.preventDefault()
        console.groupCollapsed('[State Logger]')
        console.info('State', beautify(value, null, 2, 100))
        // eslint-disable-next-line react/prop-types
        console.info('State Serialized', beautify(value.toJS(), null, 2, 100))
        console.groupEnd()
      }}
    >
      <FontAwesome name='code' style={{ marginRight: 5 }} />
      State Logger
    </Button>
  </div>
)

export default StateLoggerButton
