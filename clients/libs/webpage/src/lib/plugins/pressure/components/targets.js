import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { arrayUtils, pressureUtils } from '../utils'

if (require('exenv').canUseDOM) require('./targets.scss')

const parseTarget = target => {
  const targetSplit = target.split('<')
  const valid = targetSplit.length === 2
  return valid ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') } : null
}

class TargetList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      targets: props.targets,
      selectedTargets: []
    }
  }

  render () {
    const { targets } = this.state
    const pressureType = pressureUtils.getType(targets)
    const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE

    return (
      <div className='target-list px2 py1'>
        <div className='target-list-label bold'>
          <FormattedMessage
            id='pressure-widget--target-list.label.email'
            defaultMessage={`
              Quem você vai pressionar ({targetsCount} {targetsCount, plural,
                one {alvo}
                other {alvos}
              })
            `}
            values={{ targetsCount: String(arrayUtils.clean(targets).length) }}
          />
        </div>
        <div className='target-list-container clearfix'>
          <div className='target-list-wrapper clearfix'>
            {targets.length > 0 && targets.map((obj, index) => {
              const target = parseTarget(obj)
              return !target ? null : (
                <label
                  key={`target-item-${index}`}
                  className='target-item left py1 px2 mr1 bg-white rounded'
                >
                  <p className='black h6 m0'>
                    <span className='target-name bold flex'>{target.name}</span>
                    {!isPressurePhone && <span className='target-value'>{target.value}</span>}
                  </p>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

TargetList.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.string)
}

TargetList.defaultProps = {
  targets: []
}

export default TargetList
