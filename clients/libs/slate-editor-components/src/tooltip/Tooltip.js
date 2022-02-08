/* eslint-disable react/prop-types */
import React from 'react'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./Tooltip.css')

const Tooltip = ({ children, ...props }) => (
  <div
    {...props}
    className="tooltip--container"
    contentEditable={false}
  >
    {children}
  </div>
)

// eslint-disable-next-line react/display-name
Tooltip.Item = ({ children, ...props }) => (
  <div {...props} className="tooltip--item">
    {children}
  </div>
)

export default Tooltip
