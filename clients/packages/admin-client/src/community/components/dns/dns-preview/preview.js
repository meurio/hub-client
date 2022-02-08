import PropTypes from 'prop-types'
import React, { Component } from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

class Preview extends Component {
  render () {
    const { children, header } = this.props

    return (
      <div className='container-fluid'>
        {header}
        {children}
      </div>
    )
  }
}

Preview.propTypes = {
  children: PropTypes.node,
  headers: PropTypes.array
}

export default Preview
