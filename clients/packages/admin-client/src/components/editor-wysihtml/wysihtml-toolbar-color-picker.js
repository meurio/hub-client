import React from 'react'

import { ColorPicker } from 'components/color-picker'

if (require('exenv').canUseDOM) require('./wysihtml-toolbar-color-picker.scss')

class WYSIHTMLToolbarColorPicker extends React.Component {
  constructor () {
    super()
    this.state = { color: '#000000' }
  }
  handleChange ({ hex }) {
    this.setState({ color: hex })
  }

  render () {
    return (
      <div
        data-wysihtml5-dialog='foreColorStyle'
        style={{ display: 'none', top: '36px', right: '105px' }}
        className='white p2 absolute'
      >
        <input
          type='text'
          data-wysihtml5-dialog-field='color'
          value={this.state.color}
          onChange={this.handleChange.bind(this)}
          className='hide'
        />
        <ColorPicker
          onChangeColor={this.handleChange.bind(this)}
          color={this.state.color}
        />

        <div className='save-button bg-atomic p1'>
          <a
            data-wysihtml5-dialog-action='save'
            className='btn block center bg-aqua caps rounded'
            href='/aplicar'
          >
            Aplicar cor
          </a>
        </div>
      </div>
    )
  }
}

export default WYSIHTMLToolbarColorPicker
