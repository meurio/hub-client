import { EditorState, Entity, Modifier, RichUtils, SelectionState } from 'draft-js'

import getSelectionEntities from './getSelectionEntities'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEntitySelectionState = (editorState: any, selectionState: any, entityType: any): any => {
  // Selection cursor
  const currentContent = editorState.getCurrentContent()
  const endOffset = selectionState.getEndOffset()

  const block = currentContent.getBlockForKey(selectionState.getStartKey())

  let entitySelectionState

  block.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey && Entity.get(entityKey).getType() === entityType
  }, (start, end) => {
    const isSelected = end >= endOffset && start <= endOffset

    if (isSelected) {
      entitySelectionState = selectionState.merge({
        anchorOffset: start,
        focusOffset: end
      })
    }
  })

  return entitySelectionState
}

/*
 * getSelectedBlocks
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSelectedBlocks = (contentState: any, selectionState: any): any => {
  const anchorKey = selectionState.getStartKey()
  const focusKey = selectionState.getEndKey()

  const isSameBlock = anchorKey === focusKey
  const startingBlock = contentState.getBlockForKey(anchorKey)

  if (!startingBlock) {
    return []
  }

  let selectedBlocks = [startingBlock]

  if (!isSameBlock) {
    let blockKey = anchorKey

    while (blockKey !== focusKey) {
      const nextBlock = contentState.getBlockAfter(blockKey)
      if (!nextBlock) {
        selectedBlocks = []
        break
      }
      selectedBlocks.push(nextBlock)
      blockKey = nextBlock.getKey()
    }
  }

  return selectedBlocks
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBlockSelectionState = (contentBlock: any, selectionState: any): any => {
  const anchorKey = selectionState.getStartKey()
  const focusKey = selectionState.getEndKey()

  // Selection for this block
  const blockKey = contentBlock.getKey()
  const startOffset = blockKey === anchorKey ? selectionState.getStartOffset() : 0
  const endOffset = blockKey === focusKey ? selectionState.getEndOffset() : contentBlock.getText().length

  return SelectionState.createEmpty(blockKey).merge({
    anchorOffset: startOffset,
    focusOffset: endOffset
  })
}

/*
 * Utils.js
 *
 * - toggleLink(editorState: EditorState, data: object)
 */
export default {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleInlineStyle: (editorState: any, inlineStyle: any): any => {
    if (inlineStyle.indexOf(':') > 0) {  // remove and add new custom inline style
      let contentWithoutStyle = editorState.getCurrentContent()

      const prefix = inlineStyle.split(':')[0]
      const styles = editorState.getCurrentInlineStyle().filter(style => style.startsWith(prefix))
      if (styles.size > 0) {
        styles.forEach(style => {
          contentWithoutStyle = Modifier.removeInlineStyle(
            contentWithoutStyle,
            editorState.getSelection(),
            style
          )
        })
        return RichUtils.toggleInlineStyle(
          // apply custom inline style in content without style
          EditorState.push(editorState, contentWithoutStyle, 'change-inline-style'),
          inlineStyle
        )
      }
    }

    return RichUtils.toggleInlineStyle(editorState, inlineStyle)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleLink: (editorState: any, data: any): any => {
    /* This code need refactor */
    // Save editorState then apply link in loop
    let editorStateMutable = editorState

    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent()

      const arrayBlocks = getSelectedBlocks(contentState, selection)

      // Should create entity when text select
      // and merge entity data when block type selected is atomic
      let entityKey

      arrayBlocks.forEach(block => {
        const entity = block.getEntityAt(0)
        if (entity) {  // When has entity selected
          if (block.getType() === 'atomic') {
            if (!data) {  // Remove
              Entity.mergeData(entity, { href: undefined })
            } else {  // Update
              Entity.mergeData(entity, data)
            }
          } else {
            const blockSelectionState = getBlockSelectionState(block, selection)
            const entitySelectionState = getEntitySelectionState(editorState, blockSelectionState, 'LINK')

            editorStateMutable = entitySelectionState && data
              ? RichUtils.toggleLink(
                editorStateMutable,
                blockSelectionState,
                Entity.create('LINK', 'MUTABLE', data)
              )
              : RichUtils.toggleLink(
                editorStateMutable,
                blockSelectionState
              )
          }
        } else if (block.getText().length > 0) {
          if (!entityKey) {
            // Ensure only a entity been created
            entityKey = data ? Entity.create('LINK', 'MUTABLE', data) : undefined
          }

          // Toggle link
          const blockSelectionState = getBlockSelectionState(block, selection)
          editorStateMutable = RichUtils.toggleLink(
            // Apply entity in content mutable to ensure
            // that link before loop has been applied
            editorStateMutable,
            blockSelectionState,
            entityKey
          )
        }
      })

      return editorStateMutable
    }
    const selectionEntity: any = getSelectionEntities(editorState, 'LINK').last()
    if (selectionEntity) {
      Entity.mergeData(selectionEntity.entityKey, data)
    }
    return editorState
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEntityInstance: (editorState: any, selectionState: any, entityType: any): any => {
    const entitySelectionState = getEntitySelectionState(
      editorState,
      selectionState,
      entityType
    )

    if (entitySelectionState) {
      const block = editorState
        .getCurrentContent()
        .getBlockForKey(
          entitySelectionState.getStartKey()
        )

      const entityKey = block.getEntityAt(entitySelectionState.getStartOffset())
      return entityKey ? Entity.get(entityKey) : undefined
    }
  }

}
