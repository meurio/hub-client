import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Widget from './widget.connected'
import BlockConfigMenu from './block-config-menu.connected'
import { EDIT_KEY } from './block-config-menu'
import BlockChangeBackground from './block-change-background.connected'

export const HOVER_MOUSE_KEY = 'block'

const getBackgroundStyle = block => {
  if (block.bg_image) return { background: `url('${block.bg_image}') no-repeat`, backgroundSize: 'cover' }
  else if (block.bg_class) {
    try {
      const rgba = JSON.parse(block.bg_class)
      return {
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    } catch (ex) {
      // Silent error because use className
    }
  }
}

const Block = ({ block, widgets, editable, hasMouseOver, onMouseOver, onMouseOut, onCancelEdit, editing, saving, history }) => (
  <div
    id={`block-${block.id}`}
    onMouseEnter={() => {
      if (editable && !editing) onMouseOver(HOVER_MOUSE_KEY, block.id)
    }}
    onMouseLeave={() => {
      if (editable && !editing) onMouseOut(HOVER_MOUSE_KEY)
    }}
    onKeyUp={evt => {
      // ESC keycode
      if (evt.keyCode === 27) {
        onCancelEdit(block)
      }
    }}
    className={block.bg_class && block.bg_class.indexOf('{') === -1 ? block.bg_class : undefined}
    style={getBackgroundStyle(block)}
  >
    <div className='col-10 mx-auto'>
      {editing === `${EDIT_KEY}-${block.id}` ? <BlockChangeBackground block={block} /> : null}
      <div className='clearfix widgets' style={{ padding: '5em 0' }}>
        {widgets && widgets.map(widget => (
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
            <FormattedMessage
              id='mobrender.components--block.hidden-tag'
              defaultMessage='Escondido'
            />
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
)

Block.propTypes = {
  block: PropTypes.object.isRequired,
  widgets: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  // Injected by redux
  hasMouseOver: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onCancelEdit: PropTypes.func,
  editing: PropTypes.string,
  saving: PropTypes.bool
}

export default Block
