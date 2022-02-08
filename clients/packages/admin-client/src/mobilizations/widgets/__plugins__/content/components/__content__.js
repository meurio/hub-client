import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import { EditorOld, EditorNew, EditorSlate } from '../components'

export class Content extends Component {
  constructor (props) {
    super(props)
    this.state = { forceRenderNewEditor: false }
  }

  handleForceRender () {
    this.setState({ forceRenderNewEditor: true })
  }

  deleteWidget () {
    const message = this.props.intl.formatMessage({
      id: 'c--content-widget.delete-widget.confirm.message',
      defaultMessage: 'Deseja remover o widget?'
    })
    if (window.confirm(message)) {
      this.props.update({
        ...this.props.widget,
        settings: undefined,
        kind: 'draft'
      })
    }
  }

  render () {
    const { widget: { settings }, editable } = this.props

    try {
      // If parse content is RebooEditor
      const content = JSON.parse(settings.content)
      return content.entityMap ? (
        <EditorNew
          {...this.props}
          handleDelete={this.deleteWidget.bind(this)}
        />
      ) : (
        <EditorSlate
          {...this.props}
          content={settings.content}
          readOnly={!editable}
          handleSave={value => {
            const raw = JSON.stringify(value.toJSON())

            if (settings.content !== raw) {
              const { update, widget } = this.props
              update({
                ...widget,
                settings: { content: raw }
              })
            }
          }}
          handleDelete={this.deleteWidget.bind(this)}
        />
      )
    } catch (e) {
      // Else is old editor
      if (this.state.forceRenderNewEditor) {
        return (
          <EditorNew
            {...this.props}
            handleDelete={this.deleteWidget.bind(this)}
          />
        )
      } else {
        return (
          <EditorOld
            handleForceRender={this.handleForceRender.bind(this)}
            {...this.props}
          />
        )
      }
    }
  }
}

Content.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onCancelEdit: PropTypes.func,
  update: PropTypes.func,
  intl: intlShape.isRequired
}

export default injectIntl(Content)
