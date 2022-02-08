

// FIXME: Needs to handle assets files to work with SSR
import('./ModalContent.css')

function ModalContent({ children }) {
  return <div className="modal--content">
    {children}
  </div>
}

ModalContent.Left = function ({ children }) {
  return <div className="modal--content-left">
    {children}
  </div>
}

ModalContent.Right = function ({ children }) {
  return <div className="modal--content-right">
    {children}
  </div>
}

export default ModalContent
