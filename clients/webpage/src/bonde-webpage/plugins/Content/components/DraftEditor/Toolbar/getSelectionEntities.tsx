import { Entity } from 'draft-js';
import { OrderedSet } from 'immutable';

const getSelectionEntities = (editorState: any, entityType: any) => {
  // Selection cursor
  const targetSelection = editorState.getSelection();
  const endOffset = targetSelection.getEndOffset();

  const currentContent = editorState.getCurrentContent();

  const block = currentContent.getBlockForKey(targetSelection.getStartKey());

  const selectionEntitySet = OrderedSet();

  block.findEntityRanges(
    (character: any) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && Entity.get(entityKey).getType() === entityType
      );
    },
    (start: any, end: any) => {
      const isSelected = end >= endOffset && start <= endOffset;

      if (isSelected) {
        selectionEntitySet.add({
          blockKey: block.getKey(),
          entityKey: block.getEntityAt(start),
          start,
          end,
        });
      }
    }
  );

  return selectionEntitySet;
};

export default getSelectionEntities;
