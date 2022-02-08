import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const HelpBlock = ({ children, className }) => (
  <div className={classnames('muted my2', className)}>
    <small className='block'>
      <dfn>{children}</dfn>
    </small>
  </div>
)

HelpBlock.propTypes = {
  className: PropTypes.string
}

export default HelpBlock
