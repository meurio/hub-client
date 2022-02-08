//
// Rendering
//
import StrikethroughButton from './StrikethroughButton'
//
// Keyboard
//
import StrikethroughKeyboardShortcut from './StrikethroughKeyboardShortcut'
import StrikethroughMark from './StrikethroughMark'
//
// External
//
import * as StrikethroughUtils from './StrikethroughUtils'

const StrikethroughPlugin = (): any => ({
  onKeyDown: StrikethroughKeyboardShortcut,
})

export {
  StrikethroughPlugin,
  StrikethroughMark,
  StrikethroughKeyboardShortcut,
  StrikethroughUtils,
  StrikethroughButton,
}
