import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

class FormError extends Component {
  render () {
    const { $formRedux: { error } } = this.context
    const { className } = this.props

    return !error ? null : (
      <div className={classnames('h5 white bold center animated shake', className)}>
        {error}
      </div>
    )
  }
}

FormError.contextTypes = {
  $formRedux: PropTypes.object
}

FormError.propTypes = {
  className: PropTypes.string
}

export default FormError
