//
// Rendering
//
import UnderlineMark from './UnderlineMark'

//
// Keyboard
//
import UnderlineKeyboardShortcut from './UnderlineKeyboardShortcut'

//
// External
//
import * as UnderlineUtils from './UnderlineUtils'
import UnderlineButton from './UnderlineButton'


const UnderlinePlugin = (): any => ({
  onKeyDown: UnderlineKeyboardShortcut,
})

export {
  UnderlinePlugin,
  UnderlineMark,
  UnderlineKeyboardShortcut,
  UnderlineUtils,
  UnderlineButton,
}
