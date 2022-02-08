import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import tinycolor from 'tinycolor2'
import * as formatNumberHelper from 'utils/format-number-helper'

if (require('exenv').canUseDOM) require('./progress.scss')

const colorStrategy = color => tinycolor(color).isDark() ? '#FFFFFF' : '#333333'

const Progress = ({
  className,
  value,
  max,
  valueTopLeft,
  valueTopCenter,
  valueTopRight,
  valueBottomLeft,
  valueBottomCenter,
  valueBottomRight,
  fillColor
}) => (
  <div className={classnames('progress-container', className)}>
    <div className='progress-top'>
      {valueTopLeft && <div className='progress-top-left'>{valueTopLeft}</div>}
      {valueTopCenter && <div className='progress-top-center'>{valueTopCenter}</div>}
      {valueTopRight && <div className='progress-top-right'>{valueTopRight}</div>}
    </div>

    <div className='progress' value={value} max={max}>
      <div className='progress-value'
        style={{
          backgroundColor: fillColor,
          width: `${value > 100 ? 100 : value}%`
        }}
      >
        {value > 5 && (
          <span className='percentage' style={{ color: colorStrategy(fillColor) }}>
            {formatNumberHelper.number(value).split(',')[0]}%
          </span>
        )}
      </div>
    </div>

    <div className='progress-bottom'>
      {valueBottomLeft && <div className='progress-bottom-left'>{valueBottomLeft}</div>}
      {valueBottomCenter && <div className='progress-bottom-center'>{valueBottomCenter}</div>}
      {valueBottomRight && <div className='progress-bottom-right'>{valueBottomRight}</div>}
    </div>
  </div>
)

Progress.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  max: PropTypes.number,
  valueTopLeft: PropTypes.node,
  valueTopRight: PropTypes.node,
  valueTopCenter: PropTypes.node,
  valueBottomLeft: PropTypes.node,
  valueBottomRight: PropTypes.node,
  valueBottomCenter: PropTypes.node,
  fillColor: PropTypes.string
}

Progress.defaultProps = {
  max: 100,
  value: 0,
  fillColor: 'hsl(171, 100%, 41%)'
}

export default Progress
