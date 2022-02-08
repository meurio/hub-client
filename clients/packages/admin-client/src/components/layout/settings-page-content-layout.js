import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const SettingsPageContentLayout = ({
  children,
  className,
  containerClassName,
  wrapClassName,
  overflow
}) => (
  <div
    className={classnames(
      'settings-page-content-layout clearfix py3 pr4 pl3 border-box',
      `overflow-${overflow}`,
      className
    )}
  >
    <div
      className={classnames(
        'settings-page-content-layout-container',
        'clearfix',
        containerClassName,
        wrapClassName || 'md-col-12 lg-col-9'
      )}
    >
      {children}
    </div>
  </div>
)

SettingsPageContentLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  containerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  wrapClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

SettingsPageContentLayout.defaultProps = {
  overflow: 'auto'
}

export default SettingsPageContentLayout
