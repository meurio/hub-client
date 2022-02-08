import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
// TODO: should remove EditorOld??
import { DraftEditor, SlateEditor } from './components'

class Content extends React.Component {

  render () {
    let { widget: { settings } } = this.props
    try {
      // If parse content is RebooEditor
      const content = JSON.parse(settings.content)
      return content.entityMap ? (
        <DraftEditor {...this.props} />
      ) : (
        <SlateEditor {...this.props} content={settings.content} readOnly />
      )
    } catch (e) {
      // TODO: not silenty exception
      // When settings.content isn't a JSON object should be HTML
      return <div dangerouslySetInnerHTML={{ __html: settings.content }} />
    }
  }
}

const { object, shape, string, oneOfType } = PropTypes

Content.propTypes = {
  mobilization: object.isRequired,
  widget: shape({
    settings: shape({
      content: oneOfType([string, object]).isRequired
    }),
  }).isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(Content)