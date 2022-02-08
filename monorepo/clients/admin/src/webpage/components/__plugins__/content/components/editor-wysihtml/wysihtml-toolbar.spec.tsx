import { shallow } from 'enzyme'
import WYSIHTMLToolbar from './wysihtml-toolbar'

describe('client/components/editor-wysihtml/wysihtml-toolbar', () => {
  const props = {
    elementId: 'some-id',
    className: 'some-class'
  }

  beforeAll(() => {
  })
  
  describe('#render', () => {
    it('should set the element id', () => {
      const wrapper = shallow(<WYSIHTMLToolbar {...props} />)
      expect(wrapper.find("div#some-id").length).toEqual(1);
    })
    it('should set the element classes', () => {
      const wrapper = shallow(<WYSIHTMLToolbar {...props} />)
      expect(wrapper.find("div.some-class").length).toEqual(1);
    })
  })
})
