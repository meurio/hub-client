import React from 'react'
// import * as array from "../../../../../../utils/array"
import { getType, PRESSURE_TYPE_PHONE } from "../utils";
import './index.scss'


const parseTarget = (target: string): any | undefined => {
  const targetSplit = target.split('<')
  const valid = targetSplit.length === 2
  return valid ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') } : undefined
}

class TargetList extends React.Component<any, any> {
  constructor(properties) {
    super(properties)
    this.state = {
      targets: properties.targets || [],
      selectedTargets: []
    }
  }

  render(): React.ReactElement {
    const { targets } = this.state
    // const { onSelect, errorMessage, selectable } = this.props
    const pressureType = getType(targets)
    // const isPressureEmail = pressureType === pressureHelper.PRESSURE_TYPE_EMAIL
    const isPressurePhone = pressureType === PRESSURE_TYPE_PHONE

    return (
      <div className='target-list px2 py1'>
        <div className='target-list-label bold'>
          Quem você vai pressionar {targets.length}
        </div>
        <div className='target-list-container clearfix'>
          <div className='target-list-wrapper clearfix'>
            {targets.length > 0 && targets.map((obj) => {
              const target = parseTarget(obj)
              return !target ? undefined : (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label
                  key={target.name}
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

// TargetList.propTypes = {
//   targets: PropTypes.arrayOf(PropTypes.string),
//   onSelect: PropTypes.func.isRequired,
//   errorMessage: PropTypes.string,
//   selectable: PropTypes.bool
// }

// TargetList.defaultProps = {
//   targets: [],
//   selectable: false
// }

export default TargetList
