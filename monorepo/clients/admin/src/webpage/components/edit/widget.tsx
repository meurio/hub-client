import classnames from 'classnames'
// import urljoin from 'url-join'
import type { Block, Mobilization, Widget } from '../../reducers'
// import { Loading } from './../../components/await'
import WidgetOverlay from './widget-overlay.connected'
import widgetsPlugins from "../__plugins__/config";

export interface WidgetProperties {
  mobilization: Mobilization;
  widget: Widget;
  block: Block;
  editable: boolean;
  update: (widget: Widget) => void;
  saving: boolean;
  // Injected by react-intl
  // intl: intlShape.isRequired  
}

const WidgetFC = ({
  saving,
  mobilization,
  block,
  widget,
  update,
  editable,
  // intl,
  // history
}: WidgetProperties): React.ReactElement => {
  // Resize column widget
  const { sm_size: smSize, md_size: mdSize, lg_size: lgSize, kind } = widget
  const styleClassName = classnames(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `px2 col mb4 md-mb0 col-${smSize}`,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `sm-col-${smSize} md-col-${mdSize} lg-col-${lgSize}`
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetConfig: any = widgetsPlugins(mobilization, widget, {
    intl: {
      formatMessage: ({ defaultMessage }) => defaultMessage
    }
  }).find(w => w.kind === kind);

  const { component: WrapperComponent, redirect } = widgetConfig

  return (
    <div className={styleClassName}>
      {/* {saving && <Loading />} */}
      {saving && <p>Loading...</p>}
      {editable && redirect ? (
        <WidgetOverlay
          widget={widget}
          onEdit={(): void => {
            console.log("onEdit widget");
            // if (widget.kind === 'pressure') {
            //   const url = urljoin(import.meta.env.VITE_DOMAIN_ADMIN_CANARY, `/widgets/${widget.id}/settings`);
            //   window.open(url, '_self');
            // } else {
            //   history.push(redirect);
            // }
          }}
          onDelete={(): void => {
            const message = 'Deseja remover o widget?';
            // intl.formatMessage({
            //   id: 'c--content-widget.delete-widget.confirm.message',
            //   defaultMessage: 'Deseja remover o widget?'
            // })
            if (window.confirm(message)) {
              update({
                ...widget,
                settings: {},
                kind: 'draft'
              })
            }
          }}
        >
          <WrapperComponent
            {...{ mobilization, block, widget, update, editable }}
          />
        </WidgetOverlay>
      ) : (!editable && kind === 'draft' ? undefined : (
        <WrapperComponent
          {...{ mobilization, block, widget, update, editable }}
        />
      ))}
    </div>
  )
}

export default WidgetFC;
