import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import BasicColorPickerItem from './basic-color-picker-item'

describe('client/components/basic-color-picker/basic-color-picker-item', () => {
  let pickerItem
  const props = {
    color: 'bg-1',
    isSelected: false,
    onSelectColor: color => {}
  }

  beforeEach(() => {
    pickerItem = mount(<BasicColorPickerItem {...props} />)
  })

  it('should render with props.color', () => {
    expect(pickerItem.find('div').at(1).props().className).to.contains(props.color)
  })

  it('should render without style when isnt selected', () => {
    expect(pickerItem.props.style).to.equal(undefined)
  })

  it('should render select style when is selected', () => {
    pickerItem.setProps({ isSelected: true })
    expect(pickerItem.find('div').at(1).props().style).to.deep.equal({ borderWidth: '5px' })
  })

  it('should call onSelectColor when click with color passed by props', () => {
    let result
    pickerItem.setProps({ onSelectColor: color => { result = color } })
    pickerItem.find('div').at(1).simulate('click')
    expect(result).to.equal(props.color)
  })
})
