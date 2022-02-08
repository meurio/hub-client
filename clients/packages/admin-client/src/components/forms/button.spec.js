/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Button } from 'components/forms'

describe('client/components/forms/button', () => {
  it('should render without crashed', () => {
    const btn = mount(<Button />)
    expect(btn).to.be.ok
  })

  it('should render children like text button', () => {
    const btn = mount(<Button>Done!</Button>)
    expect(btn.find('button').text()).to.equal('Done!')
  })

  it('should render [type="button"] by default', () => {
    const btn = mount(<Button />)
    expect(btn.find('button').props().type).to.equal('button')
  })

  describe('when button is submit type', () => {
    let btn
    beforeEach(() => {
      btn = mount(<Button type='submit' />)
    })

    it('should disable button while is submit', () => {
      btn.setProps({ submitting: true })
      expect(btn.find('button').props().disabled).to.equal(true)
    })

    it('should disable button while input is not blur', () => {
      btn.setProps({ pristine: true })
      expect(btn.find('button').props().disabled).to.equal(true)
    })
  })
})
