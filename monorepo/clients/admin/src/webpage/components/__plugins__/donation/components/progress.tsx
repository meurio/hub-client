import classnames from 'classnames'
import tinycolor from 'tinycolor2'
import * as formatNumberHelper from './format-number-helper'

import('./progress.scss')

interface ProgressProperties {
  className?: string;
  value?: number;
  max?: number;
  valueTopLeft?: any;
  valueTopRight?: any;
  valueTopCenter?: any;
  valueBottomLeft?: any;
  valueBottomRight?: any;
  valueBottomCenter?: any;
  fillColor?: string;
}

const colorStrategy = color => tinycolor(color).isDark() ? '#FFFFFF' : '#333333'

const Progress = ({
  className,
  value = 0,
  max,
  valueTopLeft,
  valueTopCenter,
  valueTopRight,
  valueBottomLeft,
  valueBottomCenter,
  valueBottomRight,
  fillColor
}: ProgressProperties): React.ReactElement => {
  const progressArguments: any = { value, max };

  return (
    <div className={classnames('progress-container', className)}>
      <div className='progress-top'>
        {valueTopLeft && <div className='progress-top-left'>{valueTopLeft}</div>}
        {valueTopCenter && <div className='progress-top-center'>{valueTopCenter}</div>}
        {valueTopRight && <div className='progress-top-right'>{valueTopRight}</div>}
      </div>

      <div className='progress' {...progressArguments}>
        <div className='progress-value'
          style={{
            backgroundColor: fillColor,
            width: `${value > 100 ? 100 : value}%`
          }}
        >
          {value > 5 && (
            <span className='percentage' style={{ color: colorStrategy(fillColor) }}>
              {formatNumberHelper.number(value || 0).split(',')[0]}%
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
  );
}

Progress.defaultProps = {
  max: 100,
  value: 0,
  fillColor: 'hsl(171, 100%, 41%)'
}

export default Progress
