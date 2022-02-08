import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import classnames from 'classnames'

// Current module dependencies
import { InputForm } from '../components'

class Input extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editing: this.props.initializeEditing
    }
  }

  handleMouseOver () {
    this.setState({hasMouseOver: true})
  }

  handleMouseOut () {
    this.setState({hasMouseOver: false})
  }

  handleClick () {
    if (this.props.configurable) {
      this.setState({editing: true})
    }
  }

  handleCloseForm () {
    this.setState({editing: false})
  }

  renderForm () {
    const { uid } = this.props
    return (
      <TransitionGroup>
        <InputForm {...this.props} onClose={this.handleCloseForm.bind(this)} key={'form-' + uid} />
      </TransitionGroup>
    )
  }

  renderInstructions () {
    const { configurable } = this.props
    if (configurable && this.state.hasMouseOver) {
      return (
        <div className='right'>
          <i className='fa fa-pencil-square-o mr1' />
          <FormattedMessage
            id='form-widget.components--input.click-to-edit'
            defaultMessage='Clique para editar'
          />
        </div>
      )
    }
  }

  renderFieldKind () {
    const { field, uid, editable, configurable, onBlur } = this.props

    if (field.kind === 'dropdown') {
      return (<select
        id={'input-' + uid}
        className='select block border border-gray94'
        style={{
          cursor: editable || configurable ? 'pointer' : null,
          borderRadius: '2px',
          padding: '1rem',
          display: 'inline-block',
          height: 'inherit'
        }}
      >
        <option value=''>
          <FormattedMessage
            id='form-widget.components--input.field-dropdown.options.default'
            defaultMessage='Selecione...'
          />
        </option>
        {
          field.placeholder.split(',').map(function (v, index) {
            return <option key={`dropdown-option-${index}`}>{v}</option>
          })
        }
      </select>)
    } else if (field.kind === 'greetings') {
      return (
        editable || configurable ? (
          <p className='block full-width'>
            <strong>
              <FormattedMessage
                id='form-widget.components--input.field-greetings.title'
                defaultMessage='Mensagem de sucesso alterada para:'
              />
            </strong>
            <br />
            {field.placeholder}
          </p>
        )
        : null
      )
    } else {
      return (
        <input
          id={`input-${uid}`}
          className='input block border border-gray94'
          style={{
            cursor: editable || configurable ? 'pointer' : null,
            borderRadius: '2px',
            padding: '1rem'
          }}
          onBlur={onBlur}
          placeholder={field.placeholder}
          type={field.kind === 'email' ? 'email' : 'text'}
        />
      )
    }
  }

  renderInput () {
    const {
      field,
      editable,
      configurable,
      mobilization: {
        body_font: bodyFont
      }
    } = this.props

    return (
      <div
        className='mb2'
        onMouseEnter={this.handleMouseOver.bind(this)}
        onMouseLeave={this.handleMouseOut.bind(this)}
        style={{
          cursor: editable || configurable ? 'pointer' : null,
          fontFamily: bodyFont
        }}
        onClick={this.handleClick.bind(this)}>
        <label
          className={classnames(
            'caps bold mb1 inline-block',
            configurable ? 'darkengray' : 'white'
          )}
          style={{
            cursor: editable || configurable ? 'pointer' : null,
            fontSize: '.75rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          {field.label}{field.required === 'true' ? '*' : null}
        </label>
        {this.renderInstructions()}
        {this.renderFieldKind()}
      </div>
    )
  }

  render () {
    return (this.state.editing ? this.renderForm() : this.renderInput())
  }
}

export default Input
