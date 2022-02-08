import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

// Current module dependencies
import { ControlButtons } from '../'
if (require('exenv').canUseDOM) require('./index.scss')

class FormRedux extends Component {
  constructor (props) {
    super(props)
    this.state = { submitted: false }
  }

  componentWillReceiveProps (nextProps) {
    const { onFinishSubmit, submitting, forceFinishSubmit } = this.props
    const naturalSubmitTransition = (
      submitting &&
      !nextProps.submitting &&
      !nextProps.submitFailed
    )
    const forcedSubmitTransition = !forceFinishSubmit && nextProps.forceFinishSubmit

    if (naturalSubmitTransition || forcedSubmitTransition) {
      this.setState({ submitted: true })
      onFinishSubmit && onFinishSubmit()
    }
  }

  getChildContext () {
    const { inline, floatButton, successMessage, ...rest } = this.props
    return {
      $formRedux: {
        ...rest,
        formInline: inline,
        floatButton,
        successMessage,
        submitted: this.state.submitted
      }
    }
  }

  render () {
    const {
      children,
      onSubmit,
      submit,
      handleSubmit,
      submitting,
      dirty,
      valid,
      inline,
      className,
      floatButton,
      nosubmit,
      style,
      onCancel
    } = this.props
    const { submitted } = this.state

    return (
      <form
        style={style}
        onSubmit={handleSubmit(submit || onSubmit)}
        className={classnames(
          'form-redux form',
          floatButton ? 'btn-float' : null,
          className || 'transparent'
        )}
      >
        {children}
        {!inline && !nosubmit && <ControlButtons {...{ submitted, submitting, dirty, valid, onCancel }} />}
      </form>
    )
  }
}

FormRedux.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  submit: PropTypes.func,
  // redux-form props
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  inline: PropTypes.bool.isRequired,
  floatButton: PropTypes.string.isRequired,
  successMessage: PropTypes.string
}

FormRedux.defaultProps = {
  submitting: false,
  inline: false,
  className: '',
  floatButton: ''
}

FormRedux.childContextTypes = {
  $formRedux: PropTypes.object.isRequired
}

export default FormRedux
