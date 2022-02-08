import React from 'react'
import ReactDOM from 'react-dom'
import ReactS3Uploader from 'react-s3-uploader'
import config from "../../../../../../../../../config";

interface InsertImageButtonProperties {
  buttonClassName: string;
  popoverClassName: string;
  handleUploadFinish: (value: any) => void
}

interface InsertImageButtonState {
  showInsertDialog: boolean;
  isLoading: boolean;
  image?: string;
}

class InsertImageButton extends React.Component<InsertImageButtonProperties, InsertImageButtonState> {
  inputFile: any

  constructor(properties) {
    super(properties)
    this.state = { showInsertDialog: false, isLoading: false, image: undefined }
  }

  handleToggleDialog(e) {
    this.setState({ showInsertDialog: !this.state.showInsertDialog })
  }

  handleUploadProgress() {
    this.setState({ isLoading: true })
  }

  handleUploadError() {
    this.setState({ isLoading: false })
  }

  handleUploadFinish(e) {
    const { handleUploadFinish } = this.props
    const imgUrl = e.signedUrl.slice(0, Math.max(0, e.signedUrl.indexOf('?')))
    this.setState({ isLoading: false, image: imgUrl })

    handleUploadFinish(imgUrl)
  }

  handleOpenDialog() {
    const node: any = ReactDOM.findDOMNode(this.inputFile)
    node.click()
  }

  render() {
    const { buttonClassName } = this.props

    return (
      <div>
        <button className={buttonClassName} onClick={this.handleOpenDialog.bind(this)}>
          <i className='fa fa-image' />
        </button>
        <ReactS3Uploader
          signingUrl={`${config.domainApiRest}/uploads`}
          accept='image/*'
          onProgress={this.handleUploadProgress.bind(this)}
          onError={this.handleUploadError.bind(this)}
          onFinish={this.handleUploadFinish.bind(this)}
          ref={this.inputFile}
          style={{
            position: 'absolute',
            visibility: 'hidden'
          }}
        />
      </div>
    )
  }
}

export default InsertImageButton
