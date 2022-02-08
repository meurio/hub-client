import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SettingsPageLayout } from 'components/layout'

describe('client/components/layout/settings-page-layout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <SettingsPageLayout>
        <h1>Foo Bar Hello World Heading!</h1>
      </SettingsPageLayout>
    )
  })

  describe('#render', () => {
    it('should render one root .settings-page-layout <div> element', () => {
      expect(wrapper.find('.settings-page-layout')).to.have.length(1)
    })
    it('should render with custom className', () => {
      const customClassName = 'foo-class'
      wrapper.setProps({ className: customClassName })
      expect(wrapper.find('.settings-page-layout').props().className)
        .to.have.string(customClassName)
    })

    describe('children', () => {
      it('should render one <h1> element', () => {
        expect(wrapper.find('.settings-page-layout h1')).to.have.length(1)
      })
      it('should render one <h1> element with its content properly', () => {
        const expectedText = 'Foo Bar Hello World Heading!'
        expect(wrapper.find('.settings-page-layout h1').text()).to.be.equal(expectedText)
      })
    })

    describe('multiple childrens', () => {
      beforeEach(() => {
        wrapper = shallow(
          <SettingsPageLayout>
            <div>Foo</div>
            <div>Bar</div>
          </SettingsPageLayout>
        )
      })

      it('should render two <div> elements', () => {
        expect(wrapper.find('.settings-page-layout > div')).to.have.length(2)
      })
      it('should render first <div> with its content properly', () => {
        expect(wrapper.find('.settings-page-layout > div').at(0).text()).to.be.equal('Foo')
      })
      it('should render second <div> with its content properly', () => {
        expect(wrapper.find('.settings-page-layout > div').at(1).text()).to.be.equal('Bar')
      })
    })
  })
})
