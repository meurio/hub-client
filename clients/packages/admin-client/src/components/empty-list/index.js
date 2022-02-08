import PropTypes from 'prop-types'
import React, { Component } from 'react'

if (require('exenv').canUseDOM) require('./index.scss')

class EmptyList extends Component {
  render () {
    const { children } = this.props
    return (
      <div className='empty-list'>
        <div className='geometrics-container'>
          <div className='square' />
          <div className='diamond' />
          <div className='circle' />
        </div>
        {children}
      </div>
    )
  }
}

EmptyList.propTypes = {
  children: PropTypes.node
}

export default EmptyList
