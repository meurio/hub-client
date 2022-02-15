export default (block: any) => {
  let style = 'left';
  block.findStyleRanges((e: any) => {
    if (e.hasStyle('center')) style = 'center';
    if (e.hasStyle('right')) style = 'right';
  });
  return style;
};
