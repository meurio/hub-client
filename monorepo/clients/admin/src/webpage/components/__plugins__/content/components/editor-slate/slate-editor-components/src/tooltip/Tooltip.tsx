

// FIXME: Needs to handle assets files to work with SSR
import('./Tooltip.css')

const Tooltip: any = ({ children, className, ...properties }) =>
  <div
    {...properties}
    className="tooltip--container"
    contentEditable={false}
  >
    {children}
  </div>
;

Tooltip.Item = ({ children, ...properties }) =>
  <div {...properties} className="tooltip--item">
    {children}
  </div>
;

export default Tooltip
