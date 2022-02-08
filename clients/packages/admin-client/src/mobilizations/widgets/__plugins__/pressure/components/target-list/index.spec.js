/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { TargetList } from 'mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/target-list', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TargetList
      onSelect={() => {}}
    />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
    expect(wrapper.find('.target-item').length).to.equal(0)
  })

  describe('email pressure', () => {
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

  describe('selectable', () => {
    it('should render the phone pressure label text properly', () => {
      const targets = ['Foo Bar <+551199999-9999>']
      // jump the targets shuffle process
      wrapper.setState({ targets })
      wrapper.setProps({ ...wrapper.props(), selectable: true })

      expect(wrapper.find('.target-list-label FormattedMessage').at(0).props().defaultMessage)
        .to.include('Selecione quem você quer pressionar')
    })

    it('should render a checkbox on each target item', () => {
      const targets = ['Foo Bar <+551199999-9999>', 'Foo Bar <+551199999-9999>']
      // jump the targets shuffle process
      wrapper.setState({ targets })
      wrapper.setProps({ ...wrapper.props(), selectable: true })

      expect(wrapper.find('.target-item input[type="checkbox"]').length).to.equal(2)
    })
  })
})
