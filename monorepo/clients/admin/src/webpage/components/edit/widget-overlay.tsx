import type { Widget } from "../../reducers";

interface WidgetOverlayProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  widget: Widget;
  onDelete: () => void;
  onEdit: () => void;
  hasMouseOver: boolean;
  onMouseOver: (key: string, id: number) => void
  onMouseOut: (key: string) => void
}

const overlayStyle: any = {
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  fontWeight: 'bold',
  borderWidth: '6px',
  opacity: '.82',
  backgroundColor: '#222222',
  fontSize: '1.8rem'
}

const WidgetOverlay = ({
  children,
  widget,
  onEdit,
  onDelete,
  onMouseOver,
  onMouseOut,
  hasMouseOver
}: WidgetOverlayProperties): React.ReactElement => (
  <div
    className='relative overlay'
    style={{ cursor: 'pointer' }}
    onMouseEnter={(): void => onMouseOver('widget', widget.id)}
    onMouseLeave={(): void => onMouseOut('widget')}
  >
    {children}
    {hasMouseOver ? (
      <div className='h1 rounded z1 border border-pagenta px2' style={overlayStyle}>
        <div className='table full-height col-12 center'>
          <div className='white table-cell align-middle'>
            <button
              type="button"
              className='btn m1 btn-edit'
              onClick={onEdit}
              title='Editar'
            >
              <i className='fa fa-edit' />
            </button>
            <button
              type="button"
              className='btn m1 btn-remove'
              onClick={onDelete}
              title='Remover'
            >
              <i className='fa fa-trash' />
            </button>
          </div>
        </div>
      </div>
    ) : undefined}
  </div>
);

export default WidgetOverlay
