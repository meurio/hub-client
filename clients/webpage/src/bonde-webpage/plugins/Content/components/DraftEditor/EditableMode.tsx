import React, { useState, useRef } from 'react';
import { OrderedMap } from 'immutable';
import {
  Editor,
  EditorState,
  ContentBlock,
  ContentState,
  // convertFromHTML,
  convertToRaw,
  convertFromRaw,
  genKey,
} from 'draft-js';

// Current module dependencies
import EditorUtils from './Toolbar/EditorUtils';
import Toolbar, { toolbarEditorProps } from './Toolbar';
import getBlockAlignment from './Toolbar/AlignmentControls/getBlockAlignment';
import './styles.ts';

type Props = {
  handleSave: Function;
  readOnly: boolean;
  value: string | Record<any, any>;
  theme?: string;
  containerStyle?: Record<string, string | number>;
  toolbarStyle?: Record<string, string | number>;
  toolbarContainerStyle?: Record<string, string | number>;
  focusStyle?: Record<string, string | number>;
  editorStyle?: Record<string, string | number>;
  handleDelete: any;
};

const newEditor = (value: string | Record<any, any>) => {
  let editorState = EditorState.createEmpty(EditorUtils.decorator);
  let contentState;
  if (typeof value === 'string') {
    // initialValue is a string with syntax HTML, we need transform in contentState
    // TODO: Weird js, before, it was:
    // contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.value))
    contentState = ContentState.createFromText(value);
  } else if (typeof value === 'object') {
    contentState = convertFromRaw(value as any);
  } else {
    throw new Error('Value invalid');
  }

  editorState = EditorState.createWithContent(
    contentState,
    EditorUtils.decorator
  );

  return editorState;
};

const RebooEditor = ({
  value,
  handleSave,
  containerStyle,
  toolbarStyle,
  toolbarContainerStyle,
  theme,
  editorStyle,
  focusStyle,
  readOnly,
  handleDelete,
}: Props) => {
  const [editor, setEditor] = useState(newEditor(value));
  const [hasFocus, toggleFocus] = useState(false);
  const editorRef = useRef();

  const focus = () => {
    toggleFocus(true);
    setTimeout(() => (editorRef.current as any).focus());
  };

  const onChangeEditorState = (editorState: any) => setEditor(editorState);

  const handleKeyCommand = (command: string): any => {
    const currentBlock = (editor as any)
      .getCurrentContent()
      .getBlockForKey((editor as any).getSelection().getStartKey());
    // Modify behavior to insert new line
    if (command === 'split-block' && currentBlock.getType() === 'atomic') {
      // Create a contentBlock done to be insert
      const contentBlock = new ContentBlock({
        key: genKey(),
        type: 'unstyled',
      });
      const contentBlockMap = OrderedMap([
        [contentBlock.getKey(), contentBlock],
      ]);

      const currentContent = (editor as any).getCurrentContent();
      const currentBlockMap = currentContent.getBlockMap();

      // split blocks with current block
      const skipCurrent = (block: any) => block === currentBlock;
      const beforeBlocks = currentBlockMap.toSeq().takeUntil(skipCurrent);
      const afterBlocks = currentBlockMap
        .toSeq()
        .skipUntil(skipCurrent)
        .rest();

      let blockMap;
      if (
        (editor as any).getSelection().getAnchorOffset() <
        (editor as any).getSelection().getFocusOffset()
      ) {
        // mount block map with new block to insert in place of old block
        blockMap = beforeBlocks
          .concat(contentBlockMap.toSeq(), afterBlocks)
          .toOrderedMap();
      } else {
        // mount block map with new block to insert before
        blockMap = beforeBlocks
          .concat(
            OrderedMap([[currentBlock.getKey(), currentBlock]]).toSeq(),
            contentBlockMap.toSeq(),
            afterBlocks
          )
          .toOrderedMap();
      }

      const content = currentContent.merge({ blockMap });
      const editorStateWithLineBreak = EditorState.push(
        editor as any,
        content,
        'insert-fragment' // before, insert-new-line
      );

      // console.log(editorStateWithLineBreak);

      // TODO: Type error
      onChangeEditorState(
        EditorState.forceSelection(
          editorStateWithLineBreak,
          editorStateWithLineBreak.getSelection().merge({
            anchorKey: contentBlock.getKey(),
            anchorOffset: 0,
            isBackward: false,
          })
        )
      );

      return true;
    }
    return false;
  };

  const blockStyleFn = (block: any) => {
    // TODO: Move to control and receive like plugin
    let alignment = getBlockAlignment(block);
    if (!block.getText()) {
      let previousBlock = (editor as any)
        .getCurrentContent()
        .getBlockBefore(block.getKey());
      if (previousBlock) {
        alignment = getBlockAlignment(previousBlock);
      }
    }
    return `alignment--${alignment}`;
  };

  const handleBeforeInput = (chars: any): any => {
    const selection = (editor as any).getSelection();
    const block = (editor as any)
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    if (chars === ' ' && block.getType() === 'atomic') {
      handleKeyCommand('split-block');
      return true;
    }
    return false;
  };

  const save = () => {
    handleSave(convertToRaw((editor as any).getCurrentContent()));
    toggleFocus(false);
  };

  const hasFocusStyle =
    hasFocus && !readOnly ? focusStyle || { outline: '1px solid blue' } : {};

  return (
    <div className="reboo-editor" style={containerStyle}>
      {!readOnly ? (
        <div
          className="toolbar-container"
          style={{
            ...toolbarContainerStyle,
            display: hasFocus ? 'block' : 'none',
          }}
        >
          <Toolbar
            theme={theme}
            buttonClassName="btn white p2"
            popoverClassName="absolute white p2 bg-darken-4 rounded-bottom"
            editorState={editor as any}
            setEditorState={onChangeEditorState}
            focusEditor={focus}
            style={toolbarStyle}
          />
          <div className="outside" onClick={save} />
        </div>
      ) : null}
      <div className="editor" style={{ ...editorStyle, ...hasFocusStyle }}>
        <div onClick={focus}>
          <Editor
            readOnly={readOnly}
            editorState={editor as EditorState}
            onChange={onChangeEditorState}
            blockStyleFn={blockStyleFn}
            handleKeyCommand={handleKeyCommand}
            handleBeforeInput={handleBeforeInput}
            ref={editorRef as any}
            {...toolbarEditorProps}
          />
          <div style={{ clear: 'both' }} />
        </div>
        {!readOnly ? (
          <div
            className="right mt1"
            style={{
              display: hasFocus ? 'block' : 'none',
              width: '100%',
              position: 'relative',
            }}
          >
            <button
              className="btn caps bg-darken-4 white rounded"
              onClick={save}
            >
              Salvar
            </button>
            <button
              className="btn bg-darken-4 white rounded"
              style={{
                position: 'absolute',
                right: '0',
              }}
              onClick={handleDelete}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

RebooEditor.defaultProps = {
  readOnly: true,
};

export default RebooEditor;

// export { default as createEditorContent } from './create-editor-content';
