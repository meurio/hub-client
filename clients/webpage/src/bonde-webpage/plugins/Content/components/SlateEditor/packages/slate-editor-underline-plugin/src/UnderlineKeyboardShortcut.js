import { keyboardEvent } from '../../slate-editor-utils/src'
import { underlineMarkStrategy } from './UnderlineUtils'


const UnderlineKeyboardShortcut = (event, change) => {
  if (keyboardEvent.isMod(event) && event.key === 'u') return underlineMarkStrategy(change)
  return
}

export default UnderlineKeyboardShortcut
