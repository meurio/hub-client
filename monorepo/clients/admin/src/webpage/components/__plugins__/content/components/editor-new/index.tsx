import React from 'react'
import type { Mobilization, Widget } from '../../../../../reducers'
// import { Loading } from '../../../../../../components/await'
import Editor from './editor-draft-js'
import './index.scss'

interface EditorNewProperties {
  mobilization: Mobilization;
  widget: Widget;
  editable: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  update: (widget: Widget) => void
  handleDelete: () => void;
}

interface EditorNewState {
  editing: boolean;
  content: any;
  loading: boolean;  
}

class EditorNew extends React.Component<EditorNewProperties, EditorNewState> {
  constructor(properties, context) {
    super(properties, context)
    this.state = {
      editing: false,
      content: properties.widget.settings.content,
      loading: false
    }
  }

  componentWillReceiveProps(nextProperties) {
    if (this.state.loading && this.props.widget.settings.content !== nextProperties.widget.settings.content) {
      this.setState({ loading: false })
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      )
    }
  }

  handleSave(rawContent) {
    const { widget: { settings } } = this.props

    if (settings.content !== rawContent) {
      const { update, widget } = this.props
      this.setState({ loading: true })

      update({
        ...widget,
        settings: { content: JSON.stringify(rawContent) }
      })
    }
  }

  render() {
    const { editable, mobilization, widget: { settings } } = this.props
    const { body_font: bodyFont } = mobilization

    const theme = (
      mobilization && mobilization.color_scheme
        ? mobilization.color_scheme.replace('-scheme', '')
        : undefined
    )

    let value
    try {
      value = JSON.parse(settings.content)
    } catch {
      value = settings.content
    }

    return (
      <div className='widgets--content-plugin widget editor-new' style={{ fontFamily: bodyFont }}>
        <Editor
          value={value}
          theme={theme}
          readOnly={!editable}
          // eslint-disable-next-line react/jsx-no-bind
          handleSave={this.handleSave.bind(this)}
          handleDelete={this.props.handleDelete}
        />
      </div>
    )
  }
}

export default EditorNew
