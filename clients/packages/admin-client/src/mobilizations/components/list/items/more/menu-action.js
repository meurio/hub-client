import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

const MenuAction = ({
  componentClass: Component,
  className,
  text,
  path,
  icon,
  ...rest
}) => {
  const classNameProp = classnames('gray20', className)
  return Component === 'Link' ? (
    <Link to={path} className={classNameProp}>
      <i className={`fa fa-${icon}`} />
      <span>{text}</span>
    </Link>
  ) : (
    <Component {...rest} href={path || undefined} className={classNameProp}>
      <i className={`fa fa-${icon}`} />
      <span>{text}</span>
    </Component>
  )
}

MenuAction.propTypes = {
  componentClass: PropTypes.oneOf(['Link', 'a', 'div']),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  text: PropTypes.any.isRequired,
  path: PropTypes.string,
  icon: PropTypes.string.isRequired
}

MenuAction.defaultProps = {
  componentClass: 'Link'
}

export default MenuAction
