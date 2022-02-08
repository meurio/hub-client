import classnames from 'classnames'
import React from 'react'
import NavbarButton from "./navbar-button";
import NavbarForm from './navbar-form';

export interface INavbarEditionWrapper {
  block: any;
  editable?: boolean;
  blockUpdate: (block: any) => void;
  // eslint-disable-next-line unicorn/no-keyword-prefix
  className?: string;
  // intl: intlShape.isRequired
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class NavbarEditionWrapper extends React.Component<INavbarEditionWrapper, any> {
  constructor(properties, context) {
    super(properties, context)
    this.state = {
      isEditing: false,
      isMouseOver: false
    }
  }

  handleEditButtonClick(): void {
    this.setState({
      isEditing: true,
      isMouseOver: false
    })
  }

  handleHideButtonClick(): void {
    (this.refs.hideButton as any).blur()
    const { blockUpdate, block } = this.props
    blockUpdate({ ...block, menu_hidden: !block.menu_hidden })
  }

  handleCloseForm(): void {
    this.setState({ isEditing: false })
  }

  handleMouseOver(): void {
    this.setState({ isMouseOver: true })
  }

  handleMouseOut(): void {
    this.setState({ isMouseOver: false })
  }

  renderEditingButtons(): React.ReactElement {
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
      { 'fa-eye-slash': !this.props.block.menu_hidden },
      { 'fa-eye': this.props.block.menu_hidden }
    )

    return (
      <div className='relative'>
        <div className={buttonsWrapperClassName}>
          <button
            type="button"
            className={editingButtonsClassName}
            style={editingButtonsStyle}
            onClick={this.handleEditButtonClick.bind(this)}
          >
            <i className='fa fa-pencil' />
          </button>
          <button
            ref='hideButton'
            type="button"
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

  // eslint-disable-next-line class-methods-use-this
  blockName(block): string {
    return block.name || `Bloco ${block.position}`;
    
    // this.props.intl.formatMessage({
    //   id: 'components.navigation--navbar-edition-wrapper.block',
    //   defaultMessage: 'Bloco {position}'
    // }, { position: block.position })
  }

  renderNavbarButton(): React.ReactElement {
    // eslint-disable-next-line unicorn/no-keyword-prefix
    const { block, className } = this.props

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}>
        <NavbarButton
          targetId={`block-${block.id}`}
          scrollableId='blocks-list'
          hidden={block.menu_hidden}
          // eslint-disable-next-line unicorn/no-keyword-prefix
          className={className}>
          {this.blockName(block)}
        </NavbarButton>
        {this.props.editable && this.renderEditingButtons()}
      </div>
    )
  }

  renderNavbarForm(): React.ReactElement {
    const { block } = this.props

    return (
      <NavbarForm
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...this.props}
        defaultValue={this.blockName(block)}
        handleCloseForm={this.handleCloseForm.bind(this)}
      />
    )
  }

  render(): React.ReactElement {
    return this.state.isEditing ? this.renderNavbarForm() : this.renderNavbarButton();
  }
}

// export default injectIntl(NavbarEditionWrapper)
export default NavbarEditionWrapper;
