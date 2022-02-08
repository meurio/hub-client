import React from 'react'
import classnames from 'classnames'

const ActionButton = ({ children, editing, changeState, onClick, title, style, className, value }) => (
  <button
    className={classnames('btn bg-blacker rounded', className)}
    onClick={() => onClick(value, changeState)}
    style={{
      position: 'relative',
      display: editing ? 'inline-block' : 'none',
      ...style
    }}
    title={title}
  >
    {children}
  </button>
)

export default ActionButton
