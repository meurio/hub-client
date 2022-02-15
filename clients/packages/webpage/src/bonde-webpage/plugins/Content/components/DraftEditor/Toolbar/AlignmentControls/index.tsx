import React from 'react';
import styleWholeSelectedBlocksModifier from './styleWholeSelectedBlocksModifier';

// const alignments = ['left', 'center', 'right'];

type Props = {
  editorState: Record<string, any>;
  setEditorState: any;
  focusEditor: any;
  buttonClassName?: string;
};

const AlignmentControls = ({
  focusEditor,
  editorState,
  buttonClassName,
  setEditorState,
}: Props) => {
  const handleToggleAlign = (alignment: any) => {
    const editorStateWithAlignment = styleWholeSelectedBlocksModifier(
      editorState,
      alignment
      // alignments.filter((align: any) => alignment !== align)
    );
    setEditorState(editorStateWithAlignment);

    focusEditor();
  };

  const hasAlignmentStyle = (alignment: any) => {
    const selectionState = editorState.getSelection();

    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selectionState.getStartKey());

    let alignmentStyle = 'left';
    block.findStyleRanges((e: any) => {
      if (e.hasStyle('center')) alignmentStyle = 'center';
      if (e.hasStyle('right')) alignmentStyle = 'right';
    });

    return alignmentStyle === alignment ? 'active' : null;
  };

  return (
    <div className="alignmentControls">
      <button
        className={`${buttonClassName} ${hasAlignmentStyle('left')}`}
        onClick={() => handleToggleAlign('left')}
      >
        <i className="fa fa-align-left" />
      </button>
      <button
        className={`${buttonClassName} ${hasAlignmentStyle('center')}`}
        onClick={() => handleToggleAlign('center')}
      >
        <i className="fa fa-align-center" />
      </button>
      <button
        className={`${buttonClassName} ${hasAlignmentStyle('right')}`}
        onClick={() => handleToggleAlign('right')}
      >
        <i className="fa fa-align-right" />
      </button>
    </div>
  );
};

AlignmentControls.defaultProps = {
  buttonClassName: '',
};

export default AlignmentControls;
