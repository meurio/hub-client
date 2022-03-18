import PropTypes from 'prop-types'
import React from 'react'

// Current module dependencies
if (require('exenv').canUseDOM) require('./more.scss')

export const More = ({ index, onClick, children }) => (
  <div className='more right pr3'>
    <i
      className='fa fa-ellipsis-h'
      onClick={(e) => {
        if (e) e.preventDefault()
        onClick(index)
      }}
    />
    {children}
  </div>
)

More.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default More
