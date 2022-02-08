//
// Rendering
//
import StrikethroughMark from './StrikethroughMark'

//
// Keyboard
//
import StrikethroughKeyboardShortcut from './StrikethroughKeyboardShortcut'

//
// External
//
import * as StrikethroughUtils from './StrikethroughUtils'
import StrikethroughButton from './StrikethroughButton'


const StrikethroughPlugin = () => ({
  onKeyDown(...args) {
    return StrikethroughKeyboardShortcut(...args)
  },
})

export {
  StrikethroughPlugin,
  StrikethroughMark,
  StrikethroughKeyboardShortcut,
  StrikethroughUtils,
  StrikethroughButton,
}
