import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import { Entity } from 'draft-js'

import Link from './Link'
import linkStrategy from './linkStrategy'

import EditorUtils from '../EditorUtils'
import getSelectionEntities from '../getSelectionEntities'

const getSelectionLink = (editorState) => {
  // Return entity when one and only one selected
  return getSelectionEntities(editorState, 'LINK').last()
}

export default class LinkControls extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showInput: false,
      href: '',
      target: '_self'
    }
  }

  componentWillReceiveProps (nextProps) {
    const { editorState } = nextProps
    if (editorState !== this.props.editorState) {
      const entityLink = getSelectionLink(this.props.editorState)
      const nextEntityLink = getSelectionLink(editorState)
      if (nextEntityLink && nextEntityLink !== entityLink) {
        const entityInstance = Entity.get(nextEntityLink.entityKey)
        const { href, target } = entityInstance.getData()
        this.setState({ href, target, hasLink: true })
      } else {
        this.setState({ href: '', target: '_self', hasLink: false })
      }
    }
  }

  handleToggleInput () {
    this.setState({ showInput: !this.state.showInput })
  }

  confirmLink () {
    const { editorState, setEditorState } = this.props

    if (this.state.href) {
      const { href, target } = this.state
      setEditorState(EditorUtils.toggleLink(editorState, { href, target }))
    } else {
      setEditorState(EditorUtils.toggleLink(editorState, null))
    }

    this.setState({ showInput: false })
    this.props.focusEditor()
  }

  removeLink () {
    const { editorState, setEditorState } = this.props
    setEditorState(EditorUtils.toggleLink(editorState, null))
    this.props.focusEditor()
  }

  handleChangeTarget (e) {
    this.setState({ target: e.target.checked ? '_blank' : '_self' })
  }

  render () {
    const { buttonClassName, popoverClassName } = this.props

    return (
      <div className='linkControls'>
        <button className={classnames(buttonClassName, this.state.hasLink ? 'active' : null)} onClick={this.handleToggleInput.bind(this)}>
          <i className='fa fa-link' />
        </button>
        {this.state.showInput && (
          <div className={popoverClassName}>
            <div className='flex flex-wrap'>
              <input
                type='text'
                value={this.state.href}
                onChange={e => this.setState({ href: e.target.value })}
                className='input col-8 m0'
              />
              <button
                className='btn btn-outline white mx1'
                onClick={this.confirmLink.bind(this)}
              >
                <i className='fa fa-check' />
              </button>
            </div>
            <div className='flex flex-wrap mt1'>
              <input
                id='targetId'
                type='checkbox'
                onChange={this.handleChangeTarget.bind(this)}
                value={this.state.target}
                checked={this.state.target === '_blank'}
                data-wysihtml5-dialog-field='target'
              />
              <label htmlFor='targetId' style={{ cursor: 'pointer', lineHeight: 'normal' }}>Abrir link em nova aba</label>
            </div>
          </div>
        )}
        <button className={buttonClassName} onClick={this.removeLink.bind(this)}>
          <i className='fa fa-unlink' />
        </button>
      </div>
    )
  }
}

LinkControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string
}

export const decorator = {
  strategy: linkStrategy,
  component: Link
}
