import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import * as array from 'utils/array'
import * as pressureHelper from 'mobilizations/widgets/utils/pressure-helper'

if (require('exenv').canUseDOM) require('./index.scss')

const parseTarget = target => {
  const targetSplit = target.split('<')
  const valid = targetSplit.length === 2
  return valid ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') } : null
}

class TargetList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      targets: props.targets,
      selectedTargets: []
    }
  }

  componentDidMount () {
    //
    // to works on nossas/bonde-cache, make an async method
    // to shuffle the pressure targets on the client-side.
    //
    if (require('exenv').canUseDOM) {
      const { targets } = this.props

      setTimeout(() => {
        this.setState({ targets: array.shuffle(targets) })
      }, 0)
    }
  }

  render () {
    const { targets } = this.state
    const { onSelect, errorMessage, selectable } = this.props
    const pressureType = pressureHelper.getType(targets)
    // const isPressureEmail = pressureType === pressureHelper.PRESSURE_TYPE_EMAIL
    const isPressurePhone = pressureType === pressureHelper.PRESSURE_TYPE_PHONE

    return (
      <div className='target-list px2 py1'>
        <div className='target-list-label bold'>
          {selectable ? (
            <FormattedMessage
              id='pressure-widget--target-list.label.pressure'
              defaultMessage={`
                Selecione quem você quer pressionar ({targetsCount} {targetsCount, plural,
                  one {alvo}
                  other {alvos}
                })
              `}
              values={{ targetsCount: String(array.clean(targets).length) }}
            />
          ) : (
            <FormattedMessage
              id='pressure-widget--target-list.label.email'
              defaultMessage={`
                Quem você vai pressionar ({targetsCount} {targetsCount, plural,
                  one {alvo}
                  other {alvos}
                })
              `}
              values={{ targetsCount: String(array.clean(targets).length) }}
            />
          )}
          {selectable && errorMessage && (
            <div className='red mt1'>{errorMessage}</div>
          )}
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
                  {selectable && (
                    <input
                      type='checkbox'
                      onChange={({ target: { checked } }) => {
                        const { selectedTargets } = this.state
                        if (checked) {
                          // append the current target
                          this.setState({ selectedTargets: [...selectedTargets, target] })
                        } else {
                          const nameMatching = t => t.name === target.name
                          const index = selectedTargets.findIndex(nameMatching)
                          // remove the current target
                          this.setState({ selectedTargets: [
                            ...selectedTargets.slice(0, index),
                            ...selectedTargets.slice(index + 1)
                          ]})
                        }
                        onSelect && onSelect(this.state.selectedTargets)
                      }}
                    />
                  )}
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
  targets: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  selectable: PropTypes.bool
}

TargetList.defaultProps = {
  targets: [],
  selectable: false
}

export default TargetList
