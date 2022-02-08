import classnames from 'classnames'
import React from 'react'
// import * as paths from '../../paths'
import LogoIconNoBorder from './logo-icon-no-border'
import Block from './block.connected'
import Navbar from './navbar-tool'

import('./add-new-block.scss')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Mobilization extends React.Component<any, any> {
  constructor(properties) {
    super(properties)

    const { editable, blocks } = properties

    this.state = {
      blocks: blocks.filter(block => !editable ? !block.hidden : true)
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(properties: any): void {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.blocks !== properties.blocks) {
      const { editable, blocks } = properties

      this.setState({
        blocks: blocks.filter(block => !editable ? !block.hidden : true)
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  componentDidMount() {
    const {
      editable,
      // mobilization,
      blocks,
      blocksIsLoaded
    } = this.props
    if (editable && blocksIsLoaded && blocks.length === 0) {
      console.log("redireciona para escolha de template");
      // this.props.history.push(paths.mobilizationTemplatesChoose(mobilization))
    }

    let blocksTotalHeight = 0
    const blocksWithOffsetTop: any[] = []

    // get the offsetTop of each block and put it on state
    // eslint-disable-next-line react/destructuring-assignment
    this.state.blocks.map((block, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const { offsetTop, offsetHeight }: any = (document.querySelector(`#block-${block.id}`) || {})
      const scrollTopReached: boolean = index === 0

      blocksWithOffsetTop.push({ ...block, offsetTop, scrollTopReached });
      blocksTotalHeight += offsetHeight
      return blocksWithOffsetTop
    })
    this.setState({ blocks: blocksWithOffsetTop });

    // watch the scroll event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blockList: any = document.querySelector('#blocks-list') || {};

    blockList.addEventListener('scroll', ({ target }) => {
      //
      // check if the current scroll position is greater or equals
      // than one of the blocks offsetTop
      //
      // eslint-disable-next-line react/destructuring-assignment
      this.state.blocks.map(block => {
        const adjust = 120;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const scrollPassed = (target.scrollTop + adjust) >= block.offsetTop

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
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const viewportBottom = target.scrollTop + target.offsetHeight
      const isBottom = viewportBottom >= blocksTotalHeight
      // eslint-disable-next-line react/destructuring-assignment
      const position = -1;
      // eslint-disable-next-line react/destructuring-assignment
      const lastBlock = this.state.blocks.at(position)

      if (isBottom && !lastBlock.scrollTopReached) {
        this.updateBlock(lastBlock, { scrollTopReached: true })
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateBlock(block: any, properties: any): void {
    const { blocks } = this.state
    const index: number = blocks.findIndex(currentBlock => currentBlock.id === block.id)

    this.setState({
      blocks: [
        ...blocks.slice(0, index),
        { ...blocks[index], ...properties },
        // eslint-disable-next-line react/destructuring-assignment
        ...this.state.blocks.slice(index+1)
      ]
    })
  }

  render(): React.ReactElement {
    const {
      mobilization: {
        color_scheme: colorScheme,
        header_font: headerFont,
        body_font: bodyFont
      },
      blocks,
      widgets,
      blockUpdate,
      editable,
      blockEditionMode,
      history,
      mobilization
    } = this.props

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`
    const layoutClassName = editable ? 'flex-auto relative' : 'absolute'
    const layoutStyle = !editable ? { top: 0, bottom: 0, left: 0, right: 0 } : undefined

    return (
      <div className={classnames('flex flex-column', themeClassName, layoutClassName)} style={layoutStyle}>
        {!blockEditionMode && (
          <Navbar
            mobilization={mobilization}
            blocks={blocks}
            editable={editable}
            blockUpdate={blockUpdate}
          />
        )}
        {/* render blocks */}
        <div id='blocks-list' className='flex-auto' style={{ overflowY: 'scroll' }}>
          {this.state.blocks.map((block) => (
            <Block
              history={history}
              key={`block-${block.id}`}
              editable={editable}
              block={block}
              widgets={widgets.filter(w => w.block_id === block.id)}
            />
          ))}
          {editable && (
            <button
              type="button"
              className='add-new-block'
              onClick={(): void => {
                console.log("adiciona novo bloco");
                // history.push(
                //   paths.createBlock(mobilization)
                // )
              }}
            >
              <i className='fa fa-plus' />
              Adicionar bloco de conteúdo
              {/* <FormattedMessage
                id='mobrender.components--mobilization.add-block-content'
                defaultMessage='Adicionar bloco de conteúdo'
              /> */}
            </button>
          )}
          <div className='col-10 mx-auto'>
            <div className='col col-10'>
              <a
                href='http://www.bonde.org/?utm_source=footer-logo'
                style={{ 'color': '#000', 'textDecoration': 'none', 'lineHeight': '85px' }}
                target='_blank'
                rel='noopener noreferrer'
              >
                Feito pra causar. Feito com
                {/* <FormattedMessage
                  id='mobrender.components--mobilization.footer.slogan'
                  defaultMessage='Feito pra causar. Feito com'
                /> */}
                <strong> BONDE.</strong>
              </a>
            </div>
            <div className='col col-2'>
              <a
                href='http://www.bonde.org/?utm_source=footer-slogan'
                className='right my2'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LogoIconNoBorder />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Mobilization.propTypes = {
//   editable: PropTypes.bool.isRequired,
//   // Injected by redux
//   mobilization: PropTypes.object.isRequired,
//   blocks: PropTypes.array.isRequired,
//   blockUpdate: PropTypes.func,
//   widgets: PropTypes.array.isRequired,
//   blockEditionMode: PropTypes.bool,
//   blocksIsLoaded: PropTypes.bool
// }

// Mobilization.defaultProps = {
//   editable: false,
//   blocks: [],
//   widgets: []
// }

export default Mobilization
