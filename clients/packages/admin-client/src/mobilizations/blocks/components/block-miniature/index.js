import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

// Current module dependencies
if (require('exenv').canUseDOM) require('./index.scss')

const isActive = (selected, layout) => JSON.stringify(selected) === JSON.stringify(layout)
const BlockMiniature = ({ selectedLayout, layout, onClick }) => (
  <div
    className='block-miniature col col-2 mb3 px1'
    onClick={onClick}
  >
    <div
      className={classnames(
        'layout-wrapper clearfix btn block bg-white rounded',
        isActive(selectedLayout, layout) ? 'is-active' : null
      )}
    >
      <div className='mxn1'>
        {layout.map((size, index) => (
          <div
            key={index}
            className={classnames(`lines clearfix px1 col col-${size.lg_size}`)}
          >
            <div className='line line-lg col-12' />
            <div className='line line-sm col-12' />
            <div className='line line-sm col-12' />
            <div className='line line-sm col-12' />
            <div className='line line-sm col-12' />
          </div>
        ))}
      </div>
    </div>
  </div>
)

BlockMiniature.propTypes = {
  selectedLayout: PropTypes.array.isRequired,
  layout: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BlockMiniature
