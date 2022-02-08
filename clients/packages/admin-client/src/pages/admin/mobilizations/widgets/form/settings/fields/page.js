import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { Loading } from 'components/await'
import { Button, DivFloat } from 'ux/components'
import Form from 'mobilizations/widgets/__plugins__/form/components'

class FormSettingsFieldsPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = { loading: false, hasNewField: false }
  }

  componentWillReceiveProps (nextProps) {
    const { widget } = this.props
    if (this.state.loading && widget !== nextProps.widget) {
      this.setState({ loading: false, hasNewField: true })
    } else {
      this.setState({ hasNewField: false })
    }
  }

  handleAddTextField () {
    this.addField('text')
  }

  fields () {
    const { widget: { settings } } = this.props
    return (settings && settings.fields ? settings.fields : [])
  }

  addField (kind) {
    const { widget, asyncWidgetUpdate } = this.props
    const { settings } = widget
    const fields = this.fields()

    this.setState({ loading: true })
    asyncWidgetUpdate({
      ...widget,
      settings: {
        ...settings,
        fields: [
          ...fields,
          {
            uid: `field-${Date.now().toString()}-${Math.floor((Math.random() * 100) + 1)}`,
            kind: 'text',
            label: '',
            placeholder: '',
            required: 'false'
          }
        ]
      }
    })
  }

  renderFields () {
    const { widget, ...props } = this.props
    return (
      <div>
        <DivFloat>
          <Button onClick={this.handleAddTextField.bind(this)}>
            <FormattedMessage
              id='page--form-widget-fields.add-button'
              defaultMessage='Adicionar um campo'
            />
          </Button>
        </DivFloat>
        <p className='h5 mb3 darkengray'>
          {this.fields().length
            ? (
              <FormattedMessage
                id='page--form-widget-fields.helper-text.still-empty'
                defaultMessage={
                  'Seu formulário ainda não possui nenhum campo. Clique abaixo para começar a ' +
                  'adicionar campos.'
                }
              />
            ) : (
              <FormattedMessage
                id='page--form-widget-fields.helper-text.manage-fields'
                defaultMessage={
                  'Adicione, remova, edite e ordene os campos do formulário de acordo com as ' +
                  'necessidades da sua ação.'
                }
              />
            )
          }
        </p>

        <Form
          {...props}
          widget={widget}
          configurable
          hasNewField={this.state.hasNewField}
        />
        {this.renderLoading()}
      </div>
    )
  }

  renderLoading () {
    const { loading } = this.state
    const { widget } = this.props
    return loading || widget === undefined ? <Loading /> : null
  }

  render () {
    const { widget } = this.props
    return (widget !== undefined ? this.renderFields() : this.renderLoading())
  }
}

FormSettingsFieldsPage.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default FormSettingsFieldsPage
