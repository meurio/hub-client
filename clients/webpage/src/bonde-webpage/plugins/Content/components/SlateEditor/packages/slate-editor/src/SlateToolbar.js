import React from 'react'
import classnames from 'classnames'
import { react } from '../../slate-editor-utils/src'

const SlateToolbar = ({ children, style, className, ...rest }) => (
  <div className={classnames('editor--toolbar', className)} style={style}>
    {react.cloneElement(children, rest)}
  </div>
);

export default SlateToolbar;
