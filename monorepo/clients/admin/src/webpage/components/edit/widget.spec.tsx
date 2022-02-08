/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from 'enzyme';
import type { Status } from "../../reducers";
// import shallow from '../../intl/helpers/shallow-with-intl'
import Pressure from '../__plugins__/pressure/components'
import Donation from '../__plugins__/donation/components'
import Form from '../__plugins__/form/components'
import { Draft } from '../__plugins__/draft/components'
import Widget from './widget'
import WidgetOverlay from './widget-overlay.connected'

// const intlProvider = new IntlProvider({ locale: 'en' }, {});
// const { intl } = intlProvider.getChildContext();

describe('client/mobrender/components/widget', () => {
  const status: Status = 'active';
  const kind: any = "draft";
  const props = {
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
    },
    editable: true,
    saving: false,
    block: {
      id: 3,
      position: 1,
      mobilization_id: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    widget: {
      id: 1,
      kind,
      sm_size: 3,
      md_size: 3,
      lg_size: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      block_id: 1
    },
    update: jest.fn()
  }

  it('should render without crashed', () => {
    const widget = shallow(<Widget {...props} />)
    expect(widget).to.be.ok
  })

  it('should contains classes to resize component', () => {
    const { sm_size: smSize, md_size: mdSize, lg_size: lgSize } = props.widget
    const className = `col-${smSize} sm-col-${smSize} md-col-${mdSize} lg-col-${lgSize}`
    const widget = shallow(<Widget {...props} />)
    expect(widget.find('div').at(0).props().className).to.contains(className)
  })

  it('should render component children according kind', () => {
    const widget = shallow(<Widget {...props} editable />)
    expect(widget.find(Draft).length).to.equal(1)
  })

  // it('should render component loading while saving widget', () => {
  //   const widget = shallow(<Widget {...props} saving />)
  //   expect(widget.find('Loading').length).to.equal(1)
  // })

  it('should passed widget and update to children', () => {
    const widget = shallow(<Widget {...props} editable />)
    expect(widget.find(Draft).props().widget).to.deep.equal(props.widget)
    expect(widget.find(Draft).props().update).to.equal(props.update)
  })

  /*
  // TODO: Need config redirect and editable to render widget overlay
  it('should render overlay when editable', () => {
    const widget = shallow(<Widget {...props} editable={true} />)
    expect(widget.find(WidgetOverlay).length).to.equal(1)
  })
  */

  it('should not render overlay when editable is false', () => {
    const widget = shallow(<Widget {...props} />)
    expect(widget.find(WidgetOverlay).length).to.equal(0)
  })

  describe('when editable is false', () => {
    it('should not render draft widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      expect(widget.find(Draft).length).to.equal(0)
    })

    it('should render pressure widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      widget.setProps({ ...props, widget: { ...props.widget, kind: 'pressure' } })
      expect(widget.find(Pressure).length).to.equal(1)
    })

    it('should render form widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      widget.setProps({ ...props, widget: { ...props.widget, kind: 'form' } })
      expect(widget.find(Form).length).to.equal(1)
    })

    it('should render donation widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      widget.setProps({ ...props, widget: { ...props.widget, kind: 'donation' } })
      expect(widget.find(Donation).length).to.equal(1)
    })
  })
})
