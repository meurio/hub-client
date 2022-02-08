import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { EditorState } from 'draft-js'

export default class HistoryControls extends Component {
  handleUndoClick () {
    const { editorState, setEditorState } = this.props

    if (!editorState.getUndoStack().isEmpty()) {
      setEditorState(EditorState.undo(editorState))
      this.props.focusEditor()
    }
  }

  handleRedoClick () {
    const { editorState, setEditorState } = this.props
    if (!editorState.getRedoStack().isEmpty()) {
      setEditorState(EditorState.redo(editorState))
      this.props.focusEditor()
    }
  }

  render () {
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

HistoryControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}
