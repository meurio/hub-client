import React from 'react'
import { SketchPicker } from 'react-color'
import themes from '../themes'

interface ColorPickerButtonProperties {
  color?: string;
  onRemoveColor: () => void;
  onChangeColor: (color: any) => void;
  focusEditor: () => void;
  className?: string;
  theme?: string;
}

interface ColorPickerButtonState {
  showColorPicker: boolean;
  color?: any;
}

class ColorPickerButton extends React.Component<ColorPickerButtonProperties, ColorPickerButtonState> {
  constructor(props) {
    super(props)
    this.state = { showColorPicker: false }
  }

  componentWillReceiveProps(nextProps) {
    const { color } = nextProps
    if (this.props.color !== color) {
      this.setState({ color })
    }
  }

  toggleColorPicker(e) {
    this.setState({ showColorPicker: !this.state.showColorPicker })
  }

  handleChange(color) {
    const { onChangeColor } = this.props
    this.setState({ color: color.rgb })
    onChangeColor(this.state.color)
  }

  handleChangeColor(color) {
    this.setState({ showColorPicker: false })
    this.props.focusEditor()
  }

  render() {
    const { showColorPicker, color } = this.state
    const { className, theme } = this.props

    const presetColors = theme ? themes[theme] : []

    const colorPickerProps: any = {
      color,
      presetColors,
      onChangeComplete: this.handleChange.bind(this)
    }

    return (
      <div>
        <button type='button' className={className} onClick={this.toggleColorPicker.bind(this)}>
          <i className='fa fa-eyedropper' />
        </button>
        {(showColorPicker ? (
          <div className='absolute left-0'>
            <SketchPicker {...colorPickerProps} />
            <button
              type="button"
              className='btn bg-darken-4 white col-12 rounded-bottom'
              onClick={this.handleChangeColor.bind(this)}
            >
              Fechar
            </button>
          </div>
        ) : null)}
      </div>
    )
  }
}

export default ColorPickerButton
