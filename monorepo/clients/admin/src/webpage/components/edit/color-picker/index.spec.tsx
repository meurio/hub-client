/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { ColorPicker } from '.'

describe('client/components/color-picker/index', () => {
  let wrapper
  const props = {
    color: "#333",
    showColorPicker: true,
    onChangeColor: jest.fn()
  }

  beforeAll(() => {
    wrapper = shallow(<ColorPicker {...props} />)
  })

  describe('#render', () => {
    it('should render one .color-picker-container div', () => {
      expect(wrapper.find('.color-picker-container')).to.have.length(1)
    })
    it('should render the component without error by default', () => {
      expect(wrapper).to.be.ok
    })
    it('should render with "color" prop as #333 by default', () => {
      expect(wrapper.children().props().color).to.be.equal('#333')
    })
    it('should render with "presetColors" prop as an empty array by default', () => {
      expect(wrapper.children().props().presetColors).to.be.deep.equal([])
    })
    it.skip('should render with "onChangeComplete" prop as a function by default', () => {
      expect(wrapper.children().props().onChangeComplete).to.be.equal(props.onChangeColor)
    })
    it('should render with "className" prop as custom', () => {
      const customClassName = 'Foo Bar'
      wrapper.setProps({ ...props, className: customClassName })
      expect(wrapper.props().className).to.have.string(customClassName)
    })
    it('should render with "color" prop as custom', () => {
      const customColor = '#666'
      wrapper.setProps({ ...props, color: customColor })
      expect(wrapper.children().props().color).to.be.equal(customColor)
    })
    it('should render with "presetColors" prop as a not empty array if it is a valid theme', () => {
      const theme = 'meurio'
      wrapper.setProps({ ...props, theme })
      expect(wrapper.children().props().presetColors).to.not.be.equal([])
    })
    it('should render with "presetColors" prop as an empty array if it is a invalid theme', () => {
      const theme = 'foo'
      wrapper.setProps({ ...props, theme })
      expect(wrapper.children().props().presetColors).to.be.deep.equal([])
    })
  })
})
