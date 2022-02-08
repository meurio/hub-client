import React from 'react';

import { Entity, AtomicBlockUtils } from 'draft-js';

import InsertImageButton from './InsertImageButton';
import InsertScriptButton from './InsertScriptButton';

import { Wrapper } from './styles';

type Props = {
  editorState: any;
  setEditorState: (param: any) => void;
  focusEditor: any;
  buttonClassName?: string;
  popoverClassName?: string;
};

const MediaControls = ({
  editorState,
  setEditorState,
  focusEditor,
  buttonClassName,
  popoverClassName,
}: Props) => {
  const handleInsertMedia = (mediaType: any, source: any) => {
    const entityKey = Entity.create(mediaType, 'IMMUTABLE', { src: source });
    const editorStateWithMedia = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    setEditorState(editorStateWithMedia);

    focusEditor();
  };

  return (
    <Wrapper className="mediaControls">
      <InsertImageButton
        buttonClassName={buttonClassName}
        handleUploadFinish={source => handleInsertMedia('image', source)}
      />
      <InsertScriptButton
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        handleInsertScript={handleInsertMedia}
      />
    </Wrapper>
  );
};

export default MediaControls;
