// FIXME: Needs to handle assets files to work with SSR
import('./ModalButton.css')

const Container: React.FC = ({ children }) =>
  <div className="modal-button--container">
    {children}
  </div>
;

const Primary: React.FC<any> = ({ text, type = 'button', onClick }) =>
  <button
    type={type}
    className="primary"
    onClick={onClick}
  >
    {text}
  </button>
;

const Opaque: React.FC<any> = ({ text, type = 'button', onClick }) =>
  <button
    type={type}
    className="opaque"
    onClick={onClick}
  >
    {text}
  </button>
;

const Danger: React.FC<any> = ({ text, type = 'button', onClick }) =>
  <button
    type={type}
    className="danger"
    onClick={onClick}
  >
    {text}
  </button>
;

export default {
  Container,
  Primary,
  Opaque,
  Danger
}
