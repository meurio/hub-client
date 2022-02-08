/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { BlockTag } from 'mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/block-tag', () => {
  let component

  beforeEach(() => {
    component = mount(<BlockTag />)
  })

  it('should render ok by default', () => {
    expect(component).to.be.ok
  })

  it('should render tags to props passed', () => {
    const tags = ['label 1', 'label 2']
    const handleClick = value => {}
    const handleRemove = value => {}
    component.setProps({
      tags: tags,
      onClick: handleClick,
      onRemove: handleRemove
    })
    expect(component.find('Tag').length).to.equal(2)
    tags.map((tag, index) => {
      const props = component.find('Tag').at(index).props()
      expect(props.onClick).to.equal(handleClick)
      expect(props.onRemove).to.equal(handleRemove)
    })
  })
})
