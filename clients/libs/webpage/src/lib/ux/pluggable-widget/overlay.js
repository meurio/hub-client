import React from 'react'
/*import PropTypes from 'prop-types'*/

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

class Overlay extends React.Component {

  constructor (props) {
    super(props)
    this.state = { hasMouseOver: false }
  }

  render () {
    const { children, onEdit, onDelete } =  this.props
    return (
      <div
        className='relative overlay'
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => this.setState({ hasMouseOver: true })}
        onMouseLeave={() => this.setState({ hasMouseOver: false })}
      >
        {children}
        {this.state.hasMouseOver ? (
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
  }
}

export default Overlay
