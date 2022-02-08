const AlignmentNode: React.FC<any> = ({ children, node: { data } }) => {
  let Node: any = 'div'
  if (data.get('currentBlockType') === 'grid-cell') Node = 'td'

  return (
    <Node style={{ textAlign: `${data.get('align')}` }}>
      {children}
    </Node>
  )
}

export default AlignmentNode
