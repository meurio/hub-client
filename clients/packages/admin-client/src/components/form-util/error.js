import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const Error = ({ message, classes, styles }) => (
  <div
    className={classnames('p1 border-left border-red mb1 rounded-right red bold', classes)}
    style={{ ...styles }}>
    {message}
  </div>
)

Error.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.array,
  styles: PropTypes.object
}

Error.defaultProps = {
  classes: [],
  styles: { backgroundColor: '#f9cace', borderWidth: '8px' }
}

export default Error
