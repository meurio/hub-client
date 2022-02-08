import classnames from 'classnames'
import { Children, cloneElement } from 'react'
import { Editor } from 'slate-react'
//
// Nodes
//
import { AlignmentNode } from '../../slate-editor-alignment-plugin/src'
//
// Marks
//
import { BoldMark } from '../../slate-editor-bold-plugin/src'
import { ColorMark } from '../../slate-editor-color-plugin/src'
import { EmbedNode } from '../../slate-editor-embed-plugin/src'
import { FontFamilyMark } from '../../slate-editor-font-family-plugin/src'
import { FontSizeMark } from '../../slate-editor-font-size-plugin/src'
import { GridCellNode, GridNode, GridRowNode } from '../../slate-editor-grid-plugin/src'
import { ImageLinkNode, ImageNode } from '../../slate-editor-image-plugin/src'
import { ItalicMark } from '../../slate-editor-italic-plugin/src'
import { LinkNode } from '../../slate-editor-link-plugin/src'
import { ListItemNode, OrderedListNode, UnorderedListNode } from '../../slate-editor-list-plugin/src'
import { StrikethroughMark } from '../../slate-editor-strikethrough-plugin/src'
import { UnderlineMark } from '../../slate-editor-underline-plugin/src'

/* eslint-disable default-case */
export const renderNode = properties => {
  switch (properties.node.type) {
    case 'alignment': return <AlignmentNode {...properties} />
    case 'embed': return <EmbedNode {...properties} />
    case 'grid': return <GridNode {...properties} />
    case 'grid-row': return <GridRowNode {...properties} />
    case 'grid-cell': return <GridCellNode {...properties} />
    case 'image': return <ImageNode {...properties} />
    case 'imageLink': return <ImageLinkNode {...properties} />
    case 'link': return <LinkNode {...properties} />
    case 'list-item': return <ListItemNode {...properties} />
    case 'ordered-list': return <OrderedListNode {...properties} />
    case 'unordered-list': return <UnorderedListNode {...properties} />
  }
}

export const renderMark = properties => {
  switch (properties.mark.type) {
    case 'bold': return <BoldMark {...properties} />
    case 'color': return <ColorMark {...properties} />
    case 'font-family': return <FontFamilyMark {...properties} />
    case 'font-size': return <FontSizeMark {...properties} />
    case 'italic': return <ItalicMark {...properties} />
    case 'strikethrough': return <StrikethroughMark {...properties} />
    case 'underline': return <UnderlineMark {...properties} />
  }
}
/* eslint-disable default-case */

interface SlateContentProperties {
  className?: string;
  wrapperStyle?: any;
  style?: any;
  value?: any;
  outerState?: any;
  plugins?: any[];
  onChange?: () => void;
  onFocus: () => void;
  readOnly: boolean;
  onKeyDown: (event: any, data: any, state: any) => void
}

const SlateContent: React.FC<SlateContentProperties | any> = ({
  className,
  wrapperStyle = {},
  style = {},
  value,
  outerState = {},
  plugins = [],
  onChange,
  children,
  ...rest
}) => {
  const { readOnly } = outerState

  return (
    <div className={classnames('editor--content', className)} style={wrapperStyle}>
      <Editor
        plugins={plugins}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        outerState={outerState}
        style={style}
        renderNode={renderNode}
        renderMark={renderMark}
        {...rest}
      />

      {Children.map(children, (child: any) => cloneElement(child, rest))}
    </div>
  )
}

export default SlateContent;