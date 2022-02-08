import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import CountUp from 'react-countup'

const styles = {
  count: {
    boxShadow: 'inset 0px 15px 18px -10px rgba(227,224,227,1)',
    WebkitBoxShadow: 'inset 0px 15px 18px -10px rgba(227,224,227,1)',
    MozBoxShadow: 'inset 0px 15px 18px -10px rgba(227,224,227,1)'
  }
}
const Count = ({ value, color, text, startCounting }) => {
  return (
    <div className='pressure-count p3 bg-white rounded-bottom' style={styles.count}>
      <div className='center m0'>
        <div className='h1' style={{ color }}>
          <CountUp
            start={0}
            end={!isNaN(value) ? Number(value) : 0}
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

Count.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
  startCounting: PropTypes.bool
}

Count.defaultProps = {
  value: 0,
  startCounting: false
}

export default Count
