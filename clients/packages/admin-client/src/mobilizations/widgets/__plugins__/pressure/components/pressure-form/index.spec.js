/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mountWithIntl } from 'intl/helpers'
import * as pressureHelper from 'mobilizations/widgets/utils/pressure-helper'
import { PressureForm } from 'mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-form', () => {
  let wrapper
  const targets = ['Foo Bar <foo@bar.com>', 'Bar Foo <bar@foo.com>', 'Foo Baz <foo@baz.com>']
  const widget = { settings: {} }

  beforeEach(() => {
    wrapper = mountWithIntl(<PressureForm widget={widget} targetList={targets} />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
    // check if errors not render without submit
    expect(wrapper.find('span.red').length).to.equal(0)
  })

  it('should render buttonColor according passed in props', () => {
    wrapper.setProps({ buttonColor: '#fff' })
    expect(wrapper.find('button[type="submit"]').props().style.backgroundColor).to.equal('#fff')
  })

  it.skip('should return onSubmit values of state when clicked button', () => {
    let returned
    const state = {
      email: 'igor@local.cc',
      phone: '',
      name: 'igor',
      lastname: 'santos',
      city: '',
      subject: 'subject',
      body: 'body',
      pressureType: pressureHelper.PRESSURE_TYPE_EMAIL
    }
    wrapper.setProps({ onSubmit: data => { delete data.callManagement; returned = data } })
    wrapper.setState(state)

    wrapper.find('form').simulate('submit')
    expect(returned).to.deep.equal(state)
  })

  it('should render children', () => {
    wrapper.setProps({
      children: <div className='foo-bar-children' />
    })
    expect(wrapper.find('.foo-bar-children').length).to.equal(1)
  })

  it.skip('should set default subject and body by props', () => {
    const wrapper = mountWithIntl(
      <PressureForm
        widget={widget}
        subject='subject default'
        body='body default'
      />
    )
    expect(wrapper.instance().state.subject).to.equal('subject default')
    expect(wrapper.instance().state.body).to.equal('body default')
  })

  it('should change text of button when buttonText passed', () => {
    wrapper.setProps({
      buttonText: 'Enviar e-mail para o alvo'
    })
    expect(wrapper.find('button[type="submit"]').text()).to.equal('Enviar e-mail para o alvo')
  })

  it('should render error and not call onSubmit if any field not fill', () => {
    let submitted
    const wrapper = mountWithIntl(
      <PressureForm
        widget={widget}
        buttonText='Enviando...'
        buttonColor='#666'
        onSubmit={data => { submitted = data }}
        targetList={targets}
      />
    )
    wrapper.find('form').simulate('submit')
    expect(wrapper.find('span.error').length).to.equal(5)
    expect(submitted).to.equal(undefined)
  })

  describe('phone pressure', () => {
    beforeEach(() => {
      const targetsPhone = [
        'Isabelle Maitê <+551199999-9999>',
        'Betina Natália <+551199999-9999>',
        'Evelyn Pereira <+551199999-9999>',
        'Agatha Stefany Costa <+551199999-9999>'
      ]
      let submitted
      wrapper = mountWithIntl(
        <PressureForm
          widget={widget}
          onSubmit={data => { submitted = data }}
          targetList={targetsPhone}
        />
      )
      expect(submitted).to.equal(undefined)
    })

    it('should render phone field when targets have phone number', () => {
      expect(wrapper.find('#pressure-sender-phone-id').length).to.equal(1)
    })

    it('should not render email field when targets have phone number', () => {
      expect(wrapper.find('#pressure-sender-email-id').length).to.equal(0)
    })

    it('should render error and not call onSubmit if any field not fill', () => {
      let submitted
      wrapper.setProps({
        ...wrapper.props(),
        onSubmit: data => { submitted = data }
      })
      wrapper.find('form').simulate('submit')
      expect(wrapper.find('span.error').length).to.equal(3)
      expect(submitted).to.equal(undefined)
    })
  })
})
