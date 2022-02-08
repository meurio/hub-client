import React from 'react'
import ReactDOM from 'react-dom'

class WYSIHTMLToolbarInsertHTML extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { insertHTMLContent: null }
  }

  handleInsertHTMLChange (e) {
    this.setState({ insertHTMLContent: e.target.value })
  }

  handleInsertHTMLClick () {
    // When the insert button is pressed, the insertHTML dialog is not being closed. So we are forcing it
    // by simulating a click in the cancel button
    ReactDOM.findDOMNode(this.refs.cancelButton).click()
  }

  render () {
    return (
      <div
        data-wysihtml5-dialog='insertHTMLForm'
        style={{ display: 'none' }}
        className='white p2 bg-darken-3'
      >
        <label className='col mr1' htmlFor='embed' style={{ lineHeight: '40px' }}>
          Incorporar
        </label>
        <input
          type='text'
          name='embed'
          className='input mr2 ml1 col col-7'
          value={this.state.insertHTMLContent}
          onChange={this.handleInsertHTMLChange.bind(this)}
        />
        <a
          data-wysihtml5-command='insertHTML'
          data-wysihtml5-command-value={this.state.insertHTMLContent}
          onClick={this.handleInsertHTMLClick.bind(this)}
          className='btn btn-outline mr1'
          href='/inserir'>
          Inserir
        </a>
        <a
          ref='cancelButton'
          data-wysihtml5-dialog-action='cancel'
          className='btn btn-transparent'
          href='/cancelar'>
          Cancelar
        </a>
      </div>
    )
  }
}

export default WYSIHTMLToolbarInsertHTML
