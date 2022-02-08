import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import config from "../../../../../../config";

interface InsertImageState {
  image?: string;
  isLoading: boolean;
}

class WYSIHTMLToolbarInsertImage extends React.Component<any, InsertImageState> {
  constructor(properties, context) {
    super(properties, context)
    this.state = {
      image: undefined,
      isLoading: false
    }
  }

  handleUploadProgress() {
    this.setState({ isLoading: true })
  }

  handleUploadError() {
    this.setState({ isLoading: false })
  }

  handleUploadFinish(e) {
    this.setState({
      image: e.signedUrl.slice(0, Math.max(0, e.signedUrl.indexOf('?'))),
      isLoading: false
    })
  }

  render() {
    return (
      <div
        data-wysihtml5-dialog='insertImage'
        style={{ display: 'none' }}
        className='white p2 bg-darken-3'
      >
        <div>
          <ReactS3Uploader
            className='input col-11 inline-block'
            signingUrl={`${config.domainApiRest}/uploads`}
            accept='image/*'
            onProgress={this.handleUploadProgress.bind(this)}
            onError={this.handleUploadError.bind(this)}
            onFinish={this.handleUploadFinish.bind(this)}
          />
          <div
            className='col-1 center'
            style={{ display: this.state.isLoading ? 'inline-block' : 'none' }}
          >
            <i className='fa fa-refresh fa-spin fa-w white' />
          </div>
        </div>

        <input data-wysihtml5-dialog-field='src' value={this.state.image} type='hidden' />
        <label>
          <span className='mr1'>Alinhamento</span>
          <select
            data-wysihtml5-dialog-field='className'
            className='select inline-block col-2 mr2 mb0'
          >
            <option value='' />
            <option value='left'>Esquerda</option>
            <option value='right'>Direita</option>
          </select>
        </label>
        <a data-wysihtml5-dialog-action='save' href='/save' className='btn btn-outline white mr1'>Inserir</a>
        <a data-wysihtml5-dialog-action='cancel' href='/cancel' className='btn btn-transparent white'>Cancelar</a>
      </div>
    )
  }
}

export default WYSIHTMLToolbarInsertImage
