import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

// Global module dependencies
import { InputCounter } from 'components/form-util'

// Current module dependencies
import { Raise } from 'components/forms'

class ControlLabel extends Component {
  render () {
    const formGroup = this.context.$formGroup
    const controlId = formGroup && formGroup.controlId
    const error = formGroup && formGroup.error
    const touched = formGroup && formGroup.touched
    const submitError = formGroup && formGroup.submitError

    const { children, htmlFor = controlId, className, maxLength, hideError, ...props } = this.props

    return (
      <label style={{ cursor: 'pointer' }} htmlFor={htmlFor} {...props}>
        <span className={classnames('caps', className)}>{children}</span>
        {!maxLength ? null : (
          <InputCounter
            className='right regular'
            maxLength={maxLength}
            length={formGroup.value ? formGroup.value.length : 0}
          />
        )}
        {(submitError || error) && touched && !hideError && <Raise error={error || submitError} />}
      </label>
    )
  }
}

ControlLabel.contextTypes = {
  $formGroup: PropTypes.object
}

ControlLabel.propTypes = {
  htmlFor: PropTypes.string
}

export default ControlLabel
