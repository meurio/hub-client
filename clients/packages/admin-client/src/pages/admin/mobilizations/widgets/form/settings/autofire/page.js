import PropTypes from 'prop-types'
import React from 'react'

import { Loading } from 'components/await'
import { FormAutofire } from 'mobilizations/widgets/components'

const FormSettingsAutofirePage = props => !props.widget ? (
  <Loading />
) : (
  <FormAutofire {...props} />
)

FormSettingsAutofirePage.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default FormSettingsAutofirePage
