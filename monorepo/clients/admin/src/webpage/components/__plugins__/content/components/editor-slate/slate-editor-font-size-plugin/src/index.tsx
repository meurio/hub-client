// Rendering
import FontSizeInput from './FontSizeInput'
// Keyboard
import FontSizeKeyboardShortcut from './FontSizeKeyboardShortcut'
import FontSizeMark from './FontSizeMark'
// External
import * as FontSizeUtils from './FontSizeUtils'
// Validation
import ValidatePluginOptions from './ValidatePluginOptions'




const FontSizePlugin = (options): any => {
  ValidatePluginOptions(options)

  return {
    onKeyDown(event, change, editor): any {
      return FontSizeKeyboardShortcut(event, change, editor, options)
    }
  }
}

export {
  FontSizePlugin,
  FontSizeMark,
  FontSizeKeyboardShortcut,
  FontSizeUtils,
  FontSizeInput,
}
