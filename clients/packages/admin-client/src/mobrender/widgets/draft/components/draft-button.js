import PropTypes from 'prop-types'
import React from 'react'

if (require('exenv').canUseDOM) require('./draft-button.scss')

const DraftButton = ({ icon, svgIcon: SVGIcon, label, updateKind, widget, ...props }) => {
  return (
    <div className='draft-widget-button col col-4 p1'>
      <button title={label} className='btn col-12' onClick={() => updateKind(props)}>
        <span className='content'>
          {icon && (<i className={`fa fa-${icon} block white`} />)}
          {SVGIcon && (<SVGIcon />)}
          {widget.lg_size !== 3 && (<span>{label}</span>)}
        </span>
      </button>
    </div>
  )
}

DraftButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  kind: PropTypes.string.isRequired,
  updateKind: PropTypes.func.isRequired,
  settings: PropTypes.object
}

export default DraftButton
