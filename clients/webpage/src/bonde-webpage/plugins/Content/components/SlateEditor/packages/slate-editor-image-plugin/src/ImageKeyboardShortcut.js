import { keyboardEvent } from '../../slate-editor-utils/src'
import { forceClickUploadButton } from './ImageUtils'

const ImageKeyboardShortcut = (event, change, editor) => {
  if (keyboardEvent.isMod(event) && event.shiftKey && event.key === 'i') {
    return forceClickUploadButton(editor)
  }
  return
}

export default ImageKeyboardShortcut
