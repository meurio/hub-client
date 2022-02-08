import {
  ContentBlock,
  ContentState,
  convertFromHTML, convertFromRaw, convertToRaw, Editor,
  EditorState, genKey
} from 'draft-js'
import { OrderedMap } from 'immutable'
import React from 'react'
import './styles.scss'
// Current module dependencies
import Toolbar, {
  decorator,
  getBlockAlignment, toolbarEditorProps as toolbarEditorProperties
} from './Toolbar'

interface RebooEditorProperties {
  handleSave: (content: any) => void
  handleDelete: () => void;
  readOnly: boolean;
  value?: any;
  theme?: string;
  editorStyle?: any;
  focusStyle?: any;
  toolbarContainerStyle?: any;
  toolbarStyle?: any;
  containerStyle?: any;
}

interface RebooEditorState {
  editorState: any;
  hasFocus: boolean;
}

class RebooEditor extends React.Component<RebooEditorProperties, RebooEditorState> {
  constructor(properties) {
    super(properties)

    let editorState = EditorState.createEmpty(decorator)
    if (this.props.value) {
      let contentState
      if (typeof this.props.value === 'string') {
        // initialValue is a string with syntax HTML, we need transform in contentState
        contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.value))
      } else if (typeof this.props.value === 'object') {
        contentState = convertFromRaw(this.props.value)
      } else {
        throw new TypeError('Value invalid')
      }

      editorState = EditorState.createWithContent(contentState, decorator)
    }

    this.state = { editorState, hasFocus: false }
  }

  focus() {
    this.setState({
      hasFocus: true
    }, () => setTimeout(() => (this.refs.editor as any).focus()))
  }

  onChangeEditorState(editorState) {
    this.setState({ editorState })
  }

  handleKeyCommand(command) {
    const { editorState } = this.state
    const currentBlock = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
    // Modify behavior to insert new line
    if (command === 'split-block' && currentBlock.getType() === 'atomic') {
      // Create a contentBlock done to be insert
      const contentBlock = new ContentBlock({
        key: genKey(),
        type: 'unstyled'
      })
      const contentBlockMap = OrderedMap([
        [contentBlock.getKey(), contentBlock]
      ])

      const currentContent = editorState.getCurrentContent()
      const currentBlockMap = currentContent.getBlockMap()

      // split blocks with current block
      const skipCurrent = block => block === currentBlock
      const beforeBlocks = currentBlockMap.toSeq().takeUntil(skipCurrent)
      const afterBlocks = currentBlockMap
        .toSeq()
        .skipUntil(skipCurrent)
        .rest()

      const current = OrderedMap([[currentBlock.getKey(), currentBlock]]).toSeq()
      let blockMap: any;
      blockMap = editorState.getSelection().getAnchorOffset() < editorState.getSelection().getFocusOffset() ? beforeBlocks.concat(
        contentBlockMap.toSeq(),
        afterBlocks
      ).toOrderedMap() : beforeBlocks.concat(
        current,
        contentBlockMap.toSeq(),
        afterBlocks
      ).toOrderedMap();

      const content = currentContent.merge({ blockMap })
      const editorStateWithLineBreak = EditorState.push(editorState, content, 'insert-new-line')

      this.onChangeEditorState(EditorState.forceSelection(
        editorStateWithLineBreak,
        editorStateWithLineBreak.getSelection().merge({
          anchorKey: contentBlock.getKey(),
          anchorOffset: 0,
          isBackward: false
        })
      ))

      return true
    }
    return false
  }

  blockStyleFn(block) {
    // TODO: Move to control and receive like plugin
    const { editorState } = this.state

    let alignment = getBlockAlignment(block)
    if (!block.getText()) {
      const previousBlock = editorState.getCurrentContent().getBlockBefore(block.getKey())
      if (previousBlock) {
        alignment = getBlockAlignment(previousBlock)
      }
    }
    return `alignment--${alignment}`
  }

  handleBeforeInput(chars) {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    const block = editorState.getCurrentContent().getBlockForKey(selection.getStartKey())
    if (chars === ' ' && block.getType() === 'atomic') {
      this.handleKeyCommand('split-block')
      return true
    }
    return false
  }

  save() {
    this.props.handleSave(convertToRaw(this.state.editorState.getCurrentContent()))
    this.setState({ hasFocus: false })
  }

  render() {
    // Injected root container props
    const { containerStyle } = this.props
    // Injected Toolbar props
    const { toolbarStyle, toolbarContainerStyle, theme } = this.props
    // Injected Editor props
    const { editorStyle, focusStyle, readOnly } = this.props

    const hasFocusStyle = this.state.hasFocus && !readOnly
      ? focusStyle || { outline: '1px solid blue' }
      : {}

    return (
      <div className='reboo-editor' style={containerStyle}>
        {!readOnly ? (
          <div
            className='toolbar-container'
            style={{ ...toolbarContainerStyle, display: this.state.hasFocus ? 'block' : 'none' }}
          >
            <Toolbar
              theme={theme}
              buttonClassName='btn white p2'
              popoverClassName='absolute white p2 bg-darken-4 rounded-bottom'
              editorState={this.state.editorState}
              setEditorState={this.onChangeEditorState.bind(this)}
              focusEditor={this.focus.bind(this)}
              style={toolbarStyle}
            />
            <div className='outside' onClick={this.save.bind(this)} />
          </div>
        ) : null}
        <div
          className='editor'
          style={{ ...editorStyle, ...hasFocusStyle }}
        >
          <div onClick={this.focus.bind(this)}>
            <Editor
              ref='editor'
              readOnly={readOnly}
              editorState={this.state.editorState}
              onChange={this.onChangeEditorState.bind(this)}
              blockStyleFn={this.blockStyleFn.bind(this)}
              handleKeyCommand={this.handleKeyCommand.bind(this)}
              handleBeforeInput={this.handleBeforeInput.bind(this)}
              {...toolbarEditorProperties}
            />
            <div style={{ 'clear': 'both' }} />
          </div>
          {!readOnly ? (
            <div
              className='right mt1'
              style={{
                display: this.state.hasFocus ? 'block' : 'none',
                width: '100%',
                position: 'relative'
              }}
            >
              <button
                type="button"
                className='btn caps bg-darken-4 white rounded'
                onClick={this.save.bind(this)}
              >
                Salvar
              </button>
              <button
                type="button"
                className='btn bg-darken-4 white rounded'
                style={{
                  position: 'absolute',
                  right: '0'
                }}
                onClick={this.props.handleDelete}
              >
                <i className='fa fa-trash' />
              </button>
            </div>
          ) : undefined}
        </div>

      </div>
    )
  }
}

export default RebooEditor

export { default as createEditorContent } from './create-editor-content'
