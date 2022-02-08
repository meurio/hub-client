//
// Rendering
//
import EmbedNode from './EmbedNode'

//
// Keyboard
//
import EmbedKeyboardShortcut from './EmbedKeyboardShortcut'

//
// External
//
import * as EmbedUtils from './EmbedUtils'
import EmbedButton from './EmbedButton'


const EmbedPlugin = (): any => ({
  onKeyDown: EmbedKeyboardShortcut,
})

export {
  EmbedPlugin,
  EmbedNode,
  EmbedKeyboardShortcut,
  EmbedUtils,
  EmbedButton,
}
