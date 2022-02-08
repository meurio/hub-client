import React from 'react';

import { RichUtils } from 'draft-js';

import Media from './MediaControls/Media';
import ColorControls from './ColorControls';
import FontControls from './FontControls';
import HistoryControls from './HistoryControls';
import LinkControls from './LinkControls';
import AlignmentControls from './AlignmentControls';
import MediaControls from './MediaControls';
import EditorUtils from './EditorUtils';

import { Wrapper } from './styles';

type Props = {
  editorState: any;
  setEditorState: any;
  focusEditor: any;
  buttonClassName?: string;
  popoverClassName?: string;
  theme?: string;
  style?: Record<string, string | number>;
};

const Toolbar = ({
  editorState,
  setEditorState,
  focusEditor,
  buttonClassName,
  popoverClassName,
  theme,
  style = {},
}: Props) => {
  const toggleInlineStyle = (style: any) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    return focusEditor();
  };

  const toggleBlockType = (blockType: any) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    return focusEditor();
  };

  const hasInlineStyle = (inlineStyle: any) => {
    const hasStyle = editorState
      .getCurrentInlineStyle()
      .filter((style: any) => style === inlineStyle);
    return hasStyle.size > 0 ? 'active' : null;
  };

  const hasBlockType = (blockType: any) => {
    const selectionState = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selectionState.getStartKey());
    return block.getType() === blockType ? 'active' : null;
  };

  const controlsProps = { editorState, setEditorState, focusEditor };

  return (
    <Wrapper
      className="toolbar absolute full-width top-0 left-0 bg-darken-4 flex flex-wrap"
      style={style}
    >
      <div>
        {/* InlineStyle buttons */}
        <button
          type="button"
          className={`${buttonClassName} ${hasInlineStyle('BOLD')}`}
          onClick={() => toggleInlineStyle('BOLD')}
        >
          <i className="fa fa-bold" />
        </button>
        <button
          type="button"
          className={`${buttonClassName} ${hasInlineStyle('ITALIC')}`}
          onClick={() => toggleInlineStyle('ITALIC')}
        >
          <i className="fa fa-italic" />
        </button>
        <button
          type="button"
          className={`${buttonClassName} ${hasInlineStyle('UNDERLINE')}`}
          onClick={() => toggleInlineStyle('UNDERLINE')}
        >
          <i className="fa fa-underline" />
        </button>
        {/* BlockType buttons */}
        <button
          type="button"
          className={`${buttonClassName} ${hasBlockType('ordered-list-item')}`}
          onClick={() => toggleBlockType('ordered-list-item')}
        >
          <i className="fa fa-list-ol" />
        </button>
        <button
          type="button"
          className={`${buttonClassName} ${hasBlockType(
            'unordered-list-item'
          )}`}
          onClick={() => toggleBlockType('unordered-list-item')}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
      <LinkControls
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        {...controlsProps}
      />
      <ColorControls
        theme={theme}
        buttonClassName={buttonClassName}
        {...controlsProps}
      />
      <FontControls
        initialValue={{ fontSize: 15, fontFamily: '' }}
        {...controlsProps}
      />
      <HistoryControls buttonClassName={buttonClassName} {...controlsProps} />
      <AlignmentControls buttonClassName={buttonClassName} {...controlsProps} />
      <MediaControls
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        {...controlsProps}
      />
    </Wrapper>
  );
};

export const toolbarEditorProps = {
  blockRendererFn: (block: any) => EditorUtils.blockRendererFn(block, Media),
  customStyleFn: (style: any) => {
    return {
      ...EditorUtils.customSizeAndFamily(style),
      ...EditorUtils.customColor(style),
    };
  },
};

export default Toolbar;
