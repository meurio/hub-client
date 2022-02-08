import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Loading from './loading'

let wrapper

describe('client/components/await/loading', () => {
  beforeEach(() => {
    wrapper = shallow(<Loading />)
  })

  describe('#render', () => {
    it('should render divs', () => {
      expect(wrapper.find('div')).to.have.length(2)
    })

    it('should render icon', () => {
      expect(wrapper.find('i')).to.have.length(1)
    })

    it('should render `fixed` class by default', () => {
      expect(wrapper.find('div').at(0).props().className).to.have.string('fixed')
    })

    it('should render `absolute` class when `localized` prop was passed', () => {
      const localWrapper = shallow(<Loading localized />)
      expect(localWrapper.find('div').at(0).props().className).to.have.string('absolute')
    })

    it('should render className as passed properly', () => {
      const className = 'foo-bar'
      const localWrapper = shallow(<Loading className={className} />)
      expect(localWrapper.find('div').at(0).props().className).to.have.string(className)
    })

    it('should render style with `backgroundColor` as `rgba(0, 0, 0, 0.5)` by default', () => {
      const style = wrapper.find('div').at(0).props().style
      expect(style.backgroundColor).to.equal('rgba(0, 0, 0, 0.5)')
    })

    it('should render style with `backgroundColor` as passed properly', () => {
      const backgroundColor = 'rgba(255,255,255,.8)'
      const localWrapper = shallow(<Loading backgroundColor={backgroundColor} />)
      const style = localWrapper.find('div').at(0).props().style
      expect(style.backgroundColor).to.equal(backgroundColor)
    })

    it('should render circle icon style with `color` as white by default', () => {
      const style = wrapper.find('i').at(0).props().style
      expect(style.color).to.equal('rgba(255, 255, 255, 1)')
    })

    it('should render circle icon style with `color` when prop `loaderColor` was passed', () => {
      const loaderColor = '#AFAFAF'
      const localWrapper = shallow(<Loading loaderColor={loaderColor} />)
      const style = localWrapper.find('i').at(0).props().style
      expect(style.color).to.equal(loaderColor)
    })
  })
})
