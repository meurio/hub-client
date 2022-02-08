import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import classnames from 'classnames'

import { NavbarButton, NavbarForm } from 'components/navigation/navbar'

export class NavbarEditionWrapper extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isEditing: false,
      isMouseOver: false
    }
  }

  handleEditButtonClick () {
    this.setState({
      isEditing: true,
      isMouseOver: false
    })
  }

  handleHideButtonClick () {
    this.refs.hideButton.blur()
    const { blockUpdate, block } = this.props
    blockUpdate({ ...block, menu_hidden: !block.menu_hidden })
  }

  handleCloseForm () {
    this.setState({isEditing: false})
  }

  handleMouseOver () {
    this.setState({isMouseOver: true})
  }

  handleMouseOut () {
    this.setState({isMouseOver: false})
  }

  renderEditingButtons () {
    const buttonsWrapperClassName = classnames(
      'absolute z1 right-align full-width top-0',
      { hide: this.state && !this.state.isMouseOver }
    )

    const editingButtonsStyle = {
      width: '27px',
      height: '27px',
      padding: 0,
      marginLeft: '4px',
      marginTop: '4px'
    }

    const editingButtonsClassName = 'btn white bg-darken-4 circle'

    const hideButtonClassName = classnames(
      'fa',
      {'fa-eye-slash': !this.props.block.menu_hidden},
      {'fa-eye': this.props.block.menu_hidden}
    )

    return (
      <div className='relative'>
        <div className={buttonsWrapperClassName}>
          <button
            className={editingButtonsClassName}
            style={editingButtonsStyle}
            onClick={this.handleEditButtonClick.bind(this)}
          >
            <i className='fa fa-pencil' />
          </button>
          <button
            ref='hideButton'
            className={editingButtonsClassName}
            style={editingButtonsStyle}
            onClick={this.handleHideButtonClick.bind(this)}
          >
            <i className={hideButtonClassName} />
          </button>
        </div>
      </div>
    )
  }

  blockName (block) {
    return block.name || this.props.intl.formatMessage({
      id: 'components.navigation--navbar-edition-wrapper.block',
      defaultMessage: 'Bloco {position}'
    }, { position: block.position })
  }

  renderNavbarButton () {
    const { block, className } = this.props

    return (
      <div
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}>
        <NavbarButton
          targetId={'block-' + block.id}
          scrollableId='blocks-list'
          hidden={block.menu_hidden}
          className={className}>
          {this.blockName(block)}
        </NavbarButton>
        {this.props.editable && this.renderEditingButtons()}
      </div>
    )
  }

  renderNavbarForm () {
    const { block } = this.props

    return (
      <NavbarForm
        {...this.props}
        defaultValue={this.blockName(block)}
        handleCloseForm={this.handleCloseForm.bind(this)}
      />
    )
  }

  render () {
    return (
      this.state.isEditing ? this.renderNavbarForm() : this.renderNavbarButton()
    )
  }
}

NavbarEditionWrapper.propTypes = {
  block: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  auth: PropTypes.object,
  className: PropTypes.string,
  intl: intlShape.isRequired
}

export default injectIntl(NavbarEditionWrapper)
