/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import classnames from 'classnames'

import ImageDataModal from './ImageDataModal'
import ImageEditLayer from './ImageEditLayer'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./ImageNode.module.css')

class ImageNode extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalActive: false }
  }

  modal(isModalActive) {
    if (isModalActive) {
      const { editor: { onChange, props: { value } } } = this.props
      onChange(value.change().select())
    }

    this.setState({ isModalActive })
  }

  render() {
    const { isModalActive } = this.state
    const {
      node,
      attributes,
      readOnly,
      isSelected,
      editor: {
        onChange,
        props: { value }
      }
    } = this.props

    return (
      <span>
        {!isModalActive ? null : (
          <ImageDataModal
            node={node}
            value={value}
            onChange={onChange}
            changeModalState={this.modal.bind(this)}
          />
        )}

        <div className={classnames('image-node--container', { readonly: readOnly })}>
          {this.props.children}
          {isSelected && (
            <ImageEditLayer
              changeModalState={this.modal.bind(this)}
              text="Editar"
            />
          )}
          {!readOnly && !isSelected && (
            <ImageEditLayer
              text="Selecione a imagem para editar"
            />
          )}
          {("REACT_APP_DOMAIN_IMAGINARY" in process.env) ?
            <img
              {...attributes}
              role="presentation"
              loading="lazy"
              className={`image-node ${!readOnly && isSelected && 'selected'}`}
              src={`${process.env.REACT_APP_DOMAIN_IMAGINARY}/convert?url=${node.data.get('src')}&type=auto`}
              title={node.data.get('title')}
              alt={node.data.get('title')}
            /> :
            <img
              {...attributes}
              role="presentation"
              loading="lazy"
              className={`image-node ${!readOnly && isSelected && 'selected'}`}
              src={node.data.get('src')}
              title={node.data.get('title')}
              alt={node.data.get('title')}
            />
          }
        </div>
      </span>
    )
  }
}

export default ImageNode
