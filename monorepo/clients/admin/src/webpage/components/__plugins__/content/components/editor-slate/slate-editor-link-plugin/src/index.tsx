//
// Rendering
//
import LinkButton from './LinkButton'
//
// Keyboard
//
import LinkKeyboardShortcut from './LinkKeyboardShortcut'
import LinkNode from './LinkNode'
//
// External
//
import * as LinkUtils from './LinkUtils'




const LinkPlugin = (): any => ({
  onKeyDown: LinkKeyboardShortcut,
})

export {
  LinkPlugin,
  LinkNode,
  LinkKeyboardShortcut,
  LinkUtils,
  LinkButton,
}
