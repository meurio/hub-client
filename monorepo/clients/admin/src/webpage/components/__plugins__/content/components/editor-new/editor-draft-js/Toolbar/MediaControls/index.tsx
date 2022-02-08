import { AtomicBlockUtils, Entity } from 'draft-js'
import React from 'react'
import InsertImageButton from './InsertImageButton'
import InsertScriptButton from './InsertScriptButton'
import Media from './Media'
import './styles.scss'

interface MediaControlsProperties {
  editorState: any;
  setEditorState: (editorState: any) => void
  focusEditor: () => void;
  buttonClassName?: string;
  popoverClassName?: string;
}

export default class MediaControls extends React.Component<MediaControlsProperties> {
  handleInsertMedia(mediaType, source) {
    const { editorState, setEditorState } = this.props

    const entityKey = Entity.create(mediaType, 'IMMUTABLE', { src: source })
    const editorStateWithMedia = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
    setEditorState(editorStateWithMedia)

    this.props.focusEditor()
  }

  render() {
    const { buttonClassName, popoverClassName } = this.props

    return (
      <div className='mediaControls'>
        <InsertImageButton
          buttonClassName={buttonClassName || ''}
          popoverClassName={popoverClassName || ''}
          handleUploadFinish={source => this.handleInsertMedia('image', source)}
        />
        <InsertScriptButton
          buttonClassName={buttonClassName || ''}
          popoverClassName={popoverClassName || ''}
          // eslint-disable-next-line react/jsx-no-bind
          handleInsertScript={this.handleInsertMedia.bind(this)}
        />
      </div>
    )
  }
}

export const blockRendererFn = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media
    }
  }
}
