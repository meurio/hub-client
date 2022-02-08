import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Section, Footer, Navigation } from './components'

/**
 * A mobilization has two modes, in editing ({ editable: true })
 * and only rendering ({ editable: false }).
 * When a mobilization is in edit mode, it needs to receive extra
 * properties that will be used for block and widgets editing.
 */
class Mobilization extends React.Component {

  constructor (props) {
    super(props)
    // used only visible blocks
    const visibleBlocks = this.getVisibleBlocks(props)
    this.state = { blocks: visibleBlocks }
  }

  componentWillReceveProps(nextProps) {
    if (this.props.blocks !== nextProps.blocks) {
      this.setState({
        blocks: this.getVisibleBlocks(nextProps)
      })
    }
  }

  getVisibleBlocks ({ blocks, editable }) {
    const visibleBlocks = !editable ? blocks.filter(b => !b.hidden) : blocks
    return visibleBlocks
  }

  componentDidMount () {
    if (require('exenv').canUseDOM) {
      let blocksTotalHeight = 0
      const blocksWithOffsetTop = []

      // get the offsetTop of each block and put it on state
      this.state.blocks.map((block, index) => {
        const { offsetTop, offsetHeight } = document.querySelector(`#${this.props.linkTo(block)}`)
        const scrollTopReached = index === 0

        blocksWithOffsetTop.push({ ...block, offsetTop, scrollTopReached })
        blocksTotalHeight += offsetHeight
        return blocksWithOffsetTop
      })

      this.setState({ blocks: blocksWithOffsetTop })

      // watch the scroll event
      document.querySelector('#blocks-list').onscroll = ({ target }) => {
        //
        // check if the current scroll position is greater or equals
        // than one of the blocks offsetTop
        //
        this.state.blocks.map(block => {
          const scrollPassed = (target.scrollTop + 120) >= block.offsetTop

          if (scrollPassed && !block.scrollTopReached) {
            this.updateBlock(block, { scrollTopReached: true })
          }
          return scrollPassed
        })

        //
        // small fix if the last block is small than viewport
        // if the scroll position is greater or equals than
        // sum of all blocks height, sinalyze that the last block was reached
        //
        const viewportBottom = target.scrollTop + target.offsetHeight
        const isBottom = viewportBottom >= blocksTotalHeight
        const lastBlock = this.state.blocks.slice(-1)[0]

        if (isBottom && !lastBlock.scrollTopReached) {
          this.updateBlock(lastBlock, { scrollTopReached: true })
        }
      }
    }
  }

  updateBlock (block, newProps) {
    const { blocks } = this.state
    const index = blocks.findIndex(currentBlock => currentBlock.id === block.id)

    this.setState({
      blocks: [
        ...blocks.slice(0, index),
        { ...blocks[index], ...newProps },
        ...this.state.blocks.slice(index + 1)
      ]
    })
  }

  render () {
  	// Props used on editable mode
  	const { editable, newBlockButton: NewBlockButton } = this.props
    // Props to customize layout themes
    // TODO: Rever funcionamento da customização de layouts
    const { colorScheme, headerFont, bodyFont } = this.props
    const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`
    const layoutClassName = editable ? 'flex-auto relative' : 'absolute'
    const layoutStyle = !editable ? { top: 0, bottom: 0, left: 0, right: 0 } : undefined
    // Props to render blocos
    const {
      blockWrapper,
      linkTo,
      blockWidgetsRef,
      widgets,
      widgetComponent,
      extraWidgetProps
    } = this.props

    const { blocks } = this.state

  	return (
  	  <div className={classnames('flex flex-column', themeClassName, layoutClassName)} style={layoutStyle}>
        <Navigation blocks={blocks} editable={editable} linkTo={linkTo} />
  	    <div id='blocks-list' className='flex-auto' style={{ overflowY: 'scroll' }}>
          {blocks.map((b, i) => (
            <Section
              key={`section-${i}`}
              anchor={linkTo(b)}
              block={b}
              editable={editable}
              wrapper={blockWrapper}
              widgets={blockWidgetsRef(b, widgets)}
              widgetComponent={widgetComponent}
              extraWidgetProps={extraWidgetProps}
            />
          ))}
  	      {editable && NewBlockButton && (<NewBlockButton />)}
  	  	  <Footer />
        </div>
      </div>
  	)
  }
}

Mobilization.defaultProps = {
  editable: false,
  blocks: [],
  widgets: [],
  extraWidgetProps: {},
  blockWidgetsRef: (b, ws) => ws.filter(w => w.block_id === b.id)
}

Mobilization.propTypes = {
  /* Define when the mobilization is in edit mode. */
  editable: PropTypes.bool,
  /* Function used to link navigation bar with block,
   * receives block as parameter and should return a string like id. */
  linkTo: PropTypes.func.isRequired,
  /* This component is rendered just below the list of blocks,
   * and should lead to the addition of a new block when it is clicked
   * 
   * TODO: Review button should external to the mobilization component.
   */
  newBlockButton: PropTypes.any,
  /* Sections of your mobilization, you will receive an item from this
   * list when you are rendering block customization. */
  blocks: PropTypes.array,
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  blockWrapper: PropTypes.any,
  /* Array of widgets object used on render. */
  widgets: PropTypes.array.isRequired,
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: PropTypes.any.isRequired,
  // TODO: Documentation
  extraWidgetProps: PropTypes.object,
  /* Function used to link widgets with block, receives (block, widgets)
   * as param.
   * Default function use the attrs widget.block_id to relationship. */
  blockWidgetsRef: PropTypes.func.isRequired
}

export default Mobilization