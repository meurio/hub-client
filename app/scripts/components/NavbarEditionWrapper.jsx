import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { NavbarButton, NavbarForm } from './'
import { editBlock } from './../reducers/blocks'

export default class NavbarEditionWrapper extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    className: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      isEditing: false,
      isMouseOver: false
    }
  }

  handleEditButtonClick() {
    this.setState({
      isEditing: true,
      isMouseOver: false
    })
  }

  handleHideButtonClick() {
    this.refs.hideButton.getDOMNode().blur()
    const { dispatch, mobilization, block, auth } = this.props

    dispatch(
      editBlock({
        mobilization_id: mobilization.id,
        id: block.id,
        block: {menu_hidden: !block.menu_hidden},
        credentials: auth.credentials
      })
    )
  }

  handleCloseForm() {
    this.setState({isEditing: false})
  }

  handleMouseOver() {
    this.setState({isMouseOver: true})
  }

  handleMouseOut() {
    this.setState({isMouseOver: false})
  }

  renderEditingButtons() {
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

    const editingButtonsClassName = 'button white bg-darken-4 circle'

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
            onClick={::this.handleEditButtonClick}>
            <i className='fa fa-pencil' />
          </button>
          <button
            ref='hideButton'
            className={editingButtonsClassName}
            style={editingButtonsStyle}
            onClick={::this.handleHideButtonClick}>
            <i className={hideButtonClassName} />
          </button>
        </div>
      </div>
    )
  }

  blockName(block) {
    return block.name || `Bloco ${block.position}`
  }

  renderNavbarButton() {
    const { block, className } = this.props

    return (
      <div
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}>
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

  renderNavbarForm() {
    const { block } = this.props

    return (
      <NavbarForm
        {...this.props}
        defaultValue={this.blockName(block)}
        handleCloseForm={::this.handleCloseForm}
      />
    )
  }

  render() {
    return (
      this.state.isEditing ? this.renderNavbarForm() : this.renderNavbarButton()
    )
  }
}
