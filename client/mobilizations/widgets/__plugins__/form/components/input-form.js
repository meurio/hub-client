import React, { Component } from 'react'
import $ from 'jquery'

// Parent module dependencies
import { actions as WidgetActions } from '~mobilizations/widgets'

class InputForm extends Component {
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

  componentWillAppear () {
    const { uid } = this.props
    $('#form-' + uid).hide()
    $('#form-' + uid).slideDown(200)
  }

  componentWillReceiveProps (nextProps) {
    const { uid } = this.props
    if (this.state.loading && this.props.field != nextProps.field) {
      this.setState({loading: false})
      $('#form-' + uid).slideUp(200, () => {
        this.props.onClose && this.props.onClose()
      })
    }
  }

  dirty () {
    const { field } = this.props
    return field.kind != this.state.kind ||
           field.label != this.state.label ||
           field.placeholder != this.state.placeholder ||
           field.required != this.state.required
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
    dispatch(WidgetActions.asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, fields: newFields }
    }))
  }

  handleCancel (event) {
    event.preventDefault()
    event.stopPropagation()
    const { field, uid } = this.props
    this.setState({
      kind: field.kind,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required
    })
    $('#form-' + uid).slideUp(200, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  handleSave (event) {
    event.preventDefault()
    event.stopPropagation()
    const { fields } = this.props.widget.settings
    const newFields = fields.map((field) => {
      if (field.uid == this.props.field.uid) {
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
      if (index + 1 < fields.length && fields[index + 1].uid == this.props.field.uid) {
        return this.props.field
      } else if (field.uid == this.props.field.uid) {
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
      if (index > 0 && fields[index - 1].uid == this.props.field.uid) {
        return this.props.field
      } else if (field.uid == this.props.field.uid) {
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
    if (confirm('Você tem certeza que quer remover este campo?')) {
      const { fields } = this.props.widget.settings
      const newFields = fields.filter(field =>
        field.uid != this.props.field.uid
      )
      this.updateSettings(newFields)
    }
  }

  handleOverlayClick (event) {
    event.preventDefault()
    event.stopPropagation()
    const dirty = this.dirty()
    if (!dirty || (dirty && confirm('Ao sair sem salvar você perderá suas modificações. Deseja sair sem salvar?'))) {
      this.handleCancel(event)
    }
  }

  render () {
    const { canMoveUp, canMoveDown, uid } = this.props
    return (
      <div>
        <div
          id={`form-${uid}`}
          className='p2 mb3 bg-white border border-gray94 clearfix relative rounded z5'
        >
          <div className='col col-6'>
            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-middle'>
                <label className='h5 bold'>
                  Título do campo
                </label>
              </div>
              <div className='col-9 table-cell'>
                <input
                  className='input m0'
                  placeholder='Ex: Email'
                  type='text'
                  value={this.state.label}
                  onChange={::this.handleLabelChange}
                />
              </div>
            </div>

            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-middle'>
                <label className='h5 bold'>
                  Texto de ajuda
                </label>
              </div>
              <div className='col-9 table-cell'>
                <input
                  className='input m0'
                  placeholder='Ex: Insira aqui o seu email'
                  type='text'
                  value={this.state.placeholder}
                  onChange={::this.handlePlaceholderChange}
                />
              </div>
            </div>

            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-middle'>
                <label className='h5 bold'>
                  Tipo de campo
                </label>
              </div>
              <div className='col-9 table-cell'>
                <select
                  className='select m0'
                  onChange={::this.handleKindChange}
                  value={this.state.kind}>
                  <option value='text'>Texto</option>
                  <option value='email'>E-mail</option>
                  <option value='number'>Número</option>
                  <option value='dropdown'>Dropdown &#9733;</option>
                  <option value='greetings'>Saudação &#9733;</option>
                </select>
              </div>
            </div>

            <div className='table col-12 mb2'>
              <div className='col-3 table-cell align-meiddle'>
                <label className='h5 bold'>
                  Obrigatório
                </label>
              </div>
              <div className='col-9 table-cell'>
                <input
                  id={`required-true-${uid}`}
                  type='radio'
                  name={`required-${uid}`}
                  value='true'
                  checked={this.state.required == 'true'}
                  onChange={::this.handleRequiredChange}
                />
                <label className='ml1 mr2' htmlFor={`required-true-${uid}`}>Sim</label>
                <input
                  id={`required-false-${uid}`}
                  type='radio'
                  name={`required-${uid}`}
                  value='false'
                  checked={this.state.required == 'false'}
                  onChange={::this.handleRequiredChange}
                />
                <label className='ml1' htmlFor={`required-false-${uid}`}>Não</label>
              </div>
            </div>
          </div>

          <div className='col col-6 px3'>
            <div>
              <button
                disabled={!canMoveUp}
                className='btn btn-no-focus hover'
                style={{ backgroundColor: 'white' }}
                onClick={::this.handleMoveUp}
              >
                <i className='fa fa-chevron-up mr1' />
                Mover para cima
              </button>
            </div>

            <div>
              <button
                disabled={!canMoveDown}
                className='btn btn-no-focus hover'
                style={{ backgroundColor: 'white' }}
                onClick={::this.handleMoveDown}
              >
                <i className='fa fa-chevron-down mr1' />
                Mover para baixo
              </button>
            </div>

            <div>
              <button
                className='btn btn-no-focus hover'
                style={{ backgroundColor: 'white' }}
                onClick={::this.handleRemove}
              >
                <i className='fa fa-trash mr1' />
                Remover
              </button>
            </div>

            <div className='mt1 ml2'>
              <button
                className='btn white caps bg-darken-3 p2 mr2 rounded'
                onClick={::this.handleCancel}
              >
                Cancelar
              </button>
              <button
                disabled={this.state.loading}
                className='btn white caps bg-pagenta p2 mr2 rounded z5'
                onClick={::this.handleSave}
              >
                {this.state.loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>

        <div
          className='fixed top-0 right-0 bottom-0 left-0 z4'
          onClick={::this.handleOverlayClick}
        />
      </div>
    )
  }
}

export default InputForm
