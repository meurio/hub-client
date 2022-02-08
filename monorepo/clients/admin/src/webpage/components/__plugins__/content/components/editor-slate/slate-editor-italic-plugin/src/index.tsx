//
// Rendering
//
import ItalicMark from './ItalicMark'

//
// Keyboard
//
import ItalicKeyboardShortcut from './ItalicKeyboardShortcut'

//
// External
//
import * as ItalicUtils from './ItalicUtils'
import ItalicButton from './ItalicButton'


const ItalicPlugin = (): any => ({
  onKeyDown: ItalicKeyboardShortcut,
})

export {
  ItalicPlugin,
  ItalicMark,
  ItalicKeyboardShortcut,
  ItalicUtils,
  ItalicButton,
}
