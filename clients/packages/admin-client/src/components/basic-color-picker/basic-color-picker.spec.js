/* eslint-disable no-unused-expressions */
import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import BasicColorPicker from './basic-color-picker'

describe('client/components/basic-color-picker/basic-color-picker', () => {
  let colorPicker
  const props = {
    colors: ['bg-1', 'bg-2', 'bg-3'],
    selected: 'bg-2',
    onSelectColor: color => {}
  }

  beforeEach(() => {
    colorPicker = mount(<BasicColorPicker {...props} />)
  })

  it('should render without crashed', () => {
    expect(colorPicker).to.be.ok
  })

  it('should render a list of color items according colors passed by props', () => {
    expect(colorPicker.find('BasicColorPickerItem').length).to.equal(props.colors.length)
  })

  it('should pass isSelected when selected equals color render in item', () => {
    const index = props.colors.indexOf(props.selected)
    expect(colorPicker.find('BasicColorPickerItem').at(index).props().isSelected).to.equal(true)
  })

  it('should call onSelectColor when click in color-picker-item', () => {
    const onSelectColor = color => {}
    colorPicker.setProps({ onSelectColor })
    colorPicker.find('BasicColorPickerItem').forEach(item => {
      expect(item.props().onSelectColor).to.equal(onSelectColor)
    })
  })
})
