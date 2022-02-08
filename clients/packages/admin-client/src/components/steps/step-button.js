import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'ux/components'

const StepButton = ({ children, onClick, onNextStep, ...props }) => (
  <Button
    onClick={(e) => {
      onClick && onClick(e)
      onNextStep && onNextStep()
    }}
    {...props}
  >
    {children}
  </Button>
)

StepButton.propTypes = {
  onClick: PropTypes.func,
  onNextStep: PropTypes.func
}

export default StepButton
