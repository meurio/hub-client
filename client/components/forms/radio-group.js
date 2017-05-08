import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames'

class RadioGroup extends Component {
  render () {
    const formGroup = this.context.$formGroup
    const { value, ...field } = formGroup || {}
    const { children, className, layout } = this.props

    return (
      <p className={classnames('mt1', className)}>
        {children && children.map((child, index) => {
          return React.cloneElement(child, {
            key: `radio-${index}`,
            checked: value,
            alignment: layout,
            ...field
          })
        })}
      </p>
    )
  }
}

RadioGroup.contextTypes = {
  $formGroup: PropTypes.object
}

RadioGroup.propTypes = {
  layout: PropTypes.oneOf(['horizontal', 'vertical'])
}

RadioGroup.defaultProps = {
  layout: 'horizontal'
}

export default RadioGroup
