import PropTypes from 'prop-types'
import React from 'react'

import { FormRedux } from 'components/forms'

const StepForm = ({ children, buttonText, onNextStep, ...formProps }) => {
  return (
    <FormRedux nosubmit {...formProps} onFinishSubmit={onNextStep}>
      {children}
    </FormRedux>
  )
}

StepForm.propTypes = {
  onNextStep: PropTypes.func
}

export default StepForm
