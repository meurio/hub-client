export default block => {
  let style = 'left'
  block.findStyleRanges(e => {
    if (e.hasStyle('center')) style = 'center'
    if (e.hasStyle('right')) style = 'right'
  })
  return style
}
