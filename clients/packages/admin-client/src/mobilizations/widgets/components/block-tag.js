import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import { Tag } from '../components'

var styles = require('exenv').canUseDOM ? require('./block-tag.scss') : {}

const BlockTag = ({ tags, ...rest }) => (
  <div
    className={classnames(
      'my2 flex flex-wrap h5',
      styles.blockTag
    )}
  >
    {
      tags
        .filter(tag => !!tag.trim())
        .map((tag, index) => (
          <Tag
            key={`${tag}-${index}`}
            value={tag}
            {...rest}
          />
        ))
    }
  </div>
)

BlockTag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onRemove: PropTypes.func
}

BlockTag.defaultProps = {
  tags: []
}

export default BlockTag
