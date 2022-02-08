import PropTypes from 'prop-types'
import React from 'react'
import Box from './box'

var styles = require('exenv').canUseDOM ? require('./warning.scss') : {}

const Warning = ({ title, children }) => (
  <Box
    title={title}
    styles={styles}
    icon='exclamation-triangle'
  >
    {children}
  </Box>
)

Warning.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  children: PropTypes.any.isRequired
}

export default Warning
