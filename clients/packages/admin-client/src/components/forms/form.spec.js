/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Form } from 'components/forms'

const Button = (props) => (
  <button {...props}>Done!</button>
)

Button.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

describe('client/components/forms/form', () => {
  it('should render without crashed', () => {
    const form = shallow(<Form />)
    expect(form).to.be.ok
  })

  it('should render children', () => {
    const form = shallow(
      <Form>
        <Button type='button' />
      </Form>
    )
    expect(form.find('Button').length).to.equal(1)
  })

  it('should call handleSubmit when submit form', () => {
    let handleSubmitCalled = false
    const form = shallow(<Form handleSubmit={() => { handleSubmitCalled = true }} />)
    form.simulate('submit')
    expect(handleSubmitCalled).to.equal(true)
  })

  it('should pass pristine and submitting to children', () => {
    const form = shallow(
      <Form pristine={false} submitting>
        <Button />
      </Form>
    )
    expect(form.find('Button').props()).to.deep.equal({
      pristine: false,
      submitting: true
    })
  })
})
