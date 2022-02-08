import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default (WrappedComponent) => {
  class PP extends React.Component {
    render () {
      const { data, onSelectRow, rowIndex, actived, className, children } = this.props
      const rowProps = {
        className: classnames(
          'flex',
          className,
          { 'active': actived }
        ),
        data: WrappedComponent !== 'div' ? data : null,
        rowIndex: WrappedComponent !== 'div' ? rowIndex : null,
        onSelectRow
      }
      return (
        <WrappedComponent {...rowProps}>
          {children && children({ data, rowIndex })}
        </WrappedComponent>
      )
    }
  }

  PP.propTypes = {
    data: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ])
  }

  return PP
}
