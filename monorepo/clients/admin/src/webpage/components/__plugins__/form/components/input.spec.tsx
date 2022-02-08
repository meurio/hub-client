import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import type { Status } from "../../../../reducers";
import Input from './input';

describe('client/mobilizations/widgets/__plugins__/form/components/input', () => {
  describe('when render input form', () => {
    const status: Status = "active";
    const props: any = {
      uid: '',
      editable: true,
      configurable: true,
      field: {},
      mobilization: {
        id: 2,
        color_scheme: 'meu-rio',
        header_font: 'headerFont',
        body_font: 'bodyFont',
        name: 'Lorem',
        status,
        slug:  'lorem',
        goal: 'Lorem ipsum dolor',
        facebook_share_title: 'Facebook share title',
        facebook_share_description: 'Facebook share description',
        facebook_share_image: 'http://facebook.com/share-image.png',
        updated_at: new Date().toISOString(),
        user_id: 1,
        language: "pt-br",
        created_at: new Date().toISOString(),
        community_id: 2
      }
    }

    it('should call renderFieldKind when not initialize editable', () => {
      sinon.spy(Input.prototype, 'renderFieldKind')
      shallow(<Input {...props} />)
      expect((Input.prototype.renderFieldKind as any).calledOnce).to.equal(true)
    })

    it('should render a select input when field kind equals dropdown', () => {
      props.field = { kind: 'dropdown', placeholder: '1,2,3' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('select')).to.have.length(1)
    })

    it('should render a input text when field kind not equals dropdown or greetings', () => {
      props.field = { kind: 'dummy', placeholder: '' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('input')).to.have.length(1)
    })

    it('should render success message when field kind equals greetings', () => {
      props.field = { kind: 'greetings', placeholder: 'new message' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('p')).to.have.length(1)

      let node = wrapper.find('p').at(0)
      expect(node.text()).to.have.string(props.field.placeholder)
    })
  })
})
