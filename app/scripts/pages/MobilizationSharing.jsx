import React, {PropTypes} from 'react'
import reduxForm from 'redux-form'
import {connect} from 'react-redux'
import ReactS3Uploader from 'react-s3-uploader'
import {CloseButton, Label, InputCounter, SaveButton} from './../components'
import {editMobilization} from './../reducers/mobilizations'
import * as Paths from '../Paths'

@connect(state => ({ form: state.mobilizationSharing }))
@reduxForm('mobilizationSharing')

export default class MobilizationSharing extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    mobilizations: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)

    const {initializeForm, mobilization} = props
    initializeForm({
      facebook_share_title: mobilization.facebook_share_title,
      facebook_share_description: mobilization.facebook_share_description,
      facebook_share_image: mobilization.facebook_share_image
    })

    this.state = {
      isFacebookShareImageUploading: false,
      edited: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const {mobilizations} = this.props
    if (mobilizations.editing !== nextProps.mobilizations.editing) {
      this.setState({
        edited: mobilizations.editing && !nextProps.mobilizations.editing
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, dispatch, mobilization, auth } = this.props

    dispatch(editMobilization({
      id: mobilization.id,
      credentials: auth.credentials,
      mobilization: {...data}
    }))

    this.props.initializeForm(this.props.data)
  }

  handleFacebookShareImageUploadProgress() {
    if (!this.state.isFacebookShareImageUploading) {
      this.setState({isFacebookShareImageUploading: true})
    }
  }

  handleFacebookShareImageUploadFinish(image) {
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.props.handleBlur('facebook_share_image')({target: {value: imageUrl}})
    this.setState({isFacebookShareImageUploading: false})
  }

  renderFacebookImage() {
    const {data} = this.props

    return (
      data.facebook_share_image
        ? <img src={data.facebook_share_image} />
        : <i className="fa fa-image silver mb2" style={{fontSize: '5em'}} />
    )
  }

  render() {
    const {
      data: {
        facebook_share_title: facebookShareTitle,
        facebook_share_description: facebookShareDescription
      },
      handleBlur, handleChange, mobilizations, dirty
    } = this.props

    const { isFacebookShareImageUploading } = this.state

    return (
      <div className="p3 col col-8">
        <div className="h5 caps bold flex flex-center mb2">
          <i className="fa fa-facebook-square mr1" style={{fontSize: '2em'}} />
          <span>Postagem de Facebook</span>
        </div>
        <p className="h5 mb3">
          Configure as informações do post que será publicado no Facebook
          sempre que alguém compartilhar a ação.
        </p>
        <form onSubmit={::this.handleSubmit}>
          <div className="mb3">
            <Label htmlFor="facebookShareImage">Imagem</Label>
            <div className="border rounded p2 bg-white center">
              { this.renderFacebookImage() }
              <div className="mb1">Sugerimos uma imagem de no mínimo 200x200px</div>
              <div className="overflow-hidden">
                { isFacebookShareImageUploading
                  ? <i className="fa fa-spin fa-refresh" />
                  : <ReactS3Uploader
                    id="facebookShareImage"
                    signingUrl={`${process.env.API_URL}/uploads`}
                    accept="image/*"
                    onProgress={::this.handleFacebookShareImageUploadProgress}
                    onFinish={::this.handleFacebookShareImageUploadFinish}
                  />
                }
              </div>
            </div>
          </div>
          <div className="mb3">
            <Label htmlFor="facebookShareTitle">Título</Label>
            <InputCounter
              maxLength={70}
              length={facebookShareTitle ? facebookShareTitle.length : 0}
              classNames={['right']}
            />
            <input
              id="facebookShareTitle"
              maxLength={70}
              type="text"
              className="field-light block full-width"
              value={facebookShareTitle}
              onChange={handleChange('facebook_share_title')}
              onBlur={handleBlur('facebook_share_title')}
              placeholder="Um título direto que passe a ideia da sua mobilização"
            />
          </div>
          <div className="mb3">
            <Label htmlFor="facebookShareDescription">Subtítulo</Label>
              <InputCounter
                maxLength={90}
                length={facebookShareDescription ? facebookShareDescription.length : 0}
                classNames={['right']}
              />
            <textarea
              id="facebookShareDescription"
              maxLength={90}
              className="field-light block full-width"
              value={facebookShareDescription}
              onChange={handleChange('facebook_share_description')}
              onBlur={handleBlur('facebook_share_description')}
              placeholder="Complete a informação do título e chame o leitor para a mobilização"
            />
          </div>
          <div>
            <SaveButton
              saving={mobilizations.editing}
              saved={this.state.edited && !dirty}
              handleClick={::this.handleSubmit}
            />
          </div>
        </form>
        <CloseButton dirty={this.props.dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}
