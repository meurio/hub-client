import classnames from 'classnames'
import React from 'react'

interface DropdownMenuProperties {
  className?: string;
  menuClassName?: string;
  menuStyle?: any;
  wrapperClassName?: string;
  buttonClassName?: string;
  text?: string;
  children?: any
  icon?: string
}

interface DropdownMenuState {
  open: boolean;
}

class DropdownMenu extends React.Component<DropdownMenuProperties, DropdownMenuState> {
  constructor(properties, context) {
    super(properties, context)
    this.state = { open: false }
  }

  handleClick(): void {
    this.setState({ open: !this.state.open })
  }

  handleOverlayClick(): void {
    this.setState({ open: false })
  }

  renderIcon(): any {
    return !this.props.icon ? undefined : (
      <i ref='icon' className={classnames('icon fa', `fa-${this.props.icon}`)} />
    )
  }

  renderOverlay(): any {
    return !this.state.open ? undefined : (
      <div
        className='overlay fixed top-0 right-0 bottom-0 left-0 z1'
        onClick={this.handleOverlayClick.bind(this)}
      />
    )
  }

  renderChildren(): any {
    return this.props.children.map((child, index) => {
      const properties = child.type !== 'div' ? { onItemClick: this.handleOverlayClick.bind(this) } : {}
      return React.cloneElement(child, {
        key: `item-${index}`,
        ...properties
      })
    })
  }

  render(): React.ReactElement {
    const {
      wrapperClassName,
      buttonClassName,
      menuClassName,
      menuStyle,
      text,
      children
    } = this.props

    return (
      <div style={{ marginTop: '5px' }} className={classnames('relative', wrapperClassName)}>
        <button ref='button' type="button" className={buttonClassName} onClick={this.handleClick.bind(this)}>
          {this.renderIcon()} {text}
        </button>
        <div
          className={classnames(
            'absolute nowrap z2',
            menuClassName,
            (this.state.open ? '' : 'display-none')
          )}
          style={menuStyle}
        >
          {children.length > 0 && this.renderChildren()}
        </div>
        {this.renderOverlay()}
      </div>
    )
  }
}

export default DropdownMenu
