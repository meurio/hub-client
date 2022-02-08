import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const InputCounter = ({ maxLength, length, className }) => {
  const diff = maxLength - length

  return (
    <span className={classnames(className, { red: diff < 11 })}>
      {diff}
    </span>
  )
}

InputCounter.propTypes = {
  maxLength: PropTypes.number.isRequired,
  length: PropTypes.number,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default InputCounter
