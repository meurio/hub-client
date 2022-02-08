//
// Rendering
//
import AlignmentButtonBar from './AlignmentButtonBar'
import AlignmentCenterButton from './AlignmentCenterButton'
//
// Keyboard
//
import AlignmentKeyboardShortcut from './AlignmentKeyboardShortcut'
import AlignmentLeftButton from './AlignmentLeftButton'
import AlignmentNode from './AlignmentNode'
import AlignmentRightButton from './AlignmentRightButton'
//
// External
//
import * as AlignmentUtils from './AlignmentUtils'

const AlignmentPlugin = (): any => ({
  onKeyDown: AlignmentKeyboardShortcut,
})

export {
  AlignmentPlugin,
  AlignmentNode,
  AlignmentKeyboardShortcut,
  AlignmentUtils,
  AlignmentButtonBar,
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
}
