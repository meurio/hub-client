import { keyboardEvent } from '../../slate-editor-utils/src'
import { appendEmbed } from './EmbedUtils'

const EmbedKeyboardShortcut = (event, change) => {
  if (keyboardEvent.isMod(event) && event.key === 'e') return appendEmbed(change)
  return
}

export default EmbedKeyboardShortcut
