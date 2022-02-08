


function GridNode({ attributes, children }) {
  return <table style={{ width: '100%', tableLayout: 'fixed' }}>
    <tbody {...attributes}>
      {children}
    </tbody>
  </table>
}

export default GridNode
