import type { Widget } from "../../../../reducers";
import('./draft-button.scss')

interface DraftButtonProperties {
  label: string;
  icon?: string;
  svgIcon?: any;
  updateKind: () => void
  widget: Widget
}

const DraftButton = ({
  icon,
  svgIcon: SVGIcon,
  label,
  updateKind,
  widget
}: DraftButtonProperties): React.ReactElement => (
  <div className='draft-widget-button col col-4 p1'>
    <button type="button" title={label} className='btn col-12' onClick={updateKind}>
      <span className='content'>
        {icon && (<i className={`fa fa-${icon} block white`} />)}
        {SVGIcon && (<SVGIcon />)}
        {widget.lg_size !== 3 && (<span>{label}</span>)}
      </span>
    </button>
  </div>
);

export default DraftButton
