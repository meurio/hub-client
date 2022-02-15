import {
  EditorState,
  Entity,
  Modifier,
  RichUtils,
  SelectionState,
  CompositeDecorator,
} from 'draft-js';

import Link from './LinkControls/Link';
import linkStrategy from './LinkControls/linkStrategy';
import getSelectionEntities from './getSelectionEntities';

export const getEntitySelectionState = (
  editorState: any,
  selectionState: any,
  entityType: any
) => {
  // Selection cursor
  const currentContent = editorState.getCurrentContent();
  const endOffset = selectionState.getEndOffset();

  const block = currentContent.getBlockForKey(selectionState.getStartKey());

  let entitySelectionState;

  block.findEntityRanges(
    (character: any) => {
      const entityKey = character.getEntity();
      return entityKey && Entity.get(entityKey).getType() === entityType;
    },
    (start: any, end: any) => {
      const isSelected = end >= endOffset && start <= endOffset;

      if (isSelected) {
        entitySelectionState = selectionState.merge({
          anchorOffset: start,
          focusOffset: end,
        });
      }
    }
  );

  return entitySelectionState;
};

/*
 * getSelectedBlocks
 */
export const getSelectedBlocks = (contentState: any, selectionState: any) => {
  const anchorKey = selectionState.getStartKey();
  const focusKey = selectionState.getEndKey();

  const isSameBlock = anchorKey === focusKey;
  const startingBlock = contentState.getBlockForKey(anchorKey);

  if (!startingBlock) {
    return [];
  }

  let selectedBlocks = [startingBlock];

  if (!isSameBlock) {
    let blockKey = anchorKey;

    while (blockKey !== focusKey) {
      const nextBlock = contentState.getBlockAfter(blockKey);
      if (!nextBlock) {
        selectedBlocks = [];
        break;
      }
      selectedBlocks = [...selectedBlocks, nextBlock];
      blockKey = nextBlock.getKey();
    }
  }

  return selectedBlocks;
};

export const getBlockSelectionState = (
  contentBlock: any,
  selectionState: any
) => {
  const anchorKey = selectionState.getStartKey();
  const focusKey = selectionState.getEndKey();

  // Selection for this block
  const blockKey = contentBlock.getKey();
  const startOffset =
    blockKey === anchorKey ? selectionState.getStartOffset() : 0;
  const endOffset =
    blockKey === focusKey
      ? selectionState.getEndOffset()
      : contentBlock.getText().length;

  return SelectionState.createEmpty(blockKey).merge({
    anchorOffset: startOffset,
    focusOffset: endOffset,
  });
};

/*
 * Utils.js
 *
 * - toggleLink(editorState: EditorState, data: object)
 */
export default {
  toggleInlineStyle: (editorState: any, inlineStyle: any) => {
    if (inlineStyle.indexOf(':') > 0) {
      // remove and add new custom inline style
      let contentWithoutStyle = editorState.getCurrentContent();

      const prefix = inlineStyle.split(':')[0];
      const styles = editorState
        .getCurrentInlineStyle()
        .filter((style: any) => style.startsWith(prefix));
      if (styles.size > 0) {
        styles.forEach((style: any) => {
          contentWithoutStyle = Modifier.removeInlineStyle(
            contentWithoutStyle,
            editorState.getSelection(),
            style
          );
        });
        return RichUtils.toggleInlineStyle(
          // apply custom inline style in content without style
          EditorState.push(
            editorState,
            contentWithoutStyle,
            'change-inline-style'
          ),
          inlineStyle
        );
      }
    }

    return RichUtils.toggleInlineStyle(editorState, inlineStyle);
  },

  toggleLink: (editorState: any, data: any) => {
    /* This code need refactor */
    // Save editorState then apply link in loop
    const editorStateMutable = editorState;

    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();

      const arrayBlocks = getSelectedBlocks(contentState, selection);

      // Should create entity when text select
      // and merge entity data when block type selected is atomic
      // let entityKey: any;

      arrayBlocks.forEach(block => {
        const entity = block.getEntityAt(0);
        if (entity) {
          // When has entity selected
          if (block.getType() === 'atomic') {
            if (!data) {
              // Remove
              Entity.mergeData(entity, { href: null });
            } else {
              // Update
              Entity.mergeData(entity, data);
            }
          }
          // else {
          //   const blockSelectionState = getBlockSelectionState(
          //     block,
          //     selection
          //   );
          //   const entitySelectionState = getEntitySelectionState(
          //     editorState,
          //     blockSelectionState,
          //     'LINK'
          //   );

          //   if (entitySelectionState && data) {
          //     editorStateMutable = RichUtils.toggleLink(
          //       editorStateMutable,
          //       blockSelectionState,
          //       Entity.create('LINK', 'MUTABLE', data)
          //     );
          //   } else {
          //     editorStateMutable = RichUtils.toggleLink(
          //       editorStateMutable,
          //       blockSelectionState,
          //       null
          //     );
          //   }
          // }
        }
        // else if (block.getText().length > 0) {
        //   if (!entityKey) {
        //     // Ensure only a entity been created
        //     entityKey = data ? Entity.create('LINK', 'MUTABLE', data) : null;
        //   }

        //   // Toggle link
        //   const blockSelectionState = getBlockSelectionState(block, selection);
        //   editorStateMutable = RichUtils.toggleLink(
        //     // Apply entity in content mutable to ensure
        //     // that link before loop has been applied
        //     editorStateMutable,
        //     blockSelectionState,
        //     entityKey
        //   );
        // }
      });
      return editorStateMutable;
    } else {
      const selectionEntity = getSelectionEntities(editorState, 'LINK').last();
      if (selectionEntity) {
        Entity.mergeData((selectionEntity as any).entityKey, data);
      }
      return editorState;
    }
  },

  getEntityInstance: (
    editorState: any,
    selectionState: any,
    entityType: any
  ) => {
    const entitySelectionState: any = getEntitySelectionState(
      editorState,
      selectionState,
      entityType
    );

    if (entitySelectionState) {
      const block = editorState
        .getCurrentContent()
        .getBlockForKey(entitySelectionState.getStartKey());

      const entityKey = block.getEntityAt(
        entitySelectionState.getStartOffset()
      );
      return entityKey ? Entity.get(entityKey) : undefined;
    }
    return false;
  },

  customColor: (style: any) => {
    let output = {};
    const color = style
      .filter((value: any) => value.startsWith('color'))
      .last();
    if (color) {
      output = {
        ...output,
        color: color
          .replace('color:', '')
          .replace(';', '')
          .trim(),
      };
    }

    return output;
  },

  customSizeAndFamily: (style: any) => {
    let output = {};
    const fontSize = style
      .filter((value: any) => value.startsWith('font-size'))
      .last();
    if (fontSize) {
      const value: string = fontSize
        .replace('font-size:', '')
        .replace('px', '')
        .replace(';', '')
        .trim();
      output = {
        ...output,
        fontSize: Number(value),
      };
    }
    const fontFamily = style
      .filter((value: any) => value.startsWith('font-family'))
      .last();
    if (fontFamily) {
      output = {
        ...output,
        fontFamily: fontFamily
          .replace('font-family:', '')
          .replace(';', '')
          .trim(),
      };
    }

    return output;
  },

  blockRendererFn: (block: any, Media: React.ReactNode) => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
      };
    }
    return false;
  },

  decorator: new CompositeDecorator([
    { strategy: linkStrategy, component: Link },
  ]),
};
