import PropTypes from 'prop-types'
import React from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

const DomainStep = ({ children, title, step, isValid }) => {
  const icon = isValid ? (
    <span className='circle valid'><i className='fa fa-check' /></span>
  ) : (
    <span className='circle bg-pagenta'><p>{step}</p></span>
  )

  return (
    <div className={`domain--step step-${step}`}>
      <div className='header--step'>
        {icon}<h2>{title}</h2>
      </div>
      <div className='content--step'>
        {children}
      </div>
    </div>
  )
}

DomainStep.propTypes = {
  title: PropTypes.string,
  // Injected by <Steps />
  step: PropTypes.number,
  isValid: PropTypes.bool
}

export default DomainStep
