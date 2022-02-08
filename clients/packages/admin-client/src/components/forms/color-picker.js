import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import ColorPickerTheme from 'components/color-picker'

class ColorPicker extends Component {
  getRGBA (color) {
    if (typeof color === 'object') {
      const { rgb: { r, g, b, a } } = color
      return `rgba(${r},${g},${b},${a})`
    } else if (typeof color === 'string') {
      const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      const rgba = color.match(regex)
      if (rgba) {
        return { r: rgba[1], g: rgba[2], b: rgba[3], a: rgba[4] }
      }
    }
    return color
  }

  render () {
    const formGroup = this.context.$formGroup
    const { value, onChange } = formGroup || {}
    const { className, ...props } = this.props

    return (
      <div className={classnames('mt1 mb3', className)}>
        <ColorPickerTheme
          {...props}
          onChangeColor={color => onChange(this.getRGBA(color))}
          color={this.getRGBA(value)}
        />
      </div>
    )
  }
}

ColorPicker.contextTypes = {
  $formGroup: PropTypes.object
}

ColorPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  theme: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default ColorPicker
