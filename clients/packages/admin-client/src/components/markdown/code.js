import React from 'react'

var styles = require('exenv').canUseDOM ? require('./code.scss') : {}

export default ({ children, bordered }) => (
  <span className={bordered ? styles.bordered : styles.code}>
    {children}
  </span>
)
