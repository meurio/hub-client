import { EditorState, Entity, Modifier, RichUtils, SelectionState } from 'draft-js'

import getSelectionEntities from './getSelectionEntities'

export const getEntitySelectionState = (editorState, selectionState, entityType) => {
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
export const getSelectedBlocks = (contentState, selectionState) => {
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

const getBlockSelectionState = (contentBlock, selectionState) => {
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

  toggleInlineStyle: (editorState, inlineStyle) => {
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

  toggleLink: (editorState, data) => {
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
              Entity.mergeData(entity, { href: null })
            } else {  // Update
              Entity.mergeData(entity, data)
            }
          } else {
            const blockSelectionState = getBlockSelectionState(block, selection)
            const entitySelectionState = getEntitySelectionState(editorState, blockSelectionState, 'LINK')

            if (entitySelectionState && data) {
              editorStateMutable = RichUtils.toggleLink(
                editorStateMutable,
                blockSelectionState,
                Entity.create('LINK', 'MUTABLE', data)
              )
            } else {
              editorStateMutable = RichUtils.toggleLink(
                editorStateMutable,
                blockSelectionState,
                null
              )
            }
          }
        } else if (block.getText().length > 0) {
          if (!entityKey) {
            // Ensure only a entity been created
            entityKey = data ? Entity.create('LINK', 'MUTABLE', data) : null
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
    } else {
      const selectionEntity = getSelectionEntities(editorState, 'LINK').last()
      if (selectionEntity) {
        Entity.mergeData(selectionEntity.entityKey, data)
      }
      return editorState
    }
  },

  getEntityInstance: (editorState, selectionState, entityType) => {
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
