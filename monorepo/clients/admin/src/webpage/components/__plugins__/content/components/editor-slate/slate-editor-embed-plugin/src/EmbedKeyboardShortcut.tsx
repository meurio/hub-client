import { keyboardEvent } from '../../slate-editor-utils/src'
import { appendEmbed } from './EmbedUtils'

const EmbedKeyboardShortcut = (event: any, change: any) => {
  if (keyboardEvent.isMod(event) && event.key === 'e') return appendEmbed(change)
}

export default EmbedKeyboardShortcut
