import test from 'ava'
import { createEditorContent } from './editable-mode'

test('should return string rawContentState with text passed', t => {
    const text = 'Clique aqui para editar...'
    const strResult = createEditorContent(text)
    const jsonResult = JSON.parse(strResult)

    t.is(jsonResult.blocks.length, 1)
    t.is(jsonResult.blocks[0].text, text)
})
