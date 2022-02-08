/* eslint-disable react/prop-types */
import React from 'react'

// FIXME: Needs to handle assets files to work with SSR
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('exenv').canUseDOM) require('./Modal.css')

const Modal = ({ children }) => (
  <div className="modal--layer" contentEditable={false}>
    <div className="modal--container">
      {children}
    </div>
  </div>
)

// eslint-disable-next-line react/display-name
Modal.Header = ({ title = 'Editar', closeButtonAction }) => (
  <div className="modal--header">
    {title}
    {closeButtonAction && (
      <button
        className="button--close"
        onClick={closeButtonAction}
        title='Fechar'
      />
    )}
  </div>
)

export default Modal
