import React from 'react'
import classnames from 'classnames'

import FontFamilyList from './FontFamilyList'
import { fontFamilyMarkStrategy, hasMark, getMark } from './FontFamilyUtils'


// eslint-disable-next-line react/prop-types
const FontFamilyDropdown = ({ value, onChange, className, style }) => {
  let fontFamilyDefault = 0
  if (hasMark(value)) {
    fontFamilyDefault = getMark(value).data.get('fontFamilyIndex')
  }
  return (
    <select
      className={classnames(className)}
      style={style}
      onChange={({ target: { value: fontFamilyIndex } }) => {
        onChange(fontFamilyMarkStrategy({ value, fontFamilyIndex }))
      }}
      value={fontFamilyDefault}
    >
      {FontFamilyList.map((font, index) => (
        <option key={`slate-font-family-${index}`} value={index}>
          {font.name}
        </option>
      ))}
    </select>
  )
}

export default FontFamilyDropdown
