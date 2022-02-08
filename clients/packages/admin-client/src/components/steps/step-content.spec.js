/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { StepContent, StepButton } from 'components/steps'

describe('components/steps/step-content', () => {
  let content

  beforeEach(() => {
    content = shallow(<StepContent />)
  })

  it('should render without crashed', () => {
    expect(content).to.be.ok
  })

  it('should render children', () => {
    const content = shallow(<StepContent><p id='did'>Dummy</p></StepContent>)
    expect(content.find('p#did').length).to.equal(1)
  })

  it('should render header when title is passed', () => {
    const title = 'Insira o domínio desejado'
    const position = 1
    content.setProps({ title, position })
    expect(content.find('h3').text()).to.contains(title)
    expect(content.find('h3').find('span').text()).include(position)
  })

  it('should pass onNextStep only for <StepButton />', () => {
    const onNextStep = () => {}
    const content = shallow(
      <StepContent onNextStep={onNextStep}>
        <p id='did'>Dummy</p>
        <StepButton>Continue</StepButton>
      </StepContent>
    )
    expect(content.find('StepButton').props().onNextStep).to.deep.equal(onNextStep)
  })
})
