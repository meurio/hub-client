import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import EmptyList from 'components/empty-list'

describe('client/components/empty-list/index', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(
      <EmptyList>
        <h1>Nenhum template criado.</h1>
      </EmptyList>
    )
  })

  describe('#default', () => {
    it('should render the root div with `empty-list` class name', () => {
      expect(wrapper.find('.empty-list')).to.have.length(1)
    })

    it('should render a div with `geometrics-container` class name', () => {
      expect(wrapper.find('.geometrics-container')).to.have.length(1)
    })

    it('should render a div with `square` class name', () => {
      expect(wrapper.find('.square')).to.have.length(1)
    })

    it('should render a div with `diamond` class name', () => {
      expect(wrapper.find('.diamond')).to.have.length(1)
    })

    it('should render a div with `circle` class name', () => {
      expect(wrapper.find('.circle')).to.have.length(1)
    })
  })

  describe('#customization', () => {
    it('should render a <h1 /> tag as a children', () => {
      expect(wrapper.find('h1')).to.have.length(1)
    })
    it('should render the children <h1 /> tag with its text properly', () => {
      expect(wrapper.find('h1').text()).to.be.equal('Nenhum template criado.')
    })
  })
})
