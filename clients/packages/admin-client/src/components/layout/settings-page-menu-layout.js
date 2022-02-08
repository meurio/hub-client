import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const SettingsPageMenuLayout = ({ children, title, className }) => (
  <div
    className={classnames(
      'settings-page-menu-layout bg-white pt3 pr4 pl3 border-only-bottom border-gray94',
      className
    )}
  >
    <h1 className='h1 mt0 mb3'>{title}</h1>
    {children}
  </div>
)

SettingsPageMenuLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.any.isRequired
}

export default SettingsPageMenuLayout
