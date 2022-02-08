import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const Input = ({ uid, type, label, placeholder, onChange, required, show, classes }) => (
  <div className='mb2 form-group' style={{ display: !show ? 'none' : 'block' }}>
    <label
      className='caps bold mb1 inline-block white'
      style={{
        fontSize: '.75rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'white'
      }}
    >
      {label}{required ? ' *' : ''}
    </label>
    <input
      id={'input-' + uid}
      className={classnames('input block border border-gray94', classes)}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
    />
  </div>
)

Input.propTypes = {
  uid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  show: PropTypes.bool,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

Input.defaultProps = {
  onChange: () => {},
  required: false,
  show: true,
  classes: []
}

export default Input
