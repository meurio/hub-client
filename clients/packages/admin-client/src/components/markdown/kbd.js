import React from 'react'

var styles = require('exenv').canUseDOM ? require('./kbd.scss') : {}

const Kbd = ({ children }) => (
  <kbd className={styles.kbd}>
    {children}
  </kbd>
)

export default Kbd
