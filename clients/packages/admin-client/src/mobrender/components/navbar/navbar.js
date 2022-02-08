import PropTypes from 'prop-types'
import React from 'react'

import Menu from './menu-items'

const Navbar = props => {
  const { blocks, editable } = props

  const onlyVisibleBlocks = blocks.filter(
    block => editable ? !block.hidden : !block.hidden && !block.menu_hidden
  )
  const menuProps = { ...props, blocks: onlyVisibleBlocks }

  return (
    <div className='absolute col-12 z3'>
      <Menu {...menuProps} />
      <Menu {...menuProps} mobile />
    </div>
  )
}

Navbar.propTypes = {
  editable: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.array,
  blockUpdate: PropTypes.func
}

Navbar.defaultProps = {
  editable: false,
  blocks: []
}

export default Navbar
