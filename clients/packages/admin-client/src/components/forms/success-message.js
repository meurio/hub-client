import PropTypes from 'prop-types'
import React, { Component } from 'react'

class SuccessMessage extends Component {
  render () {
    const { $formRedux: { submitted } } = this.context
    const { text } = this.props
    return submitted ? (
      <div className='success-message olive h4 mt2'>
        {text}
        <i className='fa fa-check-circle olive ml1' />
      </div>
    ) : <noscript />
  }
}

SuccessMessage.contextTypes = {
  $formRedux: PropTypes.object
}

SuccessMessage.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
}

export default SuccessMessage
