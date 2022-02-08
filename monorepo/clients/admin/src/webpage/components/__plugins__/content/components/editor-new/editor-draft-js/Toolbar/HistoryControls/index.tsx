import { EditorState } from 'draft-js'
import React from 'react'

interface HistoryControlsProperties {
  editorState: any;
  setEditorState: (editorState: any) => void
  focusEditor: () => void;
  buttonClassName?: string;
  popoverClassName?: string;
}

export default class HistoryControls extends React.Component<HistoryControlsProperties> {
  handleUndoClick() {
    const { editorState, setEditorState } = this.props

    if (!editorState.getUndoStack().isEmpty()) {
      setEditorState(EditorState.undo(editorState))
      this.props.focusEditor()
    }
  }

  handleRedoClick() {
    const { editorState, setEditorState } = this.props
    if (!editorState.getRedoStack().isEmpty()) {
      setEditorState(EditorState.redo(editorState))
      this.props.focusEditor()
    }
  }

  render() {
    const { buttonClassName } = this.props

    return (
      <div className='historyControls'>
        <button type='button' className={buttonClassName} onClick={this.handleUndoClick.bind(this)}>
          <i className='fa fa-undo regular' />
        </button>
        <button type='button' className={buttonClassName} onClick={this.handleRedoClick.bind(this)}>
          <i className='fa fa-repeat regular' />
        </button>
      </div>
    )
  }
}
