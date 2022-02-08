import PropTypes from 'prop-types'
import React from 'react'

class NavbarForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      name: props.defaultValue
    }
  }

  componentDidMount () {
    this.refs.nameInput.focus()
    this.refs.nameInput.select()
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyUp (e) {
    if (e.keyCode === 27) {
      this.submit(e)
    }
  }

  handleChangeName (e) {
    this.setState({name: e.target.value})
  }

  submit (e) {
    e.preventDefault()
    const {
      block,
      blockUpdate,
      handleCloseForm
    } = this.props

    blockUpdate({ ...block, name: this.state.name })
    handleCloseForm()
  }

  render () {
    return (
      <form className='inline-block' onSubmit={this.submit.bind(this)}>
        <input
          type='text'
          ref='nameInput'
          className='input z2 relative'
          value={this.state.name}
          onChange={this.handleChangeName.bind(this)}
        />
        <div
          className='fixed top-0 right-0 bottom-0 left-0 z1'
          onClick={this.submit.bind(this)} />
      </form>
    )
  }
}

NavbarForm.propTypes = {
  handleCloseForm: PropTypes.func.isRequired,
  mobilization: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  blockUpdate: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
}

export default NavbarForm
