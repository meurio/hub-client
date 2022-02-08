import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const DomainPreview = ({
  domain,
  menuComponent: MenuComponent,
  checked,
  isActive,
  onToggle,
  successIconTitle,
  failureIconTitle
}) => (
  <div
    className={classnames('table-row', { active: isActive })}
    style={{ borderLeftColor: checked ? '#7ed321' : 'red' }}
  >
    <div className='wrapper'>
      <div className='text' style={{ width: 30 }}>
        <span className={`circle${checked ? ' checked' : ''}`}>
          {checked
            ? <i className='fa fa-check' title={successIconTitle} />
            : <i className='fa fa-close' title={failureIconTitle} />
          }
        </span>
      </div>
    </div>

    <div className='wrapper cell--domain-name' style={{ flex: '10' }}>
      <div className='text' onClick={onToggle}>
        {domain.domain_name}
      </div>
    </div>

    <div className='wrapper'>
      <div className='text'>
        {MenuComponent && (
          <div className='menu--preview'>
            {MenuComponent}
          </div>
        )}
      </div>
    </div>
  </div>
)

DomainPreview.propTypes = {
  domain: PropTypes.object,
  isActive: PropTypes.bool,
  checked: PropTypes.bool,
  menuComponent: PropTypes.element,
  onToggle: PropTypes.func,
  successIconTitle: PropTypes.string,
  failureIconTitle: PropTypes.string
}

export default DomainPreview
