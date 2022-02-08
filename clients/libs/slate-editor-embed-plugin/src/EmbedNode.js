/* eslint-disable react/prop-types */
import React from 'react'
import classnames from 'classnames'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./EmbedNode.css')


const EmbedNode = ({ attributes, node, isFocused }) => {
  return (
    <span
      {...attributes}
      className={classnames(
        'slate-embed-plugin--node',
        { active: isFocused },
      )}
      dangerouslySetInnerHTML={{ __html: node.data.get('embed') }}
    />
  )
}

export default EmbedNode
