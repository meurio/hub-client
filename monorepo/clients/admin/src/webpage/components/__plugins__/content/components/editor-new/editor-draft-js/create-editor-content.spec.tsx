import { expect } from 'chai'

import { createEditorContent } from './index'

describe.skip('client/components/editor-draft-js/create-editor-content', () => {
  it('should return string rawContentState with text passed', () => {
    const text = 'Clique aqui para editar...'
    const strResult = createEditorContent(text)
    const jsonResult = JSON.parse(strResult)

    expect(jsonResult.blocks.length).to.equal(1)
    expect(jsonResult.blocks[0].text).to.equal(text)
  })
})
