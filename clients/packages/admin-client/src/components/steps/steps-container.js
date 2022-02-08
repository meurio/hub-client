import PropTypes from 'prop-types'
import React, { Component } from 'react'

class StepsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { step: 1 }
  }

  nextStep (index) {
    if (this.state.step === index) {
      this.setState({ step: this.state.step + 1 })
    }
  }

  render () {
    const { title, children } = this.props

    return (
      <div className='steps'>
        {title && <h2>{title}</h2>}

        {/* Render StepContent with position */}
        {children && children.length ? children.map((child, index) => {
          const position = index + 1
          let el
          if (position <= this.state.step) {
             el = React.cloneElement(child, {
              position,
              step: this.state.step,
              onNextStep: () => this.nextStep(position),
              key: index,
            })
          }
          return el
        }) : children ? React.cloneElement(children, { position: 1 }) : null}
      </div>
    )
  }
}

StepsContainer.propTypes = {
  title: PropTypes.string
}

export default StepsContainer
