import PropTypes from 'prop-types'
import React, { Component } from 'react'

// Current module dependencies
if (require('exenv').canUseDOM) require('./index.scss')

class WidgetOverlay extends Component {
  constructor (props, context) {
    super(props)
    this.context = context
    this.state = { hasMouseOver: false }
  }

  handleMouseEnter (e) {
    if (e) e.preventDefault()
    this.setState({ hasMouseOver: true })
  }

  handleMouseLeave (e) {
    if (e) e.preventDefault()
    this.setState({ hasMouseOver: false })
  }

  render () {
    const { children, editable, onClick, text } = this.props
    return (
      <div className='relative'
        style={editable ? { cursor: 'pointer' } : null}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={onClick}
      >
        {children}
        {
          !editable || !this.state.hasMouseOver ? null : (
            <div className='widget-overlay h1 rounded z1 border border-pagenta px2'>
              <div className='table full-height col-12 center'>
                <div className='white table-cell align-middle'>
                  {text || 'Clique para editar'}
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

WidgetOverlay.propTypes = {
  editable: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string
}

WidgetOverlay.defaultProps = {
  editable: false
}

export default WidgetOverlay
