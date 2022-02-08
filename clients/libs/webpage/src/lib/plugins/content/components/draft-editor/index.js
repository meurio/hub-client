import React from 'react'
import PropTypes from 'prop-types'
import Editor from './editable-mode'

if (require('exenv').canUseDOM) require('./index.scss')

class EditorNew extends React.Component {

  render () {
    const { decorator, mobilization, widget: { settings } } = this.props
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
        <Editor readOnly value={value} theme={theme} />
      </div>
    )
  }
}

EditorNew.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default EditorNew
