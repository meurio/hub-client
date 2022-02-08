/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import DraggableColorPicker from './DraggableColorPicker'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./ColorButton.css')

class ColorButton extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { changeState, outerState: { color }, initialState } = this.props

    // Set initial state received as a prop
    if (!color) changeState({ color: initialState })
  }

  render() {
    const { className, style, value, changeState, outerState: { color }, type } = this.props

    // If still does not have the initial state, do not render button.
    if (!color) return null

    const { showPicker } = color

    return (
      <div className="slate-color-plugin--toolbar">
        <Button
          style={style}
          type={type}
          onClick={() => changeState({ value, color: { ...color, showPicker: !showPicker } })}
          className={classnames(
            'slate-color-plugin--button',
            className,
            { active: showPicker },
          )}
        >
          <FontAwesome name="eyedropper" />
        </Button>
        {showPicker && <DraggableColorPicker {...this.props} />}
      </div>
    )
  }
}

export default ColorButton
