import React from 'react'
import PropTypes from 'prop-types'
import { DraftEditor, SlateEditor } from '../plugins/content/components'

const FinishMessageCustom = ({ readOnly, widget }) => {
  const {
    settings: {
      finish_message: finishMessage,
      finish_message_background: finishMessageBackground
    }
  } = widget
  const content = valueParse(finishMessage)

  return content.entityMap ? (
    <DraftEditor
      readOnly={readOnly}
      value={content}
      editorStyle={{
        backgroundColor: `rgba(${finishMessageBackground})`,
        borderRadius: 3
      }}
    />
  ) : (
    <SlateEditor
      content={finishMessage}
      readOnly={readOnly}
      contentStyles={{ backgroundColor: '#fff', color: '#666', padding: 10 }}
    />
  )
}

//
// Helper functions
//
const valueParse = message => {
  try {
    return JSON.parse(message)
  } catch (e) {
    return message
  }
}

//
// PropTypes
//
FinishMessageCustom.propTypes = {
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message: PropTypes.string.isRequired,
      finish_message_background: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  readOnly: PropTypes.bool
}

FinishMessageCustom.defaultProps = {
  readOnly: true
}

export default FinishMessageCustom
