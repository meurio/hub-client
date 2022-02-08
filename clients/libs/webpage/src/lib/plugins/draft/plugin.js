import React from 'react'
import PropTypes from 'prop-types'
import Button from './button'

if (require('exenv').canUseDOM) require('./plugin.scss')

const DraftPlugin_PREFIX = '_draftPlugin'

class DraftPlugin extends React.Component {

  getOptions (plugin) {
    return plugin.options ? plugin.options[DraftPlugin_PREFIX] ||  {} : {}
  }

  render () {
    const { editable, plugins, widget } = this.props
    const pluginsWithoutDraft = plugins.filter(w => w.kind !== 'draft')
    return editable ? (
      <div className='draft-widget widget center rounded lightgray clearfix'>
        {pluginsWithoutDraft.map((plugin, index) => {
          // Settings each plugin
          const { action, label, icon: Icon } = this.getOptions(plugin)
          return (
            <Button
              key={`wc-${index}`}
              label={label}
              onClick={() => action && action(widget)}
            >
              {Icon && <Icon />}
              <span>{label}</span>
            </Button>
          )
        })}
      </div>
    ) : <div className='draft-widget-public'>&nbsp;</div>
  }
}

DraftPlugin.propTypes = {
  plugins: PropTypes.array.isRequired,
  widget: PropTypes.object.isRequired
}

DraftPlugin.setOptions = (settings) => {
  return { [DraftPlugin_PREFIX]: settings }
}

/** ## DraftPlugin 
  *
  * Menu with plugin options for selecting widgets within a block.
  *
  * Options:
  * - label: String
  * - icon: Component
  * - action: Function
  * 
  * NOTE: Configure your plugin extra props using the method
  * DraftPlugin.setOptions, it return a object that can merged in
  * your options.
  *
  */
export default DraftPlugin
