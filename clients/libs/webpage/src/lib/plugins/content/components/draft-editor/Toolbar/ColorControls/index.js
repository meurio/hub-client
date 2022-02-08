import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

import EditorUtils from '../EditorUtils'
import ColorPickerButton from './ColorPickerButton'

export default class ColorControls extends Component {
  constructor (props) {
    super(props)
    this.state = { color: null }
  }

  componentWillReceiveProps (nextProps) {
    const { editorState } = nextProps
    if (editorState !== this.props.editorState) {
      const currentStyle = editorState.getCurrentInlineStyle()
      const color = currentStyle.filter(value => value.startsWith('color')).last()
      if (color) {
        this.setState({
          color: color
            .replace('color:')
            .replace(';', '')
            .trim()
        })
      }
    }
  }

  onChangeColor (color) {
    const { editorState, setEditorState } = this.props

    const targetSelection = editorState.getSelection()
    if (!targetSelection.isCollapsed()) {
      const editorStateWithColor = EditorUtils.toggleInlineStyle(
        editorState,
        `color: rgba(${color.r},${color.g},${color.b},${color.a});`
      )
      setEditorState(editorStateWithColor)
    }
  }

  hasColorStyle () {
    const { editorState } = this.props
    const hasStyle = editorState.getCurrentInlineStyle().filter(style => style.startsWith('color'))
    return hasStyle.size > 0 ? 'active' : null
  }

  render () {
    const { buttonClassName, theme } = this.props

    return (
      <div className='colorControls'>
        <ColorPickerButton
          theme={theme}
          className={classnames(buttonClassName, this.hasColorStyle())}
          color={this.state.color}
          onRemoveColor={() => {}}
          onChangeColor={this.onChangeColor.bind(this)}
          focusEditor={this.props.focusEditor}
        />
      </div>
    )
  }
}

ColorControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  theme: PropTypes.string
}

export const customStyleFn = (style) => {
  const output = {}
  const color = style.filter(value => value.startsWith('color')).last()
  if (color) {
    output.color = color
      .replace('color:', '')
      .replace(';', '')
      .trim()
  }
  return output
}
