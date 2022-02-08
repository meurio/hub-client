/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from "enzyme";
// import { shallowWithIntl } from '../../intl/helpers'
import BlockChangeBackground from './block-change-background'

describe('mobrender/components/block-change-background', () => {
  const props: any = {
    mobilization: { id: 1, color_scheme: 'meurio' },
    block: { id: 1, bg_class: 'bg-1', bg_image: 'tmp://bg.png' },
    onCancelEdit: jest.fn(),
    update: jest.fn(),
    onChangeBackground: jest.fn(),
    onUploadFile: jest.fn()
  }

  it('should render without crashed', () => {
    const changeBackground = shallow(<BlockChangeBackground {...props} />)
    expect(changeBackground).to.be.ok
  })

  it('should render block-color-picker and file-uploader', () => {
    const changeBackground = shallow(<BlockChangeBackground {...props} />)
    expect(changeBackground.find('ColorPickerButton').length).to.equal(1)
    expect(changeBackground.find('FileUploader').length).to.equal(1)
  })

  describe('render color picker button', () => {
    it('should pass color_scheme to theme in colorpicker', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      const colorPicker: any = changeBackground.find('ColorPickerButton')
      expect(colorPicker.props().theme).to.equal(props.mobilization.color_scheme)
    })

    it('should call onChangeBackground with block updated when click color-picker', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      changeBackground.setProps({ onChangeBackground: block => { result = block } })
      const color = JSON.stringify({ r: 255, g: 255, b: 255, a: 1 })
      const colorButton: any = changeBackground.find('ColorPickerButton');
      colorButton.props().onChange(color)

      expect(result).to.deep.equal({
        ...props.block,
        bg_class: color
      })
    })
  })

  describe('render file uploader', () => {
    it('should pass block.bg_image to file in file-uploader', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      const uploader: any = changeBackground.find('FileUploader')
      expect(uploader.props().file).to.equal(props.block.bg_image)
    })

    it('should call onChangeBackground when onRemove is called', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      changeBackground.setProps({ onChangeBackground: block => { result = block } })
      const uploader: any = changeBackground.find('FileUploader')
      uploader.props().onRemove()
      expect(result).to.deep.equal({...props.block,
        bg_image: ''
      })
    })

    it('should call onChangeBackground and uploadFile("bgBlock") when onFinish is called', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      let resultProgress
      changeBackground.setProps({
        onChangeBackground: block => { result = block },
        onUploadFile: key => { resultProgress = key }
      })
      const newBgFile = 'tmp://new-bg.png'
      const uploader: any = changeBackground.find('FileUploader')
      uploader.props().onFinish(newBgFile)
      expect(result).to.deep.equal({...props.block,
        bg_image: newBgFile
      })
      expect(resultProgress).to.equal('bgBlock')
    })

    it('should pass progress to file uploader', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      changeBackground.setProps({ progress: 25 })
      const file: any = changeBackground.find('FileUploader')

      const result = file.props().progress
      expect(result).to.equal(25)
    })

    it('should call onUploadFile("bgBlock", progres) while loading', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      changeBackground.setProps({ onUploadFile: (key, progress) => { result = { key, progress } } })
      const file: any = changeBackground.find('FileUploader')

      file.props().onProgress(59)
      expect(result).to.deep.equal({ key: 'bgBlock', progress: 59 })
    })
  })

  describe('render navbar', () => {
    it('should has custom style for render to top', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      const main = changeBackground.find('div').at(0)
      expect(main.props().className).to.contains('absolute col-12 top-0 left-0 bg-darken-4 z5')
    })

    it('should render div wrapper to cancel edit when clicked out navbar', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      const wrapper = changeBackground.find('div.fixed.z3')
      expect(wrapper.props().className).to.contains('fixed top-0 right-0 bottom-0 left-0')
    })

    it('should call onCancelEdit when clicked in wrapper', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      changeBackground.setProps({ onCancelEdit: block => { result = block } })
      const wrapper = changeBackground.find('div.fixed.z3')
      wrapper.simulate('click')
      expect(result).to.deep.equal(props.block)
    })

    it('should render buttons to save and cancel edition', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      expect(changeBackground.find('.save-btn').length).to.equal(1)
      const saveButton = changeBackground.find('.save-btn')
      expect(saveButton.text()).to.equal('Salvar')

      expect(changeBackground.find('.cancel-btn').length).to.equal(1)
      const cancelButton = changeBackground.find('.cancel-btn')
      expect(cancelButton.text()).to.equal('Cancelar')
    })

    it('should call update when click in save button', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      changeBackground.setProps({ update: block => { result = block } })
      changeBackground.find('.save-btn').simulate('click')
      expect(result).to.deep.equal(props.block)
    })

    it('should call onCancelEdit when click in cancel button', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      let result
      changeBackground.setProps({ onCancelEdit: block => { result = block } })
      changeBackground.find('.cancel-btn').simulate('click')
      expect(result).to.deep.equal(props.block)
    })

    it('should disable save button when upload in progress', () => {
      const changeBackground = shallow(<BlockChangeBackground {...props} />)
      changeBackground.setProps({ progress: 10 })
      expect(changeBackground.find('.save-btn').props().disabled).to.equal(true)
    })
  })
})
