import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SettingsPageContentLayout } from 'components/layout'

describe('client/components/layout/settings-page-content-layout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <SettingsPageContentLayout>
        <h1>Foo Bar Hello World Heading!</h1>
      </SettingsPageContentLayout>
    )
  })

  describe('#render', () => {
    it('should render one root .settings-page-content-layout <div> element', () => {
      expect(wrapper.find('.settings-page-content-layout')).to.have.length(1)
    })
    it('should render with custom className', () => {
      const customClassName = 'foo-class'
      wrapper.setProps({ className: customClassName })
      expect(wrapper.find('.settings-page-content-layout').props().className)
        .to.have.string(customClassName)
    })

    describe('children', () => {
      it('should render one <h1> element', () => {
        expect(wrapper.find('.settings-page-content-layout h1')).to.have.length(1)
      })
      it('should render one <h1> element with its content properly', () => {
        const expectedText = 'Foo Bar Hello World Heading!'
        expect(wrapper.find('.settings-page-content-layout h1').text()).to.be.equal(expectedText)
      })
    })

    describe('multiple childrens', () => {
      const childrenSelector = '.settings-page-content-layout > div > div'

      beforeEach(() => {
        wrapper = shallow(
          <SettingsPageContentLayout>
            <div>Foo</div>
            <div>Bar</div>
          </SettingsPageContentLayout>
        )
      })

      it('should render two <div> elements', () => {
        expect(wrapper.find(childrenSelector)).to.have.length(2)
      })
      it('should render first <div> with its content properly', () => {
        expect(wrapper.find(childrenSelector).at(0).text()).to.be.equal('Foo')
      })
      it('should render second <div> with its content properly', () => {
        expect(wrapper.find(childrenSelector).at(1).text()).to.be.equal('Bar')
      })
    })

    describe('overflow', () => {
      it('should render `overflow-auto` by default', () => {
        const className = wrapper.find('.settings-page-content-layout').props().className
        expect(className).to.have.string('overflow-auto')
      })
      it('should render `overflow-hidden` when pass `overflow` prop as hidden', () => {
        const localWrapper = shallow(
          <SettingsPageContentLayout overflow='hidden' children={<div />} />
        )
        const className = localWrapper.find('.settings-page-content-layout').props().className
        expect(className).to.have.string('overflow-hidden')
      })
    })
  })
})
