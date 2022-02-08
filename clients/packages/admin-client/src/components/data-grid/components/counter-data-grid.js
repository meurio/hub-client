import React from 'react'
import { DataGridHOC } from '../hocs'
import Row from './row'

const Counter = ({
  children,
  data,
  totalCount,
  counterText,
  ...dataGridProps
}) => (
  <div {...dataGridProps}>
    <h2>
      {totalCount || data.length} {counterText || 'itens'}
    </h2>
    {children}
  </div>
)

export default DataGridHOC({ rowComponent: Row })(Counter)
