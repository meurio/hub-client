/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { Pressure } from './__pressure__'

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
    wrapper = shallowWithIntl(<Pressure {...props} />)
  })

  it('should color with main_color, h2, a, PressureForm, PressureCount', () => {
    wrapper.setProps({
      widget: {
        id: 1,
        settings: { main_color: '#fff', count_text: 'pressões' }
      }
    })
    expect(wrapper.find('h2').props().style.backgroundColor).to.equal('#fff')
    expect(wrapper.find('InjectIntl(PressureForm)').props().buttonColor).to.equal('#fff')
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

    expect(wrapper.find('InjectIntl(PressureForm)').props().subject).to.equal(pressureSubject)
    expect(wrapper.find('InjectIntl(PressureForm)').props().body).to.equal(pressureBody)
  })

  it('should render PressureForm with button_text', () => {
    const buttonText = 'Enviar e-mail'
    wrapper.setProps({ widget: { id: 1, settings: { button_text: buttonText } } })

    expect(wrapper.find('InjectIntl(PressureForm)').props().buttonText).to.equal(buttonText)
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
