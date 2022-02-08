import widgetsPlugins from '../../config';
import type { Mobilization, Widget } from "../../../../reducers";
import DraftButton from './draft-button'
import('./draft.scss')

interface WidgetComponentProperties {
  mobilization: Mobilization;
  widget: Widget;
  update: (widget: Widget) => void;
}

const Draft = ({
  mobilization,
  widget,
  update
}: WidgetComponentProperties): React.ReactElement => {
  const widgetsConfig = widgetsPlugins(
    mobilization,
    widget,
    { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } }
  ).filter(w => w.kind !== 'draft')

  return (
    <div className='draft-widget widget center rounded lightgray clearfix'>
      {widgetsConfig.map((widgetConfig) => (
          <DraftButton
            key={widgetConfig.kind}
            label={widgetConfig.label || ""}
            widget={widget}
            updateKind={(): any => {
              update({
                ...widget,
                kind: widgetConfig.kind,
                settings: widgetConfig.settings
              })
            }}
          />
        )
      )}
    </div>
  )
}

export default Draft;
