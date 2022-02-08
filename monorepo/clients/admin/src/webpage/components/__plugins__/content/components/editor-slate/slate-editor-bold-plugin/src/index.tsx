//
// Rendering
//
import BoldButton from './BoldButton'
//
// Keyboard
//
import BoldKeyboardShortcut from './BoldKeyboardShortcut'
import BoldMark from './BoldMark'
//
// External
//
import * as BoldUtils from './BoldUtils'

const BoldPlugin = (): any => ({
  onKeyDown: BoldKeyboardShortcut,
})

export {
  BoldPlugin,
  BoldMark,
  BoldKeyboardShortcut,
  BoldUtils,
  BoldButton,
}
