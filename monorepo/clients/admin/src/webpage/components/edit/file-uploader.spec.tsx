import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import ReactS3Uploader from 'react-s3-uploader'
import FileUploader from './file-uploader';

describe('mobrender/components/file-uploader', () => {
  const confirmStub = sinon.stub(window, 'confirm');
  const props = {
    file: 'tmp://myimage.png',
    onRemove: jest.fn(),
    onProgress: jest.fn(),
    onFinish: jest.fn()
  }

  it('should rende preview file only when pass file', () => {
    const uploader = shallow(<FileUploader {...props} />)
    expect(uploader.find(`img[src="${props.file}"]`).length).to.equal(1)
    uploader.setProps({ file: undefined })
    expect(uploader.find('img').length).to.equal(0)
  })

  it('should render react-s3-uploader', () => {
    const uploader = shallow(<FileUploader {...props} />)
    expect(uploader.find(ReactS3Uploader).length).to.equal(1)
  })

  it('should render progress instead of react-s3-uploader when pass progress', () => {
    const uploader: any = shallow(<FileUploader {...props} />)
    uploader.setProps({ progress: 10 })
    expect(uploader.find(ReactS3Uploader).length).to.equal(0)

    expect(uploader.find('p.bg-pagenta').length).to.equal(1)
    expect(uploader.find('p.bg-pagenta').text()).to.equal("10")
  })

  describe('render remove button', () => {
    it('should render trash icon', () => {
      const uploader = shallow(<FileUploader {...props} />)
      expect(uploader.find('button > i.fa-trash').length).to.equal(1)
    })

    it('should not render when onRemove not pass', () => {
      const uploader = shallow(<FileUploader {...props} />)
      uploader.setProps({ onRemove: undefined })
      expect(uploader.find('button.remove').length).to.equal(0)
    })

    it('should call window.confirm when clicked in remove button', () => {
      const uploader = shallow(<FileUploader {...props} />)
      uploader.find('button.remove').simulate('click')
      expect(confirmStub.called).to.equal(true)
    })

    it('shoulld call onRemove if clicked in button and confirm message', () => {
      const uploader = shallow(<FileUploader {...props} />)
      let result
      confirmStub.returns(true)
      uploader.setProps({ onRemove: file => { result = file } })
      uploader.find('button.remove').simulate('click')
      expect(result).to.equal(props.file)
    })
  })
})
