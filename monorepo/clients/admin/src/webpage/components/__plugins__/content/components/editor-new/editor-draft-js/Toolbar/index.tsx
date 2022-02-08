import classnames from 'classnames'
import { CompositeDecorator, RichUtils } from 'draft-js'
import React from 'react'
import AlignmentControls from './AlignmentControls'
import ColorControls, { customStyleFn as colorCustomStyleFunction } from './ColorControls'
import FontControls, { customStyleFn as fontCustomStyleFunction } from './FontControls'
import HistoryControls from './HistoryControls'
import LinkControls, { decorator as linkDecorator } from './LinkControls'
import MediaControls, { blockRendererFn as mediaBlockRendererFunction } from './MediaControls'
import './styles.scss'

interface ToolbarProperties {
  editorState: any;
  setEditorState: (editorState: any) => void
  focusEditor: () => void
  buttonClassName?: string;
  popoverClassName?: string;
  theme?: string;
  style?: any;
}

class Toolbar extends React.Component<ToolbarProperties> {
  toggleInlineStyle(style) {
    const { editorState, setEditorState } = this.props
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    this.props.focusEditor()
  }

  toggleBlockType(blockType) {
    const { editorState, setEditorState } = this.props
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    this.props.focusEditor()
  }

  hasInlineStyle(inlineStyle) {
    const { editorState } = this.props
    const hasStyle = editorState.getCurrentInlineStyle().filter(style => style === inlineStyle)
    return hasStyle.size > 0 ? 'active' : null
  }

  hasBlockType(blockType) {
    const { editorState } = this.props
    const selectionState = editorState.getSelection()
    const block = editorState.getCurrentContent().getBlockForKey(selectionState.getStartKey())
    return block.getType() === blockType ? 'active' : null
  }

  render() {
    const {
      editorState,
      setEditorState,
      focusEditor,
      buttonClassName,
      popoverClassName,
      theme,
      style
    } = this.props
    const controlsProperties = { editorState, setEditorState, focusEditor }

    return (
      <div
        className='toolbar absolute full-width top-0 left-0 bg-darken-4 flex flex-wrap'
        style={style}
      >
        <div>
          {/* InlineStyle buttons */}
          <button
            type='button'
            className={classnames(buttonClassName, this.hasInlineStyle('BOLD'))}
            onClick={() => this.toggleInlineStyle('BOLD')}
          >
            <i className='fa fa-bold' />
          </button>
          <button
            type='button'
            className={classnames(buttonClassName, this.hasInlineStyle('ITALIC'))}
            onClick={() => this.toggleInlineStyle('ITALIC')}
          >
            <i className='fa fa-italic' />
          </button>
          <button
            type='button'
            className={classnames(buttonClassName, this.hasInlineStyle('UNDERLINE'))}
            onClick={() => this.toggleInlineStyle('UNDERLINE')}
          >
            <i className='fa fa-underline' />
          </button>
          {/* BlockType buttons */}
          <button
            type='button'
            className={classnames(buttonClassName, this.hasBlockType('ordered-list-item'))}
            onClick={() => this.toggleBlockType('ordered-list-item')}
          >
            <i className='fa fa-list-ol' />
          </button>
          <button
            type='button'
            className={classnames(buttonClassName, this.hasBlockType('unordered-list-item'))}
            onClick={() => this.toggleBlockType('unordered-list-item')}
          >
            <i className='fa fa-list-ul' />
          </button>
        </div>
        <LinkControls
          buttonClassName={buttonClassName}
          popoverClassName={popoverClassName}
          {...controlsProperties}
        />
        <ColorControls
          theme={theme}
          buttonClassName={buttonClassName}
          {...controlsProperties}
        />
        <FontControls
          initialValue={{ fontSize: 15, fontFamily: '' }}
          {...controlsProperties}
        />
        <HistoryControls
          buttonClassName={buttonClassName}
          {...controlsProperties}
        />
        <AlignmentControls
          buttonClassName={buttonClassName}
          {...controlsProperties}
        />
        <MediaControls
          buttonClassName={buttonClassName}
          popoverClassName={popoverClassName}
          {...controlsProperties}
        />
      </div>
    )
  }
}

export const toolbarEditorProps = {
  blockRendererFn: mediaBlockRendererFunction,
  customStyleFn: (style) => ({
    ...fontCustomStyleFunction(style),
    ...colorCustomStyleFunction(style)
  })
}

export const decorator = new CompositeDecorator([
  linkDecorator
])

export { default as getBlockAlignment } from './AlignmentControls/getBlockAlignment'

export default Toolbar
