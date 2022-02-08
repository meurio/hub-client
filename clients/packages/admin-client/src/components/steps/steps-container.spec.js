/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { StepsContainer, StepContent } from 'components/steps'

describe('components/steps/steps-container', () => {
  it('should render without crashed', () => {
    const container = shallow(<StepsContainer />)
    expect(container).to.be.ok
  })

  it('should render header when title is passed', () => {
    const title = 'Domínio da comunidade'
    const container = shallow(
      <StepsContainer title={title} />
    )
    expect(container.find('h2').text()).to.equal(title)
  })

  it('should render only steps with index minor than step saved in state', () => {
    const container = shallow(
      <StepsContainer>
        <StepContent />
        <StepContent />
      </StepsContainer>
    )
    expect(container.find('StepContent').length).to.equal(1)
  })

  it('should pass position in render for <StepContent />', () => {
    const container = shallow(
      <StepsContainer>
        <StepContent />
        <StepContent />
      </StepsContainer>
    )
    container.setState({ step: 2 })
    expect(container.find('StepContent').at(0).props().position).to.equal(1)
    expect(container.find('StepContent').at(1).props().position).to.equal(2)
  })

  it('should pass position 1 when only one <StepContent />', () => {
    const container = shallow(
      <StepsContainer>
        <StepContent />
      </StepsContainer>
    )
    expect(container.find('StepContent').at(0).props().position).to.equal(1)
  })
})
