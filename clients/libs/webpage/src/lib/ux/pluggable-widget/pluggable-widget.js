import React from 'react'
import PropTypes from 'prop-types'
import Overlay from './overlay'


class PluggableWidget extends React.Component {

  getOptions (plugin) {
    let options = { noOverlay: !this.props.editable }
    if (typeof plugin.options === 'function') {
      options = Object.assign({}, options, plugin.options(this.props))
    } else if (typeof plugin.options === 'object') {
      options = Object.assign({}, options, plugin.options)
    }
    return options
  }

  render () {
    const { block, widget, extraWidgetProps, onEdit, onDelete } = this.props
    
    const plugin = extraWidgetProps.plugins.find(p => p.kind === widget.kind)
    const { noOverlay } = this.getOptions(plugin)

    const widgetProps = {
      block,
      widget,
      ...extraWidgetProps
    }

    return !noOverlay ? (
      <Overlay
        onEdit={() => onEdit && onEdit(widget)}
        onDelete={() => onDelete && onDelete(widget)}
      >
        <plugin.component {...widgetProps} />
      </Overlay>
    ) : (
      <plugin.component {...widgetProps} />
    )
  }
}

PluggableWidget.defaultProps = {
  editable: false,
  plugins: []
}

PluggableWidget.propTypes = {
  block: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  plugins: PropTypes.array,
  editable: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default PluggableWidget