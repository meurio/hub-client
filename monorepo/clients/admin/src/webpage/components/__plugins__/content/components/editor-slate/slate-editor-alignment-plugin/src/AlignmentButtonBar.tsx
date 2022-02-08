import AlignmentCenterButton from './AlignmentCenterButton'
import AlignmentLeftButton from './AlignmentLeftButton'
import AlignmentRightButton from './AlignmentRightButton'

// FIXME: Needs to handle assets files to work with SSR
import('./AlignmentButtonBar.css')


function AlignmentButtonBar(properties) {
  return <div className="slate-alignment-plugin--button-bar">
    <AlignmentLeftButton {...properties} />
    <AlignmentCenterButton {...properties} />
    <AlignmentRightButton {...properties} />
  </div>
}

export default AlignmentButtonBar
