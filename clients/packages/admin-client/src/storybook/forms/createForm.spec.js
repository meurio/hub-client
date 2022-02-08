import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { subscribe, createForm } from './createForm'

describe('createForm API', () => {
  describe('subscribe', () => {
    const callToAction = 'CALL_TO_ACTION'
    const globalState = {}
    const globalOwnProps = { widget: { settings: { callToAction } } }
    const intl = Component => Component

    describe('should map initialValues in HOC props when', () => {
      let param
      const HOC = (configForm, mapStateToProps) => () => {
        param = mapStateToProps
      }

      it('is function', () => {
        const initialValues = (state, ownProps) => ({
          ...ownProps.widget.settings
        })
        subscribe(intl, HOC)({ initialValues })
        expect(param(globalState, globalOwnProps)).to.deep.equal({
          initialValues: globalOwnProps.widget.settings
        })
      })

      it('is object', () => {
        const initialValues = {
          ...globalOwnProps.widget.settings
        }
        subscribe(intl, HOC)({ initialValues })
        expect(param()).to.deep.equal({ initialValues: globalOwnProps.widget.settings })
      })
    })

    it('should map submit in HOC props', () => {
      let param
      const HOC = (configForm, mapStateToProps, mapActionsToProps) => () => {
        const dispatch = f => {
          param = f
        }
        mapActionsToProps(dispatch).submit()
      }
      const submit = () => 'submit'
      subscribe(intl, HOC)({ submit })
      expect(param).to.equal('submit')
    })

    it('should map form props like name, fields and validate', () => {
      let param
      const HOC = (configForm) => () => {
        param = configForm
      }
      const settings = {
        name: 'testForm',
        fields: ['name', 'email'],
        validate: () => 'validate'
      }
      subscribe(intl, HOC)(settings)
      expect(param.form).to.equal(settings.name)
      expect(param.fields).to.deep.equal(settings.fields)
      expect(param.validate()).to.equal('validate')
    })

    describe('decorate component like FormProvider', () => {
      const HOC = () => Component => Component

      it('should decorate a form like default', () => {
        const Form = subscribe(intl, HOC)({})
        expect(Form.displayName).to.equal('createForm(form)')
      })

      it('should decorate configured component', () => {
        const CustomForm = () => <div />
        const Form = subscribe(intl, HOC)({ component: CustomForm })
        expect(Form.displayName).to.equal('createForm(CustomForm)')
      })
    })
  })
  describe('createForm', () => {
    it('should connect with reduxForm and react-intl', () => {
      const mock = message => message
      const intl = {
        now: mock,
        formatMessage: mock,
        formatDate: mock,
        formatTime: mock,
        formatRelative: mock,
        formatNumber: mock,
        formatPlural: mock,
        formatHTMLMessage: mock
      }
      const Form = createForm({
        name: 'testForm',
        fields: ['name'],
        submit: () => 'submit'
      })
      const wrapper = shallow(<Form />, { context: { intl } })
      // expect(wrapper.name()).to.equal('ReduxFormConnector(createForm(form))')
      expect(wrapper.name()).to.equal('ConnectedForm')
    })
  })
})
