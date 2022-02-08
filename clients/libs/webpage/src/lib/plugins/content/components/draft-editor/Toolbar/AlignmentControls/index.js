import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import styleWholeSelectedBlocksModifier from './styleWholeSelectedBlocksModifier'

const alignments = ['left', 'center', 'right']

export default class AlignmentControls extends Component {
  handleToggleAlign (alignment) {
    const { editorState, setEditorState } = this.props
    const editorStateWithAlignment = styleWholeSelectedBlocksModifier(
      editorState,
      alignment,
      alignments.filter(align => alignment !== align)
    )
    setEditorState(editorStateWithAlignment)

    this.props.focusEditor()
  }

  hasAlignmentStyle (alignment) {
    const { editorState } = this.props
    const selectionState = editorState.getSelection()

    const block = editorState.getCurrentContent().getBlockForKey(selectionState.getStartKey())

    let alignmentStyle = 'left'
    block.findStyleRanges(e => {
      if (e.hasStyle('center')) alignmentStyle = 'center'
      if (e.hasStyle('right')) alignmentStyle = 'right'
    })

    return alignmentStyle === alignment ? 'active' : null
  }

  render () {
    const { buttonClassName } = this.props

    return (
      <div className='alignmentControls'>
        <button
          className={classnames(buttonClassName, this.hasAlignmentStyle('left'))}
          onClick={() => this.handleToggleAlign('left')}
        >
          <i className='fa fa-align-left' />
        </button>
        <button
          className={classnames(buttonClassName, this.hasAlignmentStyle('center'))}
          onClick={() => this.handleToggleAlign('center')}
        >
          <i className='fa fa-align-center' />
        </button>
        <button
          className={classnames(buttonClassName, this.hasAlignmentStyle('right'))}
          onClick={() => this.handleToggleAlign('right')}
        >
          <i className='fa fa-align-right' />
        </button>
      </div>
    )
  }
}

AlignmentControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}
