import { keyboardEvent } from '../../slate-editor-utils/src'
import { boldMarkStrategy } from './BoldUtils'

const BoldKeyboardShortcut = (event, change) => {
  if (keyboardEvent.isMod(event) && event.key === 'b') return boldMarkStrategy(change)
  return
}

export default BoldKeyboardShortcut
