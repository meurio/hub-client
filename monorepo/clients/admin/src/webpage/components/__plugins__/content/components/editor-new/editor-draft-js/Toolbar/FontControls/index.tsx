import React from 'react'
import EditorUtils from '../EditorUtils'
import SelectFontFamily from './SelectFontFamily'
import './styles.scss'

interface FontControlsProperties {
  editorState: any;
  setEditorState: (editorState: any) => void
  focusEditor: () => void;
  buttonClassName?: string;
  popoverClassName?: string;
  initialValue: {
    fontSize: number;
    fontFamily: string;
  }
}

interface FontControlsState {
  fontSize: number;
  fontFamily: string;
}

export default class FontControls extends React.Component<FontControlsProperties, FontControlsState> {
  constructor(props) {
    super(props)
    this.state = { ...this.props.initialValue }
  }

  componentWillReceiveProps(nextProps) {
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

  handleChangeSize(e) {
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

  handleChangeFont(e) {
    const { editorState, setEditorState } = this.props
    const fontFamily = e.target.value

    const editorStateWithFontFamily = EditorUtils.toggleInlineStyle(
      editorState,
      `font-family: ${fontFamily};`
    )
    setEditorState(editorStateWithFontFamily)
    this.setState({ fontFamily })
  }

  handleMouseOut() {
    this.props.focusEditor()
  }

  render(): React.ReactElement {
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
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this.handleChangeFont.bind(this)}
          value={this.state.fontFamily}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseOut={this.handleMouseOut.bind(this)}
        />
      </div>
    )
  }
}

export const customStyleFn = (style) => {
  const output: any = {}
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
