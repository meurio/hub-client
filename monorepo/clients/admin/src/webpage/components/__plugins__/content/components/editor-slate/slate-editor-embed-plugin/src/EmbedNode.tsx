import classnames from 'classnames'


// FIXME: Needs to handle assets files to work with SSR
import('./EmbedNode.css')


function EmbedNode({ attributes, editor, children, node, isFocused }) {
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
