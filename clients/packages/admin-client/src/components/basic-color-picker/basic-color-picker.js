import PropTypes from 'prop-types'
import React from 'react'
import BasicColorPickerItem from './basic-color-picker-item'

const BasicColorPicker = ({ colors, selected, onSelectColor }) => (
  <div>
    {colors && colors.map((color, indexColor) => (
      <BasicColorPickerItem
        key={indexColor}
        color={color}
        isSelected={color === selected}
        onSelectColor={onSelectColor}
      />
    ))}
  </div>
)

BasicColorPicker.propTypes = {
  colors: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onSelectColor: PropTypes.func
}

export default BasicColorPicker
