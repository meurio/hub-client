import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const SettingsPageLayout = ({ children, className }) => (
  <div
    className={classnames(
      'settings-page-layout flex-auto flex flex-column bg-silver relative',
      className
    )}
  >
    {children}
  </div>
)

SettingsPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default SettingsPageLayout
