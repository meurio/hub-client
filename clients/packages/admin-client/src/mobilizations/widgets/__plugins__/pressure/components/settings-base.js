import PropTypes from 'prop-types'
import React from 'react'

// Global module dependencies
import { SettingsPageLayout } from 'components/layout'

// Current module dependencies
import { SettingsMenu } from 'mobilizations/widgets/__plugins__/pressure/components'

const SettingsBase = ({ children, location, mobilization, widget }) => (
  <SettingsPageLayout>
    <SettingsMenu
      location={location}
      mobilization={mobilization}
      widget={widget}
    />
    {children}
  </SettingsPageLayout>
)

SettingsBase.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default SettingsBase
