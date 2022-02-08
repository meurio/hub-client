import PropTypes from 'prop-types'
import React from 'react'

const SubdomainPreview = ({ subdomain, menuComponent: MenuComponent, checked }) => (
  <div className='table-row'>
    <div className='wrapper'>
      <div className='text' style={{ width: 30 }}>
        <span className={`circle${checked ? ' checked' : ''}`}>
          {checked ? <i className='fa fa-check' /> : <i className='fa fa-close' />}
        </span>
      </div>
    </div>

    <div className='wrapper' style={{ flex: 1 }}>
      <div className='text'>
        {subdomain.name.replace('\\052', '*')}
      </div>
    </div>

    <div className='wrapper' style={{ width: 100, padding: '0 20px', textAlign: 'center' }}>
      <div className='text'>
        {subdomain.record_type}
      </div>
    </div>

    <div className='wrapper' style={{ flex: 1 }}>
      <div className='text'>
        <div className={`body ${subdomain.record_type.toLowerCase()}`}>
          {subdomain.record_type === 'NS' || subdomain.record_type === 'MX' ? (
            <ul>
              {subdomain.value.split('\n').map((ns, index) => (
                <li
                  key={`ns-${index}`}
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                >
                  {ns}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {subdomain.value}
            </p>
          )}
        </div>
      </div>
    </div>

    <div className='wrapper' style={{ width: 60 }}>
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

SubdomainPreview.propTypes = {
  subdomain: PropTypes.object,
  checked: PropTypes.bool,
  menuComponent: PropTypes.element
}

SubdomainPreview.defaultProps = {
  checked: true
}

export default SubdomainPreview
