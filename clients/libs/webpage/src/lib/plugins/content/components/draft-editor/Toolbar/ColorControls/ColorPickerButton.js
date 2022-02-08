import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { SketchPicker } from 'react-color'

import themes from '../themes'

class ColorPickerButton extends Component {
  constructor (props) {
    super(props)
    this.state = { showColorPicker: false }
  }

  componentWillReceiveProps (nextProps) {
    const { color } = nextProps
    if (this.props.color !== color) {
      this.setState({ color })
    }
  }

  toggleColorPicker (e) {
    this.setState({ showColorPicker: !this.state.showColorPicker })
  }

  handleChange (color) {
    const { onChangeColor } = this.props
    this.setState({ color: color.rgb })
    onChangeColor(this.state.color)
  }

  handleChangeColor (color) {
    this.setState({ showColorPicker: false })
    this.props.focusEditor()
  }

  render () {
    const { showColorPicker, color } = this.state
    const { className, theme } = this.props

    const presetColors = theme ? themes[theme] : []

    const colorPickerProps = {
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

ColorPickerButton.propTypes = {
  color: PropTypes.string,
  onRemoveColor: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  className: PropTypes.string,
  theme: PropTypes.string
}

export default ColorPickerButton
