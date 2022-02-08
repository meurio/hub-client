/* eslint-disable react/prop-types */
import React from 'react'
import classnames from 'classnames'
import { react } from '@slate-editor/utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line react/display-name
export default ({ children, style, className, ...rest }) => (
  <div className={classnames('editor--toolbar', className)} style={style}>
    {react.cloneElement(children, rest)}
  </div>
)
