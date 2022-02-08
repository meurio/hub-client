import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

if (require('exenv').canUseDOM) require('./tab.scss')

class Tab extends Component {
  render () {
    const { text, index, path, onClick, isActive, className, style } = this.props
    if (path) {
      return (
        <Link
          to={path}
          className={classnames(
            'tab btn border-only-bottom px0 py2 mr3 inline-block',
            isActive ? 'h4 is-active' : null,
            className
          )}
          style={style}
        >
          {text}
        </Link>
      )
    }
    return (
      <span style={style} onClick={onClick} className={classnames(
        'tab btn border-only-bottom px0 py2 mr3 inline-block',
        isActive ? 'h4 is-active' : null,
        className
      )}>
        {!onClick && (
          <i className={classnames(
            'circle center inline-block',
            isActive ? 'bg-pagenta' : 'bg-gray94',
          text ? 'mr2' : null
          )}>
            {index}
          </i>
        )}
        {text}
      </span>
    )
  }
}

Tab.propTypes = {
  text: PropTypes.node,
  isActive: PropTypes.bool,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  index: PropTypes.number
}

Tab.defaultProps = {
  isActive: false
}

export default Tab
