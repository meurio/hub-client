import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import WYSIHTMLToolbarInsertImage from './wysihtml-toolbar-insert-image'
import WYSIHTMLToolbarInsertHTML from './wysihtml-toolbar-insert-html'
import WYSIHTMLToolbarCreateLink from './wysihtml-toolbar-create-link'
import WYSIHTMLToolbarColorPicker from './wysihtml-toolbar-color-picker'

import { DropdownMenu, DropdownMenuItem } from 'components/dropdown-menu'

const renderFontsizeDropdownMenuItem = (size, className) => (
  <DropdownMenuItem>
    <span
      className={classnames('block button button-transparent white p2', className)}
      data-wysihtml5-command='fontSize'
      data-wysihtml5-command-value={className}
    >
      {size}
    </span>
  </DropdownMenuItem>
)

class WYSIHTMLToolbar extends React.Component {
  render () {
    const { elementId, className, style, buttonClassName } = this.props

    return (
      <div id={elementId} className={className} style={style}>
        <a href='/' data-wysihtml5-command='createLink' className={buttonClassName}>
          <i className='fa fa-link' />
        </a>
        <a href='/' data-wysihtml5-command='removeLink' className={buttonClassName}>
          <i className='fa fa-unlink' />
        </a>
        <a href='/' data-wysihtml5-command='insertImage' className={buttonClassName}>
          <i className='fa fa-image' />
        </a>
        <a href='/' data-wysihtml5-command='insertHTMLForm' className={buttonClassName}>
          <i className='fa fa-code' />
        </a>
        <a href='/' data-wysihtml5-command='insertUnorderedList' className={buttonClassName}>
          <i className='fa fa-list-ul' />
        </a>
        <a href='/' data-wysihtml5-command='insertOrderedList' className={buttonClassName}>
          <i className='fa fa-list-ol' />
        </a>
        <a href='/' data-wysihtml5-command='alignLeftStyle' className={buttonClassName}>
          <i className='fa fa-align-left' />
        </a>
        <a href='/' data-wysihtml5-command='alignCenterStyle' className={buttonClassName}>
          <i className='fa fa-align-center' />
        </a>
        <a href='/' data-wysihtml5-command='alignRightStyle' className={buttonClassName}>
          <i className='fa fa-align-right regular' />
        </a>
        <a href='/' data-wysihtml5-command='undo' className={buttonClassName}>
          <i className='fa fa-undo regular' />
        </a>
        <a href='/' data-wysihtml5-command='redo' className={buttonClassName}>
          <i className='fa fa-repeat regular' />
        </a>
        <a href='/' data-wysihtml5-command='bold' className={buttonClassName}>
          <i className='fa fa-bold' />
        </a>
        <a href='/' data-wysihtml5-command='italic' className={buttonClassName}>
          <i className='fa fa-italic' />
        </a>
        <DropdownMenu
          icon='text-height'
          wrapperClassName='inline'
          buttonClassName='btn btn-transparent white p2'
          menuClassName='bg-darken-4 left-0'
        >
          {renderFontsizeDropdownMenuItem(8, 'h6')}
          {renderFontsizeDropdownMenuItem(16, 'h5')}
          {renderFontsizeDropdownMenuItem(24, 'h4')}
          {renderFontsizeDropdownMenuItem(48, 'h3')}
          {renderFontsizeDropdownMenuItem(72, 'h2')}
          {renderFontsizeDropdownMenuItem(80, 'h1')}
        </DropdownMenu>
        <a href='/' data-wysihtml5-command='foreColorStyle' className={buttonClassName}>
          <i className='fa fa-eyedropper' />
        </a>
        <WYSIHTMLToolbarInsertImage />
        <WYSIHTMLToolbarCreateLink />
        <WYSIHTMLToolbarInsertHTML />
        <WYSIHTMLToolbarColorPicker />
      </div>
    )
  }
}

WYSIHTMLToolbar.propTypes = {
  elementId: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  buttonClassName: PropTypes.string
}

export default WYSIHTMLToolbar
