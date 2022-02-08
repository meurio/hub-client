import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { FormProvider, createFormProvider } from './createFormProvider'

describe('createFormProvider API', () => {
  let wrapper, defaultProps
  const context = {
    intl: {
      now: sinon.spy(),
      formatMessage: sinon.spy(),
      formatDate: sinon.spy(),
      formatTime: sinon.spy(),
      formatRelative: sinon.spy(),
      formatNumber: sinon.spy(),
      formatPlural: sinon.spy(),
      formatHTMLMessage: sinon.spy()
    }
  }

  beforeEach(() => {
    defaultProps = {
      handleSubmit: sinon.spy(),
      submit: sinon.spy(),
      intl: context.intl
    }
    wrapper = shallow(<FormProvider {...defaultProps} />)
  })

  it('should render a form component by default', () => {
    expect(wrapper.find('form')).to.have.length(1)
  })

  it('should pass submit to handleSubmit', () => {
    const { handleSubmit, submit } = defaultProps
    expect(handleSubmit.calledWith(submit)).to.equal(true)
  })

  it('should pass submit handled to form like onSubmit', () => {
    wrapper.setProps({
      handleSubmit: submit => submit,
      submit: () => 'submit'
    })
    const formProps = wrapper.find('form').props()
    expect(formProps.onSubmit()).to.equal('submit')
  })

  it('should pass fields like child context', () => {
    const fields = 'fields'
    wrapper.setProps({ fields })
    const {
      i18n,
      i18nKeys,
      ...otherProps
    } = wrapper.instance().getChildContext().form
    expect(otherProps).to.deep.equal({ fields })
  })

  it('should pass i18n function like child context', () => {
    const message = { id: 'text.label', defaultMessage: 'text' }
    const intl = { ...defaultProps.intl, formatMessage: t => t }
    wrapper.setProps({ intl })
    expect(wrapper.instance().getChildContext().form.i18n(message))
      .to.deep.equal(message)
  })

  it('should pass i18nKeys like child context', () => {
    const i18nKeys = {
      fields: {
        name: {
          label: { id: 'label', defaultMessage: 'label' },
          placeholder: { id: 'placeholder', defaultMessage: 'placeholder' }
        }
      }
    }
    const intl = { ...defaultProps.intl, formatMessage: t => t }
    wrapper.setProps({ intl, i18nKeys })
    expect(wrapper.instance().getChildContext().form.i18nKeys)
      .to.deep.equal(i18nKeys)
  })

  it('should pass submitted false by default', () => {
    expect(wrapper.find('form').props().submitted).to.equal(false)
  })

  it('submitted should be true when submit successfully', () => {
    // requesting
    wrapper.setProps({ submitting: true })
    // requested successfully
    wrapper.setProps({ submitting: false, submitFailed: false })
    expect(wrapper.find('form').props().submitted).to.equal(true)
  })

  it('submitted should be false when submit fail', () => {
    // requesting
    wrapper.setProps({ submitting: true })
    // requested successfully
    wrapper.setProps({ submitting: false, submitFailed: true })
    expect(wrapper.find('form').props().submitted).to.equal(false)
  })

  it('should pass getPropI18n to form', () => {
    const props = {
      intl: {
        ...defaultProps.intl,
        formatMessage: m => `i18n(${m.defaultMessage})`
      },
      customProp: {
        id: 'form.customProp',
        defaultMessage: 'Custom Prop'
      }
    }
    wrapper.setProps(props)
    expect(wrapper.find('form').props().getPropI18n('customProp'))
      .to.equal(`i18n(${props.customProp.defaultMessage})`)
  })

  it('should translate prop to form with i18nKeys', () => {
    const successMessage = {
      id: 'testForm.successMessage',
      defaultMessage: 'Success Message'
    }
    const formatMessage = m => `i18n(${m.defaultMessage})`
    wrapper.setProps({
      i18nKeys: { successMessage },
      intl: { ...defaultProps.intl, formatMessage }
    })
    expect(wrapper.find('form').props().getPropI18n('successMessage'))
      .to.equal(`i18n(${successMessage.defaultMessage})`)
  })

  it('should pass error prop to wrapper', () => {
    const error = 'invalid form'
    wrapper.setProps({ error })
    expect(wrapper.find('form').props().error).to.equal(error)
  })

  describe('createFormProvider', () => {
    it('should define displayName like createForm(Component)', () => {
      const CustomFormProvider = createFormProvider('form')
      expect(CustomFormProvider.displayName).to.equal('createForm(form)')
    })

    it('should define displayName like createForm(Component.displayName)', () => {
      const CustomForm = () => <div />
      const CustomFormProvider = createFormProvider(CustomForm)
      expect(CustomFormProvider.displayName).to.equal('createForm(CustomForm)')
    })
  })
})
