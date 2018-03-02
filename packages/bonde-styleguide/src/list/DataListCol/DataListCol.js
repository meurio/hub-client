import styled from 'styled-components'
import PropTypes from 'prop-types'
import { px } from '../../utils'

/**
 * The column component of `DataList`.
 */
const DataListCol = styled.div`{
  ${props => props.width && `width: ${px(props.width)};`}
  display: table-cell;
  padding: 13px 15px 14px 15px;
  vertical-align: middle;

  &:first-child {
    padding-left: 26px;
  }
  &:last-child {
    padding-right: 26px;
  }

  ${props => props.align === 'left' && `
    display: flex;
    justify-content: flex-end;
  `}
}`

const { number, string } = PropTypes

DataListCol.propTypes = {
  /** The list column width. */
  width: number,
  /** The list column alignment. */
  align: string
}

/* @component */
export default DataListCol
