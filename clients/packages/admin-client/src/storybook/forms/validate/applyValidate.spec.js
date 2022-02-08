import { expect } from 'chai'
import { applyValidate } from './applyValidate'

describe('applyValidate', () => {
  const message = 'required field'
  const values = {
    person: {
      firstName: '',
      lastName: '9'
    }
  }

  it('should work with fieldName in deep', () => {
    const validate = value => !value
    const customValidate = applyValidate({ validate, message })
    expect(customValidate('person.firstName')(values)).to.deep.equal({
      person: {
        firstName: message
      }
    })
  })

  it('should work with fieldName in deep with object message', () => {
    const customMessage = { id: '1', defaultMessage: message }
    const validate = value => !value
    const customValidate = applyValidate({ validate, message })
    expect(customValidate('person.firstName', customMessage)(values))
      .to.deep.equal({
        person: {
          firstName: customMessage
        }
      })
  })

  it('should be invalid when returned string in validate', () => {
    const validate = value => message
    const customValidate = applyValidate({ validate })
    expect(customValidate('person.firstName')(values))
      .to.deep.equal({
        person: { firstName: message }
      })
  })

  it('should be invalid when returned obj in validate', () => {
    const customMessage = { id: 'id', defaultMessage: message }
    const validate = value => customMessage
    const customValidate = applyValidate({ validate })
    expect(customValidate('person.firstName')(values))
      .to.deep.equal({
        person: { firstName: customMessage }
      })
  })
  it('should be valid when returned void in validate', () => {
    const validate = value => {}
    const customValidate = applyValidate({ validate })
    expect(customValidate('person.firstName')(values))
      .to.deep.equal({})
  })
})
