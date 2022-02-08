import PropTypes from 'prop-types'
/*
 * Component: DivFloat
 * Description: Become children floatable, by default float in top and right.
 */
import React from 'react'
import classnames from 'classnames'

if (require('exenv').canUseDOM) require('./styles.scss')

const DivFloat = ({ children, horizontal, vertical }) => {
  return (
    <div className={classnames('float', horizontal, vertical)}>
      {children}
    </div>
  )
}

DivFloat.propTypes = {
  horizontal: PropTypes.oneOf(['right', 'left']),
  vertical: PropTypes.oneOf(['top', 'bottom'])
}

DivFloat.defaultProps = {
  horizontal: 'right',
  vertical: 'top'
}

export default DivFloat
