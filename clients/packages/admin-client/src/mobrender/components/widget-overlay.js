import PropTypes from 'prop-types'
import React from 'react'

const overlayStyle = {
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
}) => (
  <div
    className='relative overlay'
    style={{ cursor: 'pointer' }}
    onMouseEnter={() => onMouseOver('widget', widget.id)}
    onMouseLeave={() => onMouseOut('widget')}
  >
    {children}
    {hasMouseOver ? (
      <div className='h1 rounded z1 border border-pagenta px2' style={overlayStyle}>
        <div className='table full-height col-12 center'>
          <div className='white table-cell align-middle'>
            <button
              className='btn m1 btn-edit'
              onClick={onEdit}
              title='Editar'
            >
              <i className='fa fa-edit' />
            </button>
            <button
              className='btn m1 btn-remove'
              onClick={onDelete}
              title='Remover'
            >
              <i className='fa fa-trash' />
            </button>
          </div>
        </div>
      </div>
    ) : null}
  </div>
)

WidgetOverlay.propTypes = {
  widget: PropTypes.object,
  onClick: PropTypes.func,
  // Injected by react-redux
  hasMouseOver: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
}

export default WidgetOverlay
