import PropTypes from 'prop-types'
import React, { Component } from 'react'
import uuid from 'uuid'
import StepButton from './step-button'
import StepForm from './step-form'

if (require('exenv').canUseDOM) require('./step-content.scss')

const cloneStepChildren = (child, props, whitelist) => {
  return whitelist.includes(child.type)
    ? React.cloneElement(child, { ...props, key: uuid() })
    : child
}

class StepContent extends Component {
  renderIcon () {
    const { step, position } = this.props
    if (position < step) {
      return (
        <span className='ic-step bg-pagenta'>
          <i className='fa fa-check' />
        </span>
      )
    }
    return (
      <span className='ic-step bg-pagenta'>
        {position}
      </span>
    )
  }

  render () {
    const {
      children,
      title,
      styleFromParent,
      style,
      onNextStep,
      propsPropagationDefaultWhitelist
    } = this.props
    const cloneProps = { onNextStep, onFinishSubmit: onNextStep }
    const componentsWhitelist = [...propsPropagationDefaultWhitelist]

    return (
      <div
        className='components--step-content bg-white'
        style={{ ...styleFromParent, ...style }}
      >
        {!title ? null : (
          <div className='header'>
            <h3>{this.renderIcon()}{title}</h3>
          </div>
        )}
        <div className='content'>
          {!children ? null : children.length
            ? children.map(child => cloneStepChildren(child, cloneProps, componentsWhitelist))
            : cloneStepChildren(children, cloneProps, componentsWhitelist)
          }
        </div>
      </div>
    )
  }
}

StepContent.propTypes = {
  title: PropTypes.string,
  position: PropTypes.number,
  step: PropTypes.number,
  onNextStep: PropTypes.func,
  styleFromParent: PropTypes.object.isRequired,
  style: PropTypes.object,
  propsPropagationDefaultWhitelist: PropTypes.array.isRequired
}

StepContent.defaultProps = {
  styleFromParent: {},
  style: {},
  propsPropagationDefaultWhitelist: [StepButton, StepForm]
}

export default StepContent
