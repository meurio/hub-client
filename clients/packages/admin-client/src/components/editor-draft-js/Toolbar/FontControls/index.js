import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EditorUtils from '../EditorUtils'

import SelectFontFamily from './SelectFontFamily'

if (require('exenv').canUseDOM) require('./styles.scss')

export default class FontControls extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.props.initialValue }
  }

  componentWillReceiveProps (nextProps) {
    const { editorState } = nextProps

    const hasChangeInlineStyle = (
      editorState.getCurrentInlineStyle() !== this.props.editorState.getCurrentInlineStyle()
    )
    if (hasChangeInlineStyle) {
      const currentStyle = editorState.getCurrentInlineStyle()

      const initialValue = {
        ...this.props.initialValue
      }

      const fontSize = currentStyle.filter(value => value.startsWith('font-size')).last()
      if (fontSize) {
        initialValue.fontSize = fontSize
          .replace('font-size:', '')
          .replace('px', '')
          .replace(';', '')
          .trim()
      }

      const fontFamily = currentStyle.filter(value => value.startsWith('font-family')).last()
      if (fontFamily) {
        initialValue.fontFamily = fontFamily
          .replace('font-family:', '')
          .replace(';', '')
          .trim()
      }

      if (initialValue) {
        this.setState({ ...initialValue })
      }
    }
  }

  handleChangeSize (e) {
    const { editorState, setEditorState } = this.props
    const fontSize = e.target.value

    if (fontSize) {
      const editorStateWithFontSize = EditorUtils.toggleInlineStyle(
        editorState,
        `font-size: ${fontSize}px;`
      )
      setEditorState(editorStateWithFontSize)
      this.setState({ fontSize })
    }
  }

  handleChangeFont (e) {
    const { editorState, setEditorState } = this.props
    const fontFamily = e.target.value

    const editorStateWithFontFamily = EditorUtils.toggleInlineStyle(
      editorState,
      `font-family: ${fontFamily};`
    )
    setEditorState(editorStateWithFontFamily)
    this.setState({ fontFamily })
  }

  handleMouseOut () {
    this.props.focusEditor()
  }

  render () {
    return (
      <div className='font-controls'>
        <input
          type='number'
          value={this.state.fontSize}
          onChange={this.handleChangeSize.bind(this)}
          onMouseOut={this.handleMouseOut.bind(this)}
          className='font-controls-size input col col-3 h5 mx1'
        />
        <SelectFontFamily
          onChange={this.handleChangeFont.bind(this)}
          value={this.state.fontFamily}
          onMouseOut={this.handleMouseOut.bind(this)}
        />
      </div>
    )
  }
}

FontControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  initialValue: PropTypes.shape({
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string
  })

}

export const customStyleFn = (style) => {
  const output = {}
  const fontSize = style.filter(value => value.startsWith('font-size')).last()
  if (fontSize) {
    output.fontSize = fontSize
      .replace('font-size:', '')
      .replace(';', '')
      .trim()
  }
  const fontFamily = style.filter(value => value.startsWith('font-family')).last()
  if (fontFamily) {
    output.fontFamily = fontFamily
      .replace('font-family:', '')
      .replace(';', '')
      .trim()
  }
  return output
}
