

function FontSizeMark({ children, mark: { data } }) {
  return <span
    style={{
      fontSize: Number.parseInt(data.get('fontSize'), 10),
      verticalAlign: 'middle'
    }}
  >
    {children}
  </span>
}

export default FontSizeMark
