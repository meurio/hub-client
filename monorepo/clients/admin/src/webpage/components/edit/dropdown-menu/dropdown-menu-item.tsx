import classnames from 'classnames'

interface DropdownMenuItemProperties {
  href?: string;
  children?: any
  onClick?: () => void
  onItemClick?: () => void
  disabled?: boolean;
  className?: string
}

const DropdownMenuItem = (properties: DropdownMenuItemProperties): React.ReactElement => {
  const handleClick = (event): void => {
    (properties.onClick || properties.disabled) && event && event.preventDefault()
    if (!properties.disabled) {
      properties.onItemClick && properties.onItemClick()
      properties.onClick && properties.onClick()
    }
  }

  const { className, disabled, href, children } = properties

  return (
    <a
      className={classnames(className, (disabled ? 'muted' : ''))}
      style={{
        pointerEvents: disabled ? "none" : "initial"
      }}
      onClick={handleClick}
      href={href}>
      {children}
    </a>
  )
}

export default DropdownMenuItem
