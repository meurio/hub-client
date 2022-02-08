import { keyboardEvent } from '../../slate-editor-utils/src'
import { fontSizeDecrease, fontSizeIncrease } from './FontSizeUtils'


const FontSizeKeyboardShortcut = (event, change, editor, options) => {
  const { changeState } = editor.props
  const { initialFontSize } = options

  const moduleShift = keyboardEvent.isMod(event) && event.shiftKey
  const isDecrease = moduleShift && event.key === ','
  const isIncrease = moduleShift && event.key === '.'

  const fontSize = initialFontSize

  if (isDecrease) return fontSizeDecrease({ change, fontSize, changeState })
  if (isIncrease) return fontSizeIncrease({ change, fontSize, changeState })

}

export default FontSizeKeyboardShortcut
