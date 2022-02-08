import PropTypes from 'prop-types'
import React from 'react'

const Step = ({ children, stepComponent: StepComponent, ...props }) => (
  <StepComponent {...props}>
    {children}
  </StepComponent>
)

Step.propTypes = {
  step: PropTypes.number,
  isValid: PropTypes.bool,
  stepComponent: PropTypes.any.isRequired
}

export default Step
