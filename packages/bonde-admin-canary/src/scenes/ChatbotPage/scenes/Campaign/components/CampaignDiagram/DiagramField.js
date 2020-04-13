import React from 'react'
import PropTypes from 'prop-types'
import {
  DiagramApplication,
  DiagramProvider,
  Layer,
  ActionMessageModel,
  ReplyMessageModel,
  TextMessageModel
} from 'bonde-diagram'
import { Icon, Title } from 'bonde-styleguide'
import * as DiagramStyleguide from 'bonde-styleguide/dist/components/diagram'
import Toolbar, { Button as ToolbarButton } from './Toolbar'
import AddReply from './AddReply'
import ZoomButton from './ZoomButton'

const CustomReplyUI = {
  ...DiagramStyleguide.MessageWithReplyUI,
  addReply: AddReply
}

class DiagramField extends React.Component {
  constructor (props) {
    super(props)
    this.app = new DiagramApplication({
      action: DiagramStyleguide.MessageActionUI,
      message: DiagramStyleguide.MessageUI,
      reply: CustomReplyUI
    }, this.handleChange.bind(this))
    // check default value received on Field
    const value = this.getFormValue()
    if (value) {
      this.deserialize(value)
    }
  }

  getFormValue () {
    const { input, defaultValue } = this.props
    if (input.value) {
      try {
        JSON.parse(input.value)
      } catch (e) {
        return JSON.parse(defaultValue)
      }
    }
    return input.value || defaultValue ? JSON.parse(input.value || defaultValue) : undefined
  }

  setFormValue (value) {
    const { input } = this.props
    input.onChange(JSON.stringify(value))
  }

  serialize () {
    return this.app.getActiveDiagram().serialize()
  }

  deserialize (value) {
    this.app
      .getActiveDiagram()
      .deserializeModel(value, this.app.getDiagramEngine())
  }

  handleChange (evt) {
    const value = this.serialize()
    this.setFormValue(value)
  }

  handleCreateMessage (kind, size) {
    // TODO: add translate
    switch (kind) {
      case 'message':
        return new TextMessageModel({
          text: 'Escreva sua mensagem aqui.'
        })
      case 'reply':
        return new ReplyMessageModel({
          text: 'Escreva sua mensagem aqui.',
          replies: ['Texto do botão']
        })
      case 'action':
        // TODO: check validation of actionId
        return new ActionMessageModel({
          text: 'Escreva um texto pedindo e-mail do usuário.',
          validLabel: 'E-mail válido',
          invalidLabel: 'E-mail inválido',
          actionId: Number(window.prompt('Informe o ID do widget de pressao:', 0))
        })
      default:
        // eslint-disable-next-line
        throw new Exception(`Model kind ${model.kind} isnt mapped on diagram.`)
    }
  }

  render () {
    return (
      <DiagramProvider app={this.app}>
        <div style={{ position: 'relative', width: '100%', height: `100%` }}>
          <Toolbar>
            <ToolbarButton kind='message'>
              <Icon size={30} name='ballon-text' />
              <Title.H5 align='center'>MSG</Title.H5>
            </ToolbarButton>
            <ToolbarButton kind='reply'>
              <Icon size={30} name='ballon' />
              <Title.H5 align='center'>BOTÃO</Title.H5>
            </ToolbarButton>
            <ToolbarButton kind='action'>
              <Icon size={30} name='user' />
              <Title.H5 align='center'>AÇÃO</Title.H5>
            </ToolbarButton>
          </Toolbar>
          <Layer
            background='rgba(255,255,255,0.5)'
            color='rgba(0,0,0,0.05)'
            onCreateMessage={this.handleCreateMessage.bind(this)} />
          <ZoomButton />
        </div>
      </DiagramProvider>
    )
  }
}

DiagramField.propTypes = {
  defaultValue: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  })
}

export default DiagramField
