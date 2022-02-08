import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import CountUp from 'react-countup'

const PressureCount = ({ value, color, text, startCounting }) => {
  /* TODO: support all browser
   * -webkit-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * -moz-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   */
  const pressureCount = {
    boxShadow: 'inset 0px 15px 18px -10px rgba(227,224,227,1)'
  }
  return (
    <div className='pressure-count p3 bg-white rounded-bottom' style={pressureCount}>
      <div className='center m0'>
        <div className='h1' style={{ color }}>
          <CountUp
            start={0}
            end={!isNaN(value) && startCounting ? Number(value) : 0}
            duration={5}
          />
        </div>
        <span className='black bold h3 ml1'>
          {text || (
            <FormattedMessage
              id='c--pressure-count.text.default'
              defaultMessage='pressões feitas'
            />
          )}
        </span>
      </div>
    </div>
  )
}

PressureCount.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  startCounting: PropTypes.bool
}

PressureCount.defaultProps = {
  value: 0,
  startCounting: false
}

export default PressureCount
