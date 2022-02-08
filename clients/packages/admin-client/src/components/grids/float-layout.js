import PropTypes from 'prop-types'
import React from 'react'

const FloatLayout = props => (
  <div className={props.position}>
    {props.children}
  </div>
)

FloatLayout.propTypes = {
  position: PropTypes.oneOf(['floatTopRight', 'floatTopLeft'])
}

export default FloatLayout
