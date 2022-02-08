import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import * as MobActions from 'mobrender/redux/action-creators'

export class InputForm extends Component {
  constructor (props, context) {
    super(props, context)
    const { field } = this.props
    this.state = {
      loading: false,
      kind: field.kind,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required
    }
  }

  fieldTypes = {
    text: {
      id: 'form-widget.components--input-form.field-type.options.text',
      defaultMessage: 'Texto'
    },
    email: {
      id: 'form-widget.components--input-form.field-type.options.email',
      defaultMessage: 'E-mail'
    },
    number: {
      id: 'form-widget.components--input-form.field-type.options.number',
      defaultMessage: 'Número'
    },
    dropdown: {
      id: 'form-widget.components--input-form.field-type.options.dropdown',
      defaultMessage: 'Dropdown &#9733;'
    },
    greetings: {
      id: 'form-widget.components--input-form.field-type.options.greetings',
      defaultMessage: 'Saudação &#9733;'
    },
  }

  componentWillAppear () {
    const { uid } = this.props
    document.getElementById(uid).style.display='none'
  }

  componentWillReceiveProps (nextProps) {
    const { field } = this.props
    if (this.state.loading && field !== nextProps.field) {
      this.setState({ loading: false })
      this.props.onClose && this.props.onClose()
    }
  }

  dirty () {
    const { field } = this.props
    return field.kind !== this.state.kind ||
           field.label !== this.state.label ||
           field.placeholder !== this.state.placeholder ||
           field.required !== this.state.required
  }

  handleLabelChange (event) {
    this.setState({label: event.target.value})
  }

  handlePlaceholderChange (event) {
    this.setState({placeholder: event.target.value})
  }

  handleRequiredChange (event) {
    this.setState({required: event.target.value})
  }

  handleKindChange (event) {
    this.setState({kind: event.target.value})
  }

  updateSettings (newFields) {
    const { dispatch, widget } = this.props
    const { settings } = widget

    this.setState({ loading: true })
    dispatch(MobActions.asyncUpdateWidget({
      ...widget,
      settings: { ...settings, fields: newFields }
    }))
  }

  handleCancel (event) {
    event.preventDefault()
    event.stopPropagation()
    const { field } = this.props
    this.setState({
      kind: field.kind,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required
    })
    this.props.onClose && this.props.onClose()
  }

  handleSave (event) {
    event.preventDefault()
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field) => {
      if (field.uid === this.props.field.uid) {
        return {
          uid: field.uid,
          kind: this.state.kind,
          label: this.state.label,
          placeholder: this.state.placeholder,
          required: this.state.required
        }
      } else {
        return field
      }
    })
    this.updateSettings(newFields)
  }

  handleMoveUp (event) {
    event.preventDefault()
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field, index) => {
      if (index + 1 < fields.length && fields[index + 1].uid === this.props.field.uid) {
        return this.props.field
      } else if (field.uid === this.props.field.uid) {
        return fields[index - 1]
      } else {
        return field
      }
    })
    this.updateSettings(newFields)
  }

  handleMoveDown (event) {
    event.preventDefault()
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field, index) => {
      if (index > 0 && fields[index - 1].uid === this.props.field.uid) {
        return this.props.field
      } else if (field.uid === this.props.field.uid) {
        return fields[index + 1]
      } else {
        return field
      }
    })
    this.updateSettings(newFields)
  }

  handleRemove (event) {
    event.preventDefault()
    event.stopPropagation()
    if (window.confirm(this.props.intl.formatMessage({
      id: 'form-widget.components--input-form.handle-remove.confirm',
      defaultMessage: 'Você tem certeza que quer remover este campo?'
    }))) {
      const { fields } = this.props.widget.settings
      const newFields = fields.filter(field =>
        field.uid !== this.props.field.uid
      )
      this.updateSettings(newFields)
    }
  }

  handleOverlayClick (event) {
    event.preventDefault()
    event.stopPropagation()
    const dirty = this.dirty()
    if (!dirty || (dirty && window.confirm(this.props.intl.formatMessage({
      id: 'form-widget.components--input-form.handle-overlay-click.confirm',
      defaultMessage: 'Ao sair sem salvar você perderá suas modificações. Deseja sair sem salvar?'
    })))) {
      this.handleCancel(event)
    }
  }

  render () {
    const { canMoveUp, canMoveDown, uid, intl } = this.props
    return (
      <div className='animated slice-up'>
        <div
          id={`form-${uid}`}
          className='p2 mb3 bg-white border border-gray94 clearfix relative rounded z4'
        >
          <div className='col col-6'>
            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-middle'>
                <label className='h5 bold'>
                  <FormattedMessage
                    id='form-widget.components--input-form.field-title.label'
                    defaultMessage='Título do campo'
                  />
                </label>
              </div>
              <div className='col-9 table-cell'>
                <input
                  className='input m0'
                  placeholder={intl.formatMessage({
                    id: 'form-widget.components--input-form.field-title.placeholder',
                    defaultMessage: 'Ex: Email'
                  })}
                  type='text'
                  value={this.state.label}
                  onChange={this.handleLabelChange.bind(this)}
                />
              </div>
            </div>

            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-middle'>
                <label className='h5 bold'>
                  <FormattedMessage
                    id='form-widget.components--input-form.field-helper-text.label'
                    defaultMessage='Texto de ajuda'
                  />
                </label>
              </div>
              <div className='col-9 table-cell'>
                <input
                  className='input m0'
                  placeholder={intl.formatMessage({
                    id: 'form-widget.components--input-form.field-helper-text.placeholder',
                    defaultMessage: 'Ex: Insira aqui o seu email'
                  })}
                  type='text'
                  value={this.state.placeholder}
                  onChange={this.handlePlaceholderChange.bind(this)}
                />
              </div>
            </div>

            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-middle'>
                <label className='h5 bold'>
                  <FormattedMessage
                    id='form-widget.components--input-form.field-type.label'
                    defaultMessage='Tipo de campo'
                  />
                </label>
              </div>
              <div className='col-9 table-cell'>
                <select
                  className='select m0'
                  onChange={this.handleKindChange.bind(this)}
                  value={this.state.kind}>
                    {Object.keys(this.fieldTypes).map((i, indexI) => (
                      <option key={indexI} value={i}>{this.props.intl.formatMessage(this.fieldTypes[i])}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-meiddle'>
                <label className='h5 bold'>
                  <FormattedMessage
                    id='form-widget.components--input-form.field-required.label'
                    defaultMessage='Obrigatório'
                  />
                </label>
              </div>
              <div className='col-9 table-cell'>
                <input
                  id={`required-true-${uid}`}
                  type='radio'
                  name={`required-${uid}`}
                  value='true'
                  checked={this.state.required === 'true'}
                  onChange={this.handleRequiredChange.bind(this)}
                />
                <label className='ml1 mr2' htmlFor={`required-true-${uid}`}>
                  <FormattedMessage
                    id='form-widget.components--input-form.field-required.radio.yes.label'
                    defaultMessage='Sim'
                  />
                </label>
                <input
                  id={`required-false-${uid}`}
                  type='radio'
                  name={`required-${uid}`}
                  value='false'
                  checked={this.state.required === 'false'}
                  onChange={this.handleRequiredChange.bind(this)}
                />
                <label className='ml1' htmlFor={`required-false-${uid}`}>
                  <FormattedMessage
                    id='form-widget.components--input-form.field-required.radio.no.label'
                    defaultMessage='Não'
                  />
                </label>
              </div>
            </div>
          </div>

          <div className='col col-6 px3'>
            <div>
              <button
                disabled={!canMoveUp}
                className='btn btn-no-focus hover'
                style={{ backgroundColor: 'white', color: '#bbb' }}
                onClick={this.handleMoveUp.bind(this)}
              >
                <i className='fa fa-chevron-up mr1' />
                <FormattedMessage
                  id='form-widget.components--input-form.button-move-up'
                  defaultMessage='Mover para cima'
                />
              </button>
            </div>

            <div>
              <button
                disabled={!canMoveDown}
                className='btn btn-no-focus hover'
                style={{ backgroundColor: 'white', color: '#bbb' }}
                onClick={this.handleMoveDown.bind(this)}
              >
                <i className='fa fa-chevron-down mr1' />
                <FormattedMessage
                  id='form-widget.components--input-form.button-move-down'
                  defaultMessage='Mover para baixo'
                />
              </button>
            </div>

            <div>
              <button
                className='btn btn-no-focus hover'
                style={{ backgroundColor: 'white', color: '#bbb' }}
                onClick={this.handleRemove.bind(this)}
              >
                <i className='fa fa-trash mr1' />
                <FormattedMessage
                  id='form-widget.components--input-form.button-remove'
                  defaultMessage='Remover'
                />
              </button>
            </div>

            <div className='mt1 ml2'>
              <button
                className='btn white caps bg-darken-3 p2 mr2 rounded'
                onClick={this.handleCancel.bind(this)}
              >
                <FormattedMessage
                  id='form-widget.components--input-form.button-cancel'
                  defaultMessage='Cancelar'
                />
              </button>
              <button
                disabled={this.state.loading}
                className='btn white caps bg-pagenta p2 mr2 rounded'
                onClick={this.handleSave.bind(this)}
              >
                {this.state.loading
                  ? (
                    <FormattedMessage
                      id='form-widget.components--input-form.button-save.saving'
                      defaultMessage='Salvando...'
                    />
                  ) : (
                    <FormattedMessage
                      id='form-widget.components--input-form.button-save.default'
                      defaultMessage='Salvar'
                    />
                  )
                }
              </button>
            </div>
          </div>
        </div>

        <div
          className='fixed top-0 right-0 bottom-0 left-0 z3'
          onClick={this.handleOverlayClick.bind(this)}
        />
      </div>
    )
  }
}

InputForm.propTypes = {
  intl: intlShape.isRequired
}

export default connect()(injectIntl(InputForm))
