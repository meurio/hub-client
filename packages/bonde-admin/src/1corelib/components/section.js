import React from 'react'
import PropTypes from 'prop-types'
import WidgetArea from './widget-area'


/**
 * The basic rendering structure of a block has features
 * such as navigating between blocks, and events such as
 * mouseEnter and mouseOut.
 */
class Section extends React.Component {

  renderBlock () {
    const { anchor, widgets, widgetComponent } = this.props
    return (
      <div id={anchor} className='col-10 mx-auto'>
        <div className='clearfix widgets' style={{ padding: '5em 0' }}>
          {widgets && widgets.map(widget => (
            <WidgetArea
              key={`widget-${widget.id}`}
              widget={widget}
              widgetComponent={widgetComponent}
            />
          ))}
        </div>
      </div>
    )
  }

  render () {
    const { block, editable, wrapper: BlockWrapper } = this.props

    if (BlockWrapper) {
      return (
        <BlockWrapper block={block} editable={editable}>
          {this.renderBlock()}
        </BlockWrapper>
      )
    }

    return this.renderBlock()
  }
}

Section.propTypes = {
  /* Define anchor to navigate between blocks, this value must
   * be unique per block. */
  anchor: PropTypes.string.isRequired,
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  blockWrapper: PropTypes.any,
  /* Data structure of block, passed to blockWrapper component */
  block: PropTypes.object.isRequired,
  /* True if mobilization is editable mode */
  editable: PropTypes.bool.isRequired,
  /* Array of widgets related on Section */
  widgets: PropTypes.array,
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: PropTypes.any.isRequired
}

export default Section