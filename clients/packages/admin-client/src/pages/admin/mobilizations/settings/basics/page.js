import React from 'react'
import { startSubmit, stopSubmit } from 'redux-form'
import { MobilizationBasicsForm } from 'mobilizations/components'

const MobilizationsSettingsBasicsPage = ({ dispatch, ...props }) => (
  <MobilizationBasicsForm
    floatSubmit
    onFinishSubmit={mobilization => {
      // fix to show up the success message
      if (mobilization) {
        dispatch(startSubmit(props.formName))
        dispatch(stopSubmit(props.formName))
      }
    }}
    {...props}
  />
)

export default MobilizationsSettingsBasicsPage
