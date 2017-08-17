/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { TargetList } from '~client/mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/target-list', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TargetList />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
    expect(wrapper.find('.target-item').length).to.equal(0)
  })

  it('should render .target-item according targets passed', () => {
    // jump the targets shuffle process
    wrapper.setState({ targets: ['Igor Santos <igor@nossascidades.org>'] })
    expect(wrapper.find('.target-item').length).to.equal(1)
  })

  it('should render target parsed to Name <user@host.com>', () => {
    const targets = ['Igor Santos <igor@nossascidades.org>']
    // jump the targets shuffle process
    wrapper.setState({ targets })

    expect(wrapper.find('.target-item span').at(0).text()).to.equal('Igor Santos')
    expect(wrapper.find('.target-item span').at(1).text()).to.equal('igor@nossascidades.org')
  })
})
