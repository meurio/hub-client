/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { StepButton } from 'components/steps'

describe('components/steps/step-button', () => {
  it('should render without crashed', () => {
    const button = mount(<StepButton />)
    expect(button).to.be.ok
  })

  it('should render children', () => {
    const button = mount(<StepButton>Continue</StepButton>)
    expect(button.find('button').text()).to.equal('Continue')
  })

  it('should called onNextStep when finish onClick', () => {
    const called = []
    const props = {
      onClick: () => {
        called.push('onClick')
      },
      onNextStep: () => {
        called.push('onNextStep')
      }
    }
    const button = mount(<StepButton {...props} />)
    button.find('button').simulate('click')
    expect(called).to.deep.equal(['onClick', 'onNextStep'])
  })
})
