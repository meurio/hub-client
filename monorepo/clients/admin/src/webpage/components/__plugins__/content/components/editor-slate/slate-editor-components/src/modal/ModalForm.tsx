import classnames from 'classnames'

// FIXME: Needs to handle assets files to work with SSR
import('./ModalForm.css')

const ModalForm: any = ({ children, className, ...properties }): React.ReactElement =>
  <form
    className={classnames('modal--form', className)}
    {...properties}
  >
    {children}
  </form>
;

ModalForm.Group = ({ children, className, ...properties }): React.ReactElement =>
  <div
    className={classnames('modal--form-group', className)}
    {...properties}
  >
    {children}
  </div>
;

ModalForm.LabelHelper = ({ children, className, ...properties }): React.ReactElement =>
  <span
    className={classnames('modal--form-label-helper', className)}
    {...properties}
  >
    {children}
  </span>
;

export default ModalForm
