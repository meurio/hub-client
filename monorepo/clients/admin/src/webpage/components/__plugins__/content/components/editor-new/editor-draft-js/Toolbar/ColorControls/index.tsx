import classnames from 'classnames'
import React from 'react'
import EditorUtils from '../EditorUtils'
import ColorPickerButton from './ColorPickerButton'

interface ColorControlsProperties {
  editorState: any;
  setEditorState: (editorState: any) => void
  focusEditor: () => void;
  buttonClassName?: string;
  theme?: string;
}

interface ColorControlsState {
  color?: string;
}

export default class ColorControls extends React.Component<ColorControlsProperties, ColorControlsState> {
  constructor(props) {
    super(props)
    this.state = { color: undefined }
  }

  componentWillReceiveProps(nextProps) {
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

  onChangeColor(color) {
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

  hasColorStyle() {
    const { editorState } = this.props
    const hasStyle = editorState.getCurrentInlineStyle().filter(style => style.startsWith('color'))
    return hasStyle.size > 0 ? 'active' : null
  }

  render() {
    const { buttonClassName, theme } = this.props

    return (
      <div className='colorControls'>
        <ColorPickerButton
          theme={theme}
          className={classnames(buttonClassName, this.hasColorStyle())}
          color={this.state.color}
          onRemoveColor={() => { }}
          onChangeColor={this.onChangeColor.bind(this)}
          focusEditor={this.props.focusEditor}
        />
      </div>
    )
  }
}

export const customStyleFn = (style) => {
  const output: any = {}
  const color = style.filter(value => value.startsWith('color')).last()
  if (color) {
    output.color = color
      .replace('color:', '')
      .replace(';', '')
      .trim()
  }
  return output
}
