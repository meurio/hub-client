import PropTypes from 'prop-types'
import React from 'react'

var styles = require('exenv').canUseDOM ? require('./summary.scss') : {}

const Summary = ({ value }) => (
  <div className={styles.summary}>
    <span className={styles.summaryHighlight}>{value}</span>
    <span>pessoas serão notificadas</span>
  </div>
)

Summary.propTypes = {
  value: PropTypes.number.isRequired
}

export default Summary
