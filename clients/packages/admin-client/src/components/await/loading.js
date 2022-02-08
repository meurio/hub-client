import React from 'react'
import classnames from 'classnames'

const Loading = ({ localized, backgroundColor, loaderColor, className }) => (
  <div
    className={classnames(
      { absolute: localized, fixed: !localized },
      'top-0 right-0 bottom-0 left-0 z9',
      className
    )}
    style={{ backgroundColor }}
  >
    <div className='table col-12 center full-height'>
      <i
        className='fa fa-circle-o-notch fa-spin fa-3x fa-w table-cell align-middle'
        style={{ color: loaderColor }}
      />
    </div>
  </div>
)

Loading.defaultProps = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  loaderColor: 'rgba(255, 255, 255, 1)'
}

export default Loading
