import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactS3Uploader from 'react-s3-uploader'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation'
import ColorPicker from '~components/color-picker'

// Parent module dependencies
import * as MobilizationSelectors from '~mobilizations/selectors'

// Current module dependencies
import { BlockMiniature } from '~mobilizations/blocks/components'
import { BLOCK_LAYOUTS } from '~mobilizations/blocks/constants'
import {
  actions as BlockActions,
  selectors as BlockSelectors
} from '~mobilizations/blocks'
if (process.env.BROWSER) require('./index.scss')

export class BlockCreate extends Component {
  render () {
    const {
      dispatch,
      selectedColor,
      mobilization,
      location,
      selectedLayout,
      bgImage,
      uploadedBackgroundImage,
      uploadingBackgroundImage
    } = this.props
    const { color_scheme: colorScheme } = mobilization
    const newBlockPath = paths.createBlock(mobilization)

    return (
      <div className='block-create col-12 flex flex-column bg-silver gray relative'>
        <div className='block-create-header bg-white pt3 pr4 pl3'>
          <h1 className='h1 mt0 mb3'>Adicione um bloco de conteúdo</h1>
          <Tabs>
            <Tab
              path={newBlockPath}
              text='Blocos em branco'
              isActive={newBlockPath === location.pathname}
            />
          </Tabs>
        </div>

        <div className='clearfix overflow-auto'>
          <div className='col-6 clearfix py3 pr4 pl3'>
            <p className='lightgray mb2'>
              Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a
              qualquer momento
            </p>

            <label className='block-type bold mb1 block gray20'>
              Tipo de bloco
            </label>
            <div className='mxn1 clearfix'>
              {BLOCK_LAYOUTS.map((layout, index) => (
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={selectedLayout}
                  onClick={() => { dispatch(BlockActions.setSelectedLayout(layout)) }}
                />
              ))}
            </div>

            <label className='block-type bold mb1 block gray20'>
              Fundo
            </label>
            <div className='col-12'>
              <ColorPicker
                dispatch={dispatch}
                theme={colorScheme.replace('-scheme', '')}
                className='left'
              />
              <div
                className={
                  'border border-gray94 rounded p2 bg-white center relative' +
                  ' overflow-hidden inline-block'
                }
              >
                <div className='clearfix' style={{ width: 240 }}>
                  {bgImage || uploadedBackgroundImage ? (
                    <div
                      className='bg-cover square'
                      style={{ backgroundImage: `url(${bgImage || uploadedBackgroundImage})` }}
                    />
                  ) : (
                    <div className='square-float'>
                      <i
                        className='fa fa-image silver'
                        style={{ fontSize: '7em', marginTop: '2.5rem' }}
                      />
                    </div>
                  )}
                  <div className={bgImage || uploadedBackgroundImage ? 'hide' : null}>
                    <div className='mb1 gray'>Selecione a imagem de fundo</div>
                  </div>
                  <div className='overflow-hidden'>
                    {
                      uploadingBackgroundImage
                      ? <i className='fa fa-spin fa-refresh' />
                      : <ReactS3Uploader
                        id='blockBackgroundImage'
                        signingUrl={`${process.env.API_URL}/uploads`}
                        accept='image/*'
                        onProgress={() =>
                          !uploadingBackgroundImage && dispatch(BlockActions.setBackgroundImageUploading(true))
                        }
                        onFinish={image => {
                          const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                          dispatch(BlockActions.setBackgroundImageUploaded(imageUrl))
                          dispatch(BlockActions.setBackgroundImageUploading(false))
                        }}
                        className='border-none bg-darken-4 rounded p1 white'
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: '1rem',
                          width: '80%',
                          marginLeft: '-40%'
                        }}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>

            <button
              className='block-create-button btn float-btn-menu rounded'
              onClick={() => {
                dispatch(BlockActions.asyncBlockCreate({
                  mobilization,
                  block: {
                    bg_class: JSON.stringify(selectedColor),
                    bg_image: uploadedBackgroundImage || bgImage,
                    widgets_attributes: selectedLayout.map(column => ({ kind: 'draft', ...column }))
                  },
                  next: () => {
                    this.context.router.transitionTo(
                      `${paths.editMobilization(mobilization.id)}?newBlock=true`
                    )
                  }
                }))
                dispatch(BlockActions.setBackgroundImageUploaded(null))
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

BlockCreate.contextTypes = {
  router: React.PropTypes.object
}

BlockCreate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  selectedColor: PropTypes.object.isRequired,
  bgImage: PropTypes.string,
  selectedLayout: PropTypes.array.isRequired
}

BlockCreate.defaultProps = {
  selectedLayout: BLOCK_LAYOUTS[0],
  selectedColor: { r: 51, g: 51, b: 51, a: 1 },
  bgImage: null
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocks: BlockSelectors.getList(state),
  selectedLayout: state.blocks.selectedLayout,
  uploadingBackgroundImage: state.blocks.uploadingBackgroundImage,
  uploadedBackgroundImage: state.blocks.uploadedBackgroundImage,
  selectedColor: state.colorPicker.color
})

export default connect(mapStateToProps)(BlockCreate)
