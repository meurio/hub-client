import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Tab from './tab'

describe('client/components/navigation/tabs/tab', () => {
  let wrapper
  const context = { router: {} }
  const props = {
    text: 'Foo Text'
  }

  describe('#render', () => {
    beforeAll(() => {
      wrapper = shallow(<Tab {...props} />, { context })
    })

    describe('should passed path', () => {
      beforeAll(() => {
        wrapper.setProps({ path: '/' })
      })

      it('should render one root .tab <Link> component', () => {
        expect(wrapper.find('Link.tab')).to.have.length(1)
      })

      describe('when isActive is false', () => {
        beforeAll(() => {
          wrapper.setProps({ ...props, isActive: true })
        })
        it('should render a tab with h4 className', () => {
          expect(wrapper.props().className).to.have.string('h4')
        })
      })
    })

    describe('when without path', () => {
      it('should render span with index', () => {
        wrapper.setProps({ index: 1, path: undefined })
        expect(wrapper.find('i').text()).to.deep.equal('1')
      })
    })
  })
})
