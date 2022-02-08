import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SettingsPageMenuLayout } from 'components/layout'

describe('client/components/layout/settings-page-menu-layout', () => {
  let wrapper
  const props = { title: 'Foo Title' }

  beforeEach(() => {
    wrapper = shallow(
      <SettingsPageMenuLayout {...props}>
        <h2>Foo Bar Hello World Heading!</h2>
      </SettingsPageMenuLayout>
    )
  })

  describe('#render', () => {
    it('should render one root .settings-page-menu-layout <div> element', () => {
      expect(wrapper.find('.settings-page-menu-layout')).to.have.length(1)
    })
    it('should render with custom className', () => {
      const customClassName = 'foo-class'
      wrapper.setProps({ ...props, className: customClassName })
      expect(wrapper.find('.settings-page-menu-layout').props().className)
        .to.have.string(customClassName)
    })

    describe('title', () => {
      it('should render one <h1> element', () => {
        expect(wrapper.find('.settings-page-menu-layout h1')).to.have.length(1)
      })
      it('should render one <h1> element with content as passed via title prop', () => {
        expect(wrapper.find('.settings-page-menu-layout h1').text()).to.be.equal(props.title)
      })
    })

    describe('children', () => {
      it('should render one <h2> element', () => {
        expect(wrapper.find('.settings-page-menu-layout h2')).to.have.length(1)
      })
      it('should render one <h2> element with its content properly', () => {
        const expectedText = 'Foo Bar Hello World Heading!'
        expect(wrapper.find('.settings-page-menu-layout h2').text()).to.be.equal(expectedText)
      })
    })

    describe('multiple childrens', () => {
      const childrenSelector = '.settings-page-menu-layout > div'

      beforeEach(() => {
        wrapper = shallow(
          <SettingsPageMenuLayout {...props}>
            <div>Foo</div>
            <div>Bar</div>
          </SettingsPageMenuLayout>
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
  })
})
