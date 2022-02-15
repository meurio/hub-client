import React from 'react';
import { EditorState } from 'draft-js';

type Props = {
  editorState: any;
  setEditorState: (param: any) => any;
  focusEditor: () => any;
  buttonClassName?: string;
};

const HistoryControls = ({
  editorState,
  setEditorState,
  focusEditor,
  buttonClassName,
}: Props) => {
  const handleUndoClick = () => {
    if (!editorState.getUndoStack().isEmpty()) {
      setEditorState(EditorState.undo(editorState));
      focusEditor();
    }
    return false;
  };

  const handleRedoClick = () => {
    if (!editorState.getRedoStack().isEmpty()) {
      setEditorState(EditorState.redo(editorState));
      focusEditor();
    }
    return false;
  };

  return (
    <div className="historyControls">
      <button
        type="button"
        className={buttonClassName}
        onClick={handleUndoClick}
      >
        <i className="fa fa-undo regular" />
      </button>
      <button
        type="button"
        className={buttonClassName}
        onClick={handleRedoClick}
      >
        <i className="fa fa-repeat regular" />
      </button>
    </div>
  );
};

export default HistoryControls;
