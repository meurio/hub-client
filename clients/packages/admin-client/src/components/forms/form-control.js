import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

import { ControlButtons } from './'

const tagsShouldCleanup = ['input', 'textarea', 'select']

class FormControl extends Component {
  render () {
    const {
      componentClass: Component,
      containerClassName,
      className,
      style,
      submitted,
      addonText,
      children,
      content,
      ...props
    } = this.props
    const {
      $formRedux: { formInline, submitting, dirty },
      $formGroup: { controlId, ...field }
    } = this.context

    const fieldProps = Object.assign({}, field)
    if (tagsShouldCleanup.indexOf(Component) !== -1) {
      delete fieldProps.layout
      delete fieldProps.error
      delete fieldProps.touched
      delete fieldProps.valid
    }

    return (
      <div className={classnames(
        containerClassName,
        addonText !== undefined ? 'input-group' : ''
      )}>
        <Component
          {...props}
          {...fieldProps}
          id={controlId}
          className={classnames(
            'form-control-input block lightestgray',
            Component,
            formInline ? 'inline-block' : '',
            addonText !== undefined ? 'form-control-input-addon' : '',
            className
          )}
          style={style}
        >
          {children}
        </Component>
        {addonText && <span className='text-addon'>{addonText}</span>}
        {content}
        {formInline && (
          <ControlButtons {...{ submitted, submitting, dirty, showCancel: false, formInline }} />
        )}
      </div>
    )
  }
}

FormControl.contextTypes = {
  $formRedux: PropTypes.shape({
    formInline: PropTypes.bool,
    submitting: PropTypes.bool,
    dirty: PropTypes.bool
  }),
  $formGroup: PropTypes.shape({
    controlId: PropTypes.string
  })
}

FormControl.propTypes = {
  submitted: PropTypes.bool.isRequired,
  componentClass: PropTypes.string.isRequired,
  style: PropTypes.object
}

FormControl.defaultProps = {
  componentClass: 'input',
  submitted: false
}

export default FormControl
