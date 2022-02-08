import React from 'react'
import classnames from 'classnames'
import { RowHOC } from '../hocs'

const ClickableRow = ({ children, className, onSelectRow }) => (
  <div
    className={classnames(
      className,
      'row clickable'
    )}
    onClick={onSelectRow}
  >
    {children}
  </div>
)

export default RowHOC(ClickableRow)
