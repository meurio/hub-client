import { Modifier } from 'draft-js';

//
// USAGE
// style = alignment you want (e.g. "left")
// removeStyles = alignments to remove (["center", "right"])
//

const EditorState = (editorState: any, style: any, removeStyles = []) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
  const anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
  const selectionIsBackward = selection.getIsBackward();

  let changes = {
    anchorOffset: 0,
    focusOffset: focusBlock.getLength(),
  };

  if (selectionIsBackward) {
    changes = {
      focusOffset: 0,
      anchorOffset: anchorBlock.getLength(),
    };
  }
  const selectWholeBlocks = selection.merge(changes);
  const modifiedContent = Modifier.applyInlineStyle(
    currentContent,
    selectWholeBlocks,
    style
  );
  const finalContent = removeStyles.reduce((content, style) => {
    return Modifier.removeInlineStyle(content, selectWholeBlocks, style);
  }, modifiedContent);
  return [editorState, finalContent, 'change-inline-style'];
};

export default EditorState;
