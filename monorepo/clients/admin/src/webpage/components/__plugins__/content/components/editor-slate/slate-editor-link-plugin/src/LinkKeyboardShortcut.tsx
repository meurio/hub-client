import { keyboardEvent } from '../../slate-editor-utils/src'
import { insertLinkStrategy } from './LinkUtils'


const LinkKeyboardShortcut = (event, change) => {
  if (keyboardEvent.isMod(event) && event.key === 'k') return insertLinkStrategy(change)

}

export default LinkKeyboardShortcut
