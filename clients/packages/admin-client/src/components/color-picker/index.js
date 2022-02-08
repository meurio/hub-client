import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'

import themes from './themes'
import * as ColorPickerActions from './actions'

export const ColorPicker = ({
  className,
  theme,
  showColorPicker,
  onChangeColor,
  selectedColor,
  color
}) => {
  const hasTheme = theme && themes[theme]
  const colorStrategy = selectedColor || (hasTheme ? themes[theme][0] : '#333')

  return !showColorPicker ? null : (
    <div className={classnames('color-picker-container', className)}>
      <SketchPicker
        color={color || colorStrategy}
        onChangeComplete={onChangeColor}
        presetColors={hasTheme ? themes[theme] : []}
      />
    </div>
  )
}

ColorPicker.propTypes = {
  showColorPicker: PropTypes.bool.isRequired,
  onChangeColor: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  theme: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

ColorPicker.defaultProps = {
  showColorPicker: true
}

const mapStateToProps = state => ({
  selectedColor: state.colorPicker.color || '#333'
})

export default connect(mapStateToProps, ColorPickerActions)(ColorPicker)
