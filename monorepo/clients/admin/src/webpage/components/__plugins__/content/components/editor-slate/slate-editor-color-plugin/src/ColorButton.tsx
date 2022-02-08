import classnames from 'classnames'
import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Button } from '../../slate-editor-components/src'
import DraggableColorPicker from './DraggableColorPicker'


// FIXME: Needs to handle assets files to work with SSR
import('./ColorButton.css')

interface ColorButtonProperties {
  className?: string;
  style?: any;
  value?: any;
  changeState?: any;
  outerState?: any;
  type?: any;
  initialState?: any;
  pickerDefaultPosition?: any
}

class ColorButton extends React.Component<ColorButtonProperties> {
  UNSAFE_componentWillMount() {
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
          onClick={e => changeState({ value, color: { ...color, showPicker: !showPicker } })}
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
