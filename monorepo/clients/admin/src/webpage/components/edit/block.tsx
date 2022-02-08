import BlockChangeBackground from './block-change-background.connected'
import { EDIT_KEY } from './block-config-menu'
import BlockConfigMenu from './block-config-menu.connected'
import type { Widget as IWidget } from "../../reducers";
import Widget from './widget.connected'

interface BlockProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  block: any;
  widgets: IWidget[],
  editable: boolean;
  // Injected by redux
  hasMouseOver: boolean;
  onMouseOver: (key: string, id: number) => void;
  onMouseOut: (key: string) => void;
  onCancelEdit: (block: any) => void;
  editing?: string;
  saving: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history?: any
}

export const HOVER_MOUSE_KEY = 'block'

// eslint-disable-next-line consistent-return
const getBackgroundStyle = (block: any): any | undefined => {
  if (block.bg_image) return { background: `url('${block.bg_image}') no-repeat`, backgroundSize: 'cover' }
  if (block.bg_class) {
    try {
      const rgba = JSON.parse(block.bg_class)
      return {
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    } catch {
      // Silent error because use className
    }
  }
}

const Block = ({
  block,
  widgets,
  editable,
  hasMouseOver,
  onMouseOver,
  onMouseOut,
  onCancelEdit,
  editing,
  saving,
  history
}: BlockProperties): React.ReactElement => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    id={`block-${block.id}`}
    onMouseEnter={(): void => {
      if (editable && !editing) onMouseOver(HOVER_MOUSE_KEY, block.id)
    }}
    onMouseLeave={(): void => {
      if (editable && !editing) onMouseOut(HOVER_MOUSE_KEY)
    }}
    onKeyUp={(event_): void => {
      // ESC keycode
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (event_.keyCode === 27) {
        onCancelEdit(block)
      }
    }}
    className={block.bg_class && !block.bg_class.includes('{') ? block.bg_class : undefined}
    style={getBackgroundStyle(block)}
  >
    <div className='col-10 mx-auto'>
      {editing === `${EDIT_KEY}-${block.id}` ? <BlockChangeBackground block={block} /> : null}
      <div className='clearfix widgets' style={{ padding: '5em 0' }}>
        {widgets.map(widget => (
          <Widget
            key={`widget-${widget.id}`}
            widget={widget}
            block={block}
            editable={editable}
            history={history}
          />
        ))}
      </div>
      {block.hidden && (
        <div className='relative'>
          <div className='absolute bottom-0 left-0 ml1 mb1 bg-darken-2 p1 white rounded hidden-tag'>
            <i className='fa fa-eye-slash mr1' />{' '}
            Escondido
            {/* <FormattedMessage
              id='mobrender.components--block.hidden-tag'
              defaultMessage='Escondido'
            /> */}
          </div>
        </div>
      )}
      <div className='relative'>
        <BlockConfigMenu
          block={block}
          widgets={widgets}
          display={editable && hasMouseOver && !editing && !saving}
        />
      </div>
    </div>
  </div>
);

export default Block
