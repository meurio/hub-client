/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from "enzyme";
import Pressure from './__pressure__'

describe('client/mobilizations/widgets/__plugins__/pressure/components/__pressure__', () => {
  let wrapper
  const status: 'active' | 'archived' = 'active';
  const kind: any = "draft";

  const props = {
    editable: false,
    mobilization: {
      id: 1,
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
    widget: {
      id: 1,
      kind,
      sm_size: 3,
      md_size: 3,
      lg_size: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      block_id: 1,
      settings: {}
    },
    filledPressureWidgets: [],
    block: { scrollTopReached: false }
  }

  beforeEach(() => {
    wrapper = shallow(<Pressure {...props} />)
  })

  it('should color with main_color, h2, a, PressureForm, PressureCount', () => {
    wrapper.setProps({
      widget: {
        id: 1,
        settings: { main_color: '#fff', count_text: 'pressões' }
      }
    })
    expect(wrapper.find('h2').props().style.backgroundColor).to.equal('#fff')
    expect(wrapper.find('PressureForm').props().buttonColor).to.equal('#fff')
    expect(wrapper.find('PressureCount').props().color).to.equal('#fff')
  })

  it('should render h2 with title_text', () => {
    const titleText = 'Envie um e-mail para quem quer tomar essa decisão'
    wrapper.setProps({ widget: { id: 1, settings: { title_text: titleText } } })

    expect(wrapper.find('h2').text()).to.equal(titleText)
  })

  it('should render h2 with call_to_action', () => {
    const titleText = 'Envie um e-mail para quem quer tomar essa decisão'
    const callToAction = 'Envie um e-mail'
    wrapper.setProps({
      widget: {
        id: 1,
        settings: { call_to_action: callToAction, title_text: titleText }
      }
    })

    expect(wrapper.find('h2').text()).to.equal(callToAction)
  })

  it('should render PressureForm with pressure_subject and pressure_body', () => {
    const pressureSubject = 'Não derrubem a escola'
    const pressureBody = 'Sra. Renata da Costa, favor não derrubar...'

    wrapper.setProps({
      widget: {
        id: 1,
        settings: {
          pressure_subject: pressureSubject,
          pressure_body: pressureBody
        }
      }
    })

    expect(wrapper.find('PressureForm').props().subject).to.equal(pressureSubject)
    expect(wrapper.find('PressureForm').props().body).to.equal(pressureBody)
  })

  it('should render PressureForm with button_text', () => {
    const buttonText = 'Enviar e-mail'
    wrapper.setProps({ widget: { id: 1, settings: { button_text: buttonText } } })

    expect(wrapper.find('PressureForm').props().buttonText).to.equal(buttonText)
  })

  it('should hide PressureCount when show_counter is "false"', () => {
    wrapper.setProps({ widget: { id: 1, settings: { show_counter: 'false' } } })
    expect(wrapper.find('PressureCount').length).to.equal(0)
  })

  it('should render targets received by settings with type string', () => {
    wrapper.setProps({
      widget: {
        id: 1,
        settings: { targets: 'Igor Santos <igor@nossascidades.org>' }
      }
    })
    expect(wrapper.find('TargetList').props().targets)
      .to.deep.equal(['Igor Santos <igor@nossascidades.org>'])

    wrapper.setProps({
      widget: {
        id: 1,
        settings: {
          targets: 'Igor Santos <igor@nossascidades.org>;Lucas Pirola <pirola@nossascidades.org>'
        }
      }
    })
    expect(wrapper.find('TargetList').props().targets)
      .to.deep.equal([
        'Igor Santos <igor@nossascidades.org>',
        'Lucas Pirola <pirola@nossascidades.org>'
      ])
  })
})
