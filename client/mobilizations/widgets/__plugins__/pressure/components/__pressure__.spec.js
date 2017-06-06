import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Pressure } from '~client/mobilizations/widgets/__plugins__/pressure/components/__pressure__'

describe('client/mobilizations/widgets/__plugins__/pressure/components/__pressure__', () => {
  let wrapper
  const props = {
    editable: false,
    mobilization: { id: 1 },
    widget: { id: 1, settings: {} },
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
        settings: { main_color: '#fff', show_counter: 'true' }
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

  it('should render ok with values default when settings is undefined', () => {
    wrapper.setProps({ widget: { id: 1, settings: undefined } })
    expect(wrapper).to.be.ok
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

  it('should render PressureTellAFriend when filledPressureWidgets includes the id 1', () => {
    wrapper.setProps({ widget: { ...props.widget }, filledPressureWidgets: [1] })
    expect(wrapper.find('PressureTellAFriend').length).to.equal(1)
  })
})
