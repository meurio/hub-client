import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Field from './field'

describe('<Field />', () => {
  let wrapper
  const fieldName = 'testField'
  const deepField = 'deep.Field'
  const defaultContext = {
    form: {
      fields: {
        [fieldName]: {
          name: fieldName,
          value: 'value',
          onChange: v => `onChange(${fieldName}:${v})`
        },
        [deepField.split('.')[0]]: {
          [deepField.split('.')[1]]: {
            name: deepField,
            value: 'deepValue',
            onChange: v => `onChange(${deepField}:${v})`
          }
        }
      },
      i18n: m => `i18n(${m})`,
      i18nKeys: {
        fields: {
          [fieldName]: {
            label: { id: 'testField.label', defaultMessage: 'TestField' },
            placeholder: {
              id: 'testField.placeholder',
              defaultMessage: 'TestField Placeholder'
            },
            helpText: {
              id: 'testField.helpText',
              defaultMessage: 'TestField HelpText'
            }
          }
        }
      }
    }
  }

  beforeEach(() => {
    wrapper = shallow(<Field name={fieldName} component='input' />, {
      context: defaultContext
    })
  })

  it('should render its ok', () => {
    expect(wrapper.find('input')).to.have.length(1)
  })

  it('should pass props to field obtained by form provider context', () => {
    const { i18n, ...otherProps } = wrapper.find('input').props()
    const field = defaultContext.form.fields[fieldName]
    expect(otherProps.name).to.equal(field.name)
    expect(otherProps.value).to.equal(field.value)
    expect(otherProps.onChange('a')).to.equal(field.onChange('a'))
    expect(i18n('test')).to.equal('i18n(test)')
  })

  it('should pass props to field even that value be deep', () => {
    const field = shallow(
      <Field name={deepField} component='input' />,
      { context: defaultContext }
    )
    const deep = deepField.split('.')
    const fields = defaultContext.form.fields
    const { value } = field.find('input').props()
    expect(value)
      .to.equal(fields[deep[0]][deep[1]]['value'])
  })

  it('should pass label, placeholder and helpText translated', () => {
    const { i18n, label, placeholder, helpText } = wrapper.find('input').props()
    const field = defaultContext.form.i18nKeys.fields[fieldName]
    expect(label).to.equal(i18n(field.label))
    expect(placeholder).to.equal(i18n(field.placeholder))
    expect(helpText).to.equal(i18n(field.helpText))
  })

  it('should pass extraProps to component', () => {
    const inputType = 'text'
    wrapper.setProps({ type: inputType })
    expect(wrapper.find('input').props().type).to.equal(inputType)
  })

  it('should apply normalize props in value', () => {
    const normalize = value => `normalize${value}`
    wrapper.setProps({ normalize })
    expect(wrapper.find('input').props().value)
      .to.equal(normalize(defaultContext.form.fields[fieldName].value))
  })

  it('should apply normalize props in onChange', () => {
    const normalize = value => `normalize(${value})`
    wrapper.setProps({ normalize })
    expect(wrapper.find('input').props().onChange('a'))
      .to.equal(defaultContext.form.fields[fieldName].onChange(normalize('a')))
  })
})
