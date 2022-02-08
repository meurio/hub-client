import PropTypes from 'prop-types'
import React from 'react'

import { Loading } from 'components/await'
import Editor from 'components/editor-draft-js'
if (require('exenv').canUseDOM) require('./index.scss')

class EditorNew extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      editing: false,
      content: props.widget.settings.content,
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading && this.props.widget.settings.content !== nextProps.widget.settings.content) {
      this.setState({ loading: false })
    }
  }

  renderLoading () {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  handleSave (rawContent) {
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

  render () {
    const { editable, mobilization, widget: { settings } } = this.props
    const { body_font: bodyFont } = mobilization

    const theme = (
      mobilization && mobilization.color_scheme
        ? mobilization.color_scheme.replace('-scheme', '')
        : null
    )

    let value
    try {
      value = JSON.parse(settings.content)
    } catch (e) {
      value = settings.content
    }

    return (
      <div className='widgets--content-plugin widget editor-new' style={{ fontFamily: bodyFont }}>
        <Editor
          value={value}
          theme={theme}
          readOnly={!editable}
          handleSave={this.handleSave.bind(this)}
          handleDelete={this.props.handleDelete}
        />
      </div>
    )
  }
}

EditorNew.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  update: PropTypes.func,
  handleDelete: PropTypes.func
}

export default EditorNew
