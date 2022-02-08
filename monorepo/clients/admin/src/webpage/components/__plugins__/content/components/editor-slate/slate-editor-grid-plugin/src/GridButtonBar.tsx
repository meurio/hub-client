import GridButton from './GridButton';
import GridSplitRowButton from "./GridSplitRowButton";

// FIXME: Needs to handle assets files to work with SSR
import('./GridButtonBar.css')


function GridButtonBar(properties) {
  return <div className='slate-grid-plugin--button-bar'>
    <GridButton {...properties} />
    <GridSplitRowButton {...properties} />
  </div>
}

export default GridButtonBar
