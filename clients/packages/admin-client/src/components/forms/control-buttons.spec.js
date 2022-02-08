/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'

import { ControlButtons } from 'components/forms/control-buttons'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('client/components/forms/control-buttons', () => {
  let wrapper
  const context = { $formRedux: { floatButton: '', successMessage: 'Foo Bar!' }, intl }
  const props = {
    submitting: false,
    submitted: false,
    dirty: false,
    valid: false
  }

  describe('default', () => {
    beforeAll(() => {
      wrapper = shallowWithIntl(<ControlButtons {...props} intl={intl} />, { context })
    })
    it('should render buttons without form inline style', () => {
      expect(wrapper.find('.control-buttons').props().className).to.have.string('flex')
    })
    it('should render submit button as disabled', () => {
      expect(wrapper.find('input[type="submit"]').props().disabled).to.be.true
    })
    it('should render submit button with its text as "Próxima parada"', () => {
      expect(wrapper.find('input[type="submit"]').props().value).to.equal('Próxima parada')
    })
    it('should not render form submit success message', () => {
      expect(wrapper.find('.success-message')).to.have.length(0)
    })
  })

  describe('with cancel button', () => {
    beforeAll(() => {
      wrapper = shallowWithIntl(<ControlButtons {...{ ...props }} intl={intl} />, { context })
    })
    it('should render cancel button when pass onCancel', () => {
      let called
      wrapper.setProps({ onCancel: () => { called = true } })
      expect(wrapper.find('button')).to.have.length(1)

      wrapper.find('button').simulate('click')
      expect(called).to.equal(true)
    })
  })

  describe('with form inline style', () => {
    beforeAll(() => {
      wrapper = shallowWithIntl(<ControlButtons {...{ ...props, formInline: true }} intl={intl} />, { context })
    })
    it('should render buttons with form inline style', () => {
      expect(wrapper.find('.control-buttons').props().className).to.have.string('inline-block')
    })
  })

  describe('with submitting status', () => {
    beforeAll(() => {
      wrapper = shallowWithIntl(<ControlButtons {...{ ...props, submitting: true }} intl={intl} />, { context })
    })
    it('should render submit button with its text as "Salvando..."', () => {
      expect(wrapper.find('input[type="submit"]').props().value).to.equal('Salvando...')
    })
    it('should render submit button as disabled', () => {
      expect(wrapper.find('input[type="submit"]').props().disabled).to.be.true
    })
  })

  describe('with submitted status', () => {
    beforeAll(() => {
      wrapper = shallowWithIntl(<ControlButtons {...{ ...props, submitted: true }} intl={intl} />, { context })
    })
    it('should render form submit success message', () => {
      expect(wrapper.find('.success-message')).to.have.length(1)
    })
    it('should render submit button with its text as "Próxima parada"', () => {
      expect(wrapper.find('input[type="submit"]').props().value).to.equal('Próxima parada')
    })
    it('should render submit button as disabled', () => {
      expect(wrapper.find('input[type="submit"]').props().disabled).to.be.true
    })
  })

  describe('with dirty status', () => {
    beforeAll(() => {
      wrapper = shallowWithIntl(<ControlButtons {...{ ...props, dirty: true, valid: true }} intl={intl} />, { context })
    })
    it('should render submit button as enabled', () => {
      expect(wrapper.find('input[type="submit"]').props().disabled).to.be.false
    })
  })
})
