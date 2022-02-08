import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

class SidenavListItem extends Component {
  render () {
    const { text, icon, linkType, children, className, href, target, onClick, style } = this.props
    const { customIcon, customContent } = this.props

    const elementTypes = {
      router: { component: Link, props: { to: href } },
      anchor: { component: 'a', props: { href, target, onClick } }
    }
    const current = elementTypes[linkType]
    const Component = current.component

    return (
      <div className={classnames('item', className)} style={style}>
        <Component
          className='block clearfix'
          {...current.props}
        >

          <div className='item-icon'>
            {!!customIcon && customIcon}
            {!!icon && (<i className={`fa fa-${icon}`} />)}
          </div>
          <div className='item-content'>
            <div className='item-content-wrapper'>
              {!!customContent && customContent}
              {!!text && (<div>{text}</div>)}
              {!!children && (<div className='item-content-children'>{children}</div>)}
            </div>
          </div>
        </Component>
      </div>
    )
  }
}

SidenavListItem.contextTypes = {
  router: PropTypes.object
}

SidenavListItem.defaultProps = {
  linkType: 'router',
  target: '_self'
}

export default SidenavListItem
