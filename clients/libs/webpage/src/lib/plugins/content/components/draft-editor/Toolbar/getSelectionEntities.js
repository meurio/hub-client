import { Entity } from 'draft-js'
import { OrderedSet } from 'immutable'

const getSelectionEntities = (editorState, entityType) => {
  // Selection cursor
  const targetSelection = editorState.getSelection()
  const endOffset = targetSelection.getEndOffset()

  const currentContent = editorState.getCurrentContent()

  const block = currentContent.getBlockForKey(targetSelection.getStartKey())

  let selectionEntitySet = new OrderedSet()

  block.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && Entity.get(entityKey).getType() === entityType
  }, (start, end) => {
    const isSelected = end >= endOffset && start <= endOffset

    if (isSelected) {
      selectionEntitySet = selectionEntitySet.add({
        blockKey: block.getKey(),
        entityKey: block.getEntityAt(start),
        start,
        end
      })
    }
  })

  return selectionEntitySet
}

export default getSelectionEntities
