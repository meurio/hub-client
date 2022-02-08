import PropTypes from 'prop-types'
import React from 'react'

var styles = require('exenv').canUseDOM ? require('./preformatted.scss') : {}

const Preformatted = ({ children, backgroundColor, color }) => (
  <pre className={styles.preformatted} style={{ backgroundColor, color }}>
    <code>
      {children}
    </code>
  </pre>
)

Preformatted.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
}

export default Preformatted
