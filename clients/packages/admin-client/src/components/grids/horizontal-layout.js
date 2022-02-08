import PropTypes from 'prop-types'
import React from 'react'

const HorizontalLayout = ({ children, className, cols, ...props }) => {
  const size = parseInt(12 / cols)
  const childProps = {
    layout: 'inline',
    className: `sm-col sm-col-${size}`
  }

  return (
    <div className='form-horizontal-layout flex flex-wrap'>
      {
        children && children.map((child, index) =>
          React.cloneElement(child, { ...childProps, key: `h-layout-${index}` })
        )
      }
    </div>
  )
}

HorizontalLayout.propTypes = {
  cols: PropTypes.number.isRequired
}

HorizontalLayout.defaultProps = {
  cols: 1
}

export default HorizontalLayout
