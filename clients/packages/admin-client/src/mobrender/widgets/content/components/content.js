import PropTypes from 'prop-types'
import React from 'react'

const Content = ({ widget, update }) => (
  <div className='content'>
    {widget.settings.content}
  </div>
)

Content.propTypes = {
  widget: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Content
