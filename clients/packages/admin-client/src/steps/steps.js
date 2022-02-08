import PropTypes from 'prop-types'
import React, { Component } from 'react'

const INITIAL_STEP_PROGRESS = 1

class Steps extends Component {
  constructor (props) {
    super(props)
    this.state = { current: INITIAL_STEP_PROGRESS }
  }

  refreshStepsProgress (props) {
    const { progressValidations: validations } = props
    //
    // Check if the childrens validation pass.
    // If it pass, jump to the next step.
    // If not, define it as current.
    //
    validations && validations.length && validations.some((validate, index) => {
      this.setState({ current: ++index })
      return !validate()
    })
  }

  componentWillReceiveProps (nextProps) {
    this.refreshStepsProgress(nextProps)
  }

  componentWillMount () {
    this.refreshStepsProgress(this.props)
  }

  render () {
    const { children, className, renderRule } = this.props

    const steps = children && children.length === 1 ? [children] : children

    return (
      <div className={`steps ${className}`}>
        {steps && steps.map((stepComponent, index) => {
          const position = index + 1
          let el
          if (renderRule(position, this.state.current)) {
            el = React.cloneElement(stepComponent, {
              key: `step-${position}`,
              step: position,
              isValid: position < this.state.current
            })
          }
          return el
        })}
      </div>
    )
  }
}

Steps.propTypes = {
  progressValidations: PropTypes.array,
  renderRule: PropTypes.func
}

export default Steps
