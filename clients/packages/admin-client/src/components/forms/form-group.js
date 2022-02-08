import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

class FormGroup extends Component {
  getChildContext () {
    const { controlId, layout, value, onChange, onBlur, error, touched, valid, submitError } = this.props
    return {
      $formGroup: { controlId, layout, value, onChange, onBlur, error, touched, valid, submitError }
    }
  }

  render () {
    const { children, className, layout, style } = this.props
    const styleGroup = layout === 'inline' ? { paddingRight: '1rem' } : {}

    return (
      <div
        className={classnames('form-group', className)}
        style={Object.assign(styleGroup, style)}
      >
        {children}
      </div>
    )
  }
}

FormGroup.contextTypes = {
  $formRedux: PropTypes.object
}

FormGroup.propTypes = {
  controlId: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  layout: PropTypes.oneOf(['inline', 'block'])
}

FormGroup.defaultProps = {
  layout: 'block'
}

FormGroup.childContextTypes = {
  $formGroup: PropTypes.object.isRequired
}

export default FormGroup
