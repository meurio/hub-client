/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import BLOCK_LAYOUTS from 'mobilizations/blocks/constants/block-layouts'
import BlockMiniature from 'mobilizations/blocks/components/block-miniature'

describe('client/mobilizations/blocks/components/block-miniature', () => {
  let wrapper
  const props = {
    selectedLayout: BLOCK_LAYOUTS[0],
    layout: BLOCK_LAYOUTS[0],
    onClick: () => {}
  }

  describe('#render', () => {
    beforeEach(() => {
      wrapper = shallow(<BlockMiniature {...props} />)
    })

    it('should render root .block-miniature <div>', () => {
      expect(wrapper.find('div.block-miniature')).to.have.length
    })
    it('should render root .block-miniature <div> with onClick prop as a function', () => {
      expect(wrapper.find('div.block-miniature').props().onClick).to.be.a('function')
    })
    it('should render one .layout-wrapper div', () => {
      expect(wrapper.find('div.layout-wrapper')).to.have.length(1)
    })
    it('should render one .lines div', () => {
      expect(wrapper.find('div.lines')).to.have.length(1)
    })
    it('should render five .line divs', () => {
      expect(wrapper.find('div.line')).to.have.length(5)
    })
    it('should render one .line-lg div', () => {
      expect(wrapper.find('div.line-lg')).to.have.length(1)
    })
    it('should render four .line-sm div', () => {
      expect(wrapper.find('div.line-sm')).to.have.length(4)
    })

    describe('when selected layout is the current layout to render', () => {
      it('should render .layout-wrapper div with .is-active className', () => {
        expect(wrapper.find('div.layout-wrapper').props().className).to.have.string('is-active')
      })
    })

    describe('when selected layout is not the current layout to render', () => {
      beforeEach(() => {
        const currentProps = { ...props, selectedLayout: BLOCK_LAYOUTS[1] }
        wrapper = shallow(<BlockMiniature {...currentProps} />)
      })
      it('should render .layout-wrapper div without .is-active className', () => {
        expect(wrapper.find('div.layout-wrapper').props().className).to.have.not.string('is-active')
      })
    })
  })
})
