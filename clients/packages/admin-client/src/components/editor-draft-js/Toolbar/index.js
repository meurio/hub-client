import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

import { RichUtils, CompositeDecorator } from 'draft-js'

import ColorControls, { customStyleFn as colorCustomStyleFn } from './ColorControls'
import FontControls, { customStyleFn as fontCustomStyleFn } from './FontControls'
import HistoryControls from './HistoryControls'
import LinkControls, { decorator as linkDecorator } from './LinkControls'
import AlignmentControls from './AlignmentControls'
import MediaControls, { blockRendererFn as mediaBlockRendererFn } from './MediaControls'

if (require('exenv').canUseDOM) require('./styles.scss')

class Toolbar extends Component {
  toggleInlineStyle (style) {
    const { editorState, setEditorState } = this.props
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    this.props.focusEditor()
  }

  toggleBlockType (blockType) {
    const { editorState, setEditorState } = this.props
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    this.props.focusEditor()
  }

  hasInlineStyle (inlineStyle) {
    const { editorState } = this.props
    const hasStyle = editorState.getCurrentInlineStyle().filter(style => style === inlineStyle)
    return hasStyle.size > 0 ? 'active' : null
  }

  hasBlockType (blockType) {
    const { editorState } = this.props
    const selectionState = editorState.getSelection()
    const block = editorState.getCurrentContent().getBlockForKey(selectionState.getStartKey())
    return block.getType() === blockType ? 'active' : null
  }

  render () {
    const {
      editorState,
      setEditorState,
      focusEditor,
      buttonClassName,
      popoverClassName,
      theme,
      style
    } = this.props
    const controlsProps = { editorState, setEditorState, focusEditor }

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
        <HistoryControls
          buttonClassName={buttonClassName}
          {...controlsProps}
        />
        <AlignmentControls
          buttonClassName={buttonClassName}
          {...controlsProps}
        />
        <MediaControls
          buttonClassName={buttonClassName}
          popoverClassName={popoverClassName}
          {...controlsProps}
        />
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string,
  theme: PropTypes.string
}

export const toolbarEditorProps = {
  blockRendererFn: mediaBlockRendererFn,
  customStyleFn: (style) => {
    return {
      ...fontCustomStyleFn(style),
      ...colorCustomStyleFn(style)
    }
  }
}

export const decorator = new CompositeDecorator([
  linkDecorator
])

export { default as getBlockAlignment } from './AlignmentControls/getBlockAlignment'

export default Toolbar
